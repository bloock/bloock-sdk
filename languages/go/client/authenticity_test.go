//go:build e2e

package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
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

	t.Run("generate bjj keys", func(t *testing.T) {
		keyClient := NewKeyClient()
		keys, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		assert.NoError(t, err)

		assert.NotEmpty(t, keys.Key)
		assert.NotEmpty(t, keys.ID)
	})

	t.Run("sign local ecdsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithLocalKey(key))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
		assert.Empty(t, signature.Subject)
	})

	t.Run("sign local bjj", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Bjj)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithLocalKey(key))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("sign local rsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Rsa2048)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithLocalKey(key))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("sign managed ecdsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.EcP256k,
		})
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedKey(key))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("sign managed bjj", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.Bjj,
		})
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedKey(key))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("sign managed rsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.Rsa2048,
		})
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedKey(key))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("verify local ecdsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("verify local bjj", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Bjj)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("verify local rsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Rsa2048)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("verify managed ecdsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.EcP256k,
		})
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithManagedKey(key)).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("verify managed bjj", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.Bjj,
		})
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithManagedKey(key)).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("verify managed rsa", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.Rsa2048,
		})
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithManagedKey(key)).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("sign local ens", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithLocalKey(key))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("sign managed ens", func(t *testing.T) {
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.EcP256k,
		})
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedKey(key))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("verify local ens", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()
		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("verify managed ens", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.EcP256k,
		})
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithManagedKey(key)).
			Build()
		assert.NoError(t, err)

		valid, err := authenticityClient.Verify(record)
		assert.NoError(t, err)

		assert.True(t, valid)
	})

	t.Run("get record signatures", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(record)
		assert.NoError(t, err)

		assert.Equal(t, 1, len(signatures))
		assert.Equal(t, authenticity.ECDSA, authenticity.SignatureAlgFromProto[signatures[0].Alg])
	})

	/*t.Run("get empty signature common name ", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSignerWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(record)
		assert.NoError(t, err)

		_, err = authenticityClient.GetSignatureCommonName(signatures[0])
		assert.Error(t, err)
	})*/

	/*t.Run("get ecdsa signature common name ", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		commonName := "common_name"
		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSigner(authenticity.SignerArgs{LocalKey: &key, CommonName: &commonName})).
			Build()
		assert.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(record)
		assert.NoError(t, err)

		name, err := authenticityClient.GetSignatureCommonName(signatures[0])
		assert.NoError(t, err)
		assert.Equal(t, commonName, name)
	})*/

	/*t.Run("get ens signature common name", func(t *testing.T) {
		recordClient := NewRecordClient()

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		authenticityClient := NewAuthenticityClient()

		record, err := recordClient.
			FromString("Hello world").
			WithSigner(authenticity.NewSigner(authenticity.SignerArgs{
				LocalKey: &key,
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
	})*/
}
