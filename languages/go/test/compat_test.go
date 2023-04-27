//go:build compat

package test

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/client"
	"github.com/stretchr/testify/assert"
)

func TestCompat(t *testing.T) {
	recordClient := client.NewRecordClient()
	record, err := recordClient.FromString("Hello world").Build()
	assert.NoError(t, err)

	hash, err := record.GetHash()
	assert.NoError(t, err)

	assert.Equal(t, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd", hash)
}
