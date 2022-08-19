package test

import (
	"math"
	"math/rand"
	"os"
	"strconv"
	"testing"

	bloock "github.com/bloock/go-bridge/client"
	"github.com/stretchr/testify/assert"
)

func GetSdk() bloock.Client {
	apiKey := os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")
	client := bloock.NewClient(apiKey)
	client.SetApiHost(apiHost)
	return client
}

func TestAcceptance(t *testing.T) {
	sdk := GetSdk()

	t.Run("Basic test E2E", func(t *testing.T) {
		record, err := sdk.NewRecordFromString(randHex(64))
		assert.NoError(t, err)
		records := []*bloock.Record{record}

		res, err := sdk.SendRecords(records)
		assert.NoError(t, err)
		assert.NotEqual(t, bloock.RecordReceipt{}, res[0])

		anchor, err := sdk.WaitAnchor(res[0].Anchor)
		assert.NoError(t, err)
		assert.Equal(t, res[0].Anchor, anchor.Id)

		proof, err := sdk.GetProof(records)
		assert.NoError(t, err)

		root, err := sdk.VerifyProof(proof)
		assert.NoError(t, err)

		timestamp, err := sdk.ValidateRoot(root, bloock.ListOfNetworks().BloockChain)
		assert.NoError(t, err)
		assert.Greater(t, timestamp, uint64(5000))
	})

	t.Run("Test send records invalid record input wrong char", func(t *testing.T) {
		record, err := sdk.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aG")
		records := []*bloock.Record{record}
		_, err = sdk.SendRecords(records)
		assert.NotNil(t, err)
		assert.Equal(t, bloock.InvalidRecordError, err.Error())
	})

	t.Run("Test send records invalid record input missing chars", func(t *testing.T) {
		record1, err := sdk.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa")
		record2, err := sdk.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994")

		records := []*bloock.Record{record1, record2}

		_, err = sdk.SendRecords(records)
		assert.NotNil(t, err)
		assert.Equal(t, bloock.InvalidRecordError, err.Error())
	})

	t.Run("Test send records invalid record input wrong start", func(t *testing.T) {
		record1, err := sdk.NewRecordFromHash("0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa")
		record2, err := sdk.NewRecordFromHash("0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994bb")

		records := []*bloock.Record{record1, record2}

		_, err = sdk.SendRecords(records)
		assert.NotNil(t, err)
		assert.Equal(t, bloock.InvalidRecordError, err.Error())
	})
}

func randHex(length int) string {
	maxlength := 8
	min := math.Pow(16, math.Min(float64(length), float64(maxlength))-1)
	max := math.Pow(16, math.Min(float64(length), float64(maxlength))) - 1
	n := int((rand.Float64() * (max - min + 1)) + min)
	r := strconv.Itoa(n)
	for len(r) < length {
		r += randHex(length - maxlength)
	}
	return r
}
