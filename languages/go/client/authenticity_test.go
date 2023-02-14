package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity"
	"github.com/stretchr/testify/assert"
)

func TestAuthenticity(t *testing.T) {
	InitSdk()

	t.Run("generate ecdsa keys", func(t *testing.T) {
		authenticityClient := NewAuthenticityClient()

		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		assert.NotEmpty(t, keys.PrivateKey)
		assert.NotEmpty(t, keys.PublicKey)
	})

	t.Run("sign ecdsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		signature, err := authenticityClient.
			Sign(record, entity.NewEcdsaSigner(entity.SignerArgs{PrivateKey: keys.PrivateKey}))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("verify ecdsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		authenticityClient := NewAuthenticityClient()
		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(entity.NewEcdsaSigner(entity.SignerArgs{PrivateKey: keys.PrivateKey})).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)

	})

	t.Run("sign ens", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		signature, err := authenticityClient.
			Sign(record, entity.NewEcdsaSigner(entity.SignerArgs{PrivateKey: keys.PrivateKey}))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature)
	})

	t.Run("verify ens", func(t *testing.T) {
		recordClient := NewRecordClient()

		authenticityClient := NewAuthenticityClient()
		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(entity.NewEnsSigner(entity.EnsArgs{
				PrivateKey: keys.PrivateKey,
			})).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("get record signatures", func(t *testing.T) {
		recordClient := NewRecordClient()

		authenticityClient := NewAuthenticityClient()
		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(entity.NewEcdsaSigner(entity.SignerArgs{PrivateKey: keys.PrivateKey})).
			Build()
		assert.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(record)
		assert.NoError(t, err)

		assert.Equal(t, 1, len(signatures))
		assert.Equal(t, entity.ECDSA, entity.SignatureAlgFromProto[signatures[0].Header.Alg])
	})

	t.Run("get empty signature common name ", func(t *testing.T) {
		recordClient := NewRecordClient()

		authenticityClient := NewAuthenticityClient()
		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(entity.NewEcdsaSigner(entity.SignerArgs{PrivateKey: keys.PrivateKey})).
			Build()
		assert.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(record)
		assert.NoError(t, err)

		_, err = authenticityClient.GetSignatureCommonName(signatures[0])
		assert.Error(t, err)
	})

	t.Run("get ecdsa signature common name ", func(t *testing.T) {
		recordClient := NewRecordClient()

		authenticityClient := NewAuthenticityClient()
		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		commonName := "common_name"
		record, err := recordClient.
			FromString("Hello world").
			WithSigner(entity.NewEcdsaSigner(entity.SignerArgs{PrivateKey: keys.PrivateKey, CommonName: &commonName})).
			Build()
		assert.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(record)
		assert.NoError(t, err)

		name, err := authenticityClient.GetSignatureCommonName(signatures[0])
		assert.NoError(t, err)
		assert.Equal(t, commonName, name)

	})

	t.Run("get ens signature common name", func(t *testing.T) {
		recordClient := NewRecordClient()

		authenticityClient := NewAuthenticityClient()
		keys, err := authenticityClient.GenerateEcdsaKeys()
		assert.NoError(t, err)

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(entity.NewEnsSigner(entity.EnsArgs{
				PrivateKey: keys.PrivateKey,
			})).
			Build()
		assert.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(record)
		assert.NoError(t, err)

		signatures[0].Signature = "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601"
		signatures[0].MessageHash = "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6"

		name, err := authenticityClient.GetSignatureCommonName(signatures[0])
		assert.NoError(t, err)
		assert.Equal(t, "vitalik.eth", name)
	})
}
