package test

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/builder"
	"github.com/bloock/bloock-sdk-go/v2/client/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestEndToEnd(t *testing.T) {
	sdk := GetSdk()

	t.Run("E2E using all the builders", func(t *testing.T) {
		records := []string{}

		record, err := builder.NewRecordBuilderFromString("Hello world").Build()
		require.NoError(t, err)
		hash, err := record.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd", hash)

		result, err := record.Publish(entity.NewHostedPublisher())
		require.NoError(t, err)
		assert.Equal(t, hash, result)

		record, err = builder.NewRecordBuilderFromLoader(entity.NewHostedLoader(result)).Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		assert.Equal(t, result, hash)

		records = append(records, hash)

		record, err = builder.NewRecordBuilderFromBytes([]byte{1, 2, 3, 4, 5}).Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4", hash)
		records = append(records, hash)

		record, err = builder.NewRecordBuilderFromHex("1234567890abcdef").Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f", hash)
		records = append(records, hash)

		record, err = builder.NewRecordBuilderFromJSON("{\"hello\":\"world\"}").Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312", hash)
		records = append(records, hash)

		payload := "Hello world 2"
		encrypted_record, err := builder.NewRecordBuilderFromString(payload).
			WithEncrypter(entity.NewAesEncrypter("some_password")).
			Build()
		require.NoError(t, err)
		assert.NotEqual(t, payload, string(encrypted_record.Payload))

		record, err = builder.NewRecordBuilderFromRecord(encrypted_record).
			WithDecrypter(entity.NewAesDecrypter("some_password")).
			Build()
		require.NoError(t, err)
		assert.Equal(t, payload, string(record.Payload))

		hash, err = record.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
		records = append(records, hash)

		_, err = builder.NewRecordBuilderFromRecord(encrypted_record).
			WithDecrypter(entity.NewAesDecrypter("incorrect_password")).
			Build()
		require.Error(t, err)

		record, err = builder.NewRecordBuilderFromFile([]byte{2, 3, 4, 5, 6}).Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446", hash)
		records = append(records, hash)

		keys, err := sdk.GenerateKeys()
		require.NoError(t, err)

		record, err = builder.
			NewRecordBuilderFromString("Hello world 3").
			WithSigner(entity.NewEcsdaSigner(keys.PrivateKey)).
			Build()
		require.NoError(t, err)

		keys, err = sdk.GenerateKeys()
		require.NoError(t, err)

		recordWithMultipleSignatures, err := builder.
			NewRecordBuilderFromRecord(record).
			WithSigner(entity.NewEcsdaSigner(keys.PrivateKey)).
			Build()

		require.NoError(t, err)
		hash, err = recordWithMultipleSignatures.GetHash()
		require.NoError(t, err)
		assert.Equal(t, hash, "79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f")
		records = append(records, hash)

		signatures, err := recordWithMultipleSignatures.GetSignatures()
		require.NoError(t, err)
		assert.Equal(t, len(signatures), 2)

		receipt, err := sdk.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, entity.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		proof, err := sdk.GetProof(records)
		require.NoError(t, err)
		assert.NotEqual(t, entity.Proof{}, proof)

		root, err := sdk.VerifyProof(proof)
		require.NoError(t, err)
		assert.NotEqual(t, "", proof)

		network := entity.NewNetworkParams()
		network.Network = entity.ListOfNetworks().BloockChain

		timestampValidateRoot, err := sdk.ValidateRoot(root, network)
		require.NoError(t, err)
		assert.Greater(t, timestampValidateRoot, uint64(0))

		timestampVerifyRecords, err := sdk.VerifyRecords(records, network)
		require.NoError(t, err)
		assert.Greater(t, timestampVerifyRecords, uint64(0))

		assert.Equal(t, timestampValidateRoot, timestampVerifyRecords)
	})
}
