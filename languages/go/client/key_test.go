//go:build e2e

package client

import (
	"fmt"
	"os"
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/stretchr/testify/assert"
)

func TestKey(t *testing.T) {
	InitDevSdk()

	t.Run("generate local ecdsa", func(t *testing.T) {
		keyClient := NewKeyClient()
		localKey, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		assert.NotEmpty(t, localKey.Key)
		assert.NotEmpty(t, localKey.PrivateKey)

		loadedKey, err := keyClient.LoadLocalKey(key.EcP256k, localKey.PrivateKey)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.Key, localKey.Key)
		assert.Equal(t, loadedKey.PrivateKey, localKey.PrivateKey)
	})

	t.Run("generate local bjj", func(t *testing.T) {
		keyClient := NewKeyClient()
		localKey, err := keyClient.NewLocalKey(key.Bjj)
		assert.NoError(t, err)

		assert.NotEmpty(t, localKey.Key)
		assert.NotEmpty(t, localKey.PrivateKey)

		loadedKey, err := keyClient.LoadLocalKey(key.Bjj, localKey.PrivateKey)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.Key, localKey.Key)
		assert.Equal(t, loadedKey.PrivateKey, localKey.PrivateKey)
	})

	t.Run("generate local rsa", func(t *testing.T) {
		keyClient := NewKeyClient()
		localKey, err := keyClient.NewLocalKey(key.Rsa2048)
		assert.NoError(t, err)

		assert.NotEmpty(t, localKey.Key)
		assert.NotEmpty(t, localKey.PrivateKey)

		loadedKey, err := keyClient.LoadLocalKey(key.Rsa2048, localKey.PrivateKey)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.Key, localKey.Key)
		assert.Equal(t, loadedKey.PrivateKey, localKey.PrivateKey)
	})

	t.Run("generate local aes", func(t *testing.T) {
		keyClient := NewKeyClient()
		localKey, err := keyClient.NewLocalKey(key.Aes128)
		assert.NoError(t, err)

		assert.NotEmpty(t, localKey.Key)
		assert.Empty(t, localKey.PrivateKey)

		loadedKey, err := keyClient.LoadLocalKey(key.Aes128, localKey.Key)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.Key, localKey.Key)
		assert.Equal(t, loadedKey.PrivateKey, localKey.PrivateKey)
	})

	t.Run("generate managed ecdsa", func(t *testing.T) {
		keyClient := NewKeyClient()

		name := "key-name"
		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.EcP256k
		params := key.ManagedKeyParams{
			Name:       name,
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)

		assert.Equal(t, name, managedKey.Name)
		assert.NotEmpty(t, managedKey.Key)
		assert.Equal(t, protection, managedKey.Protection)
		assert.Equal(t, keyType, managedKey.KeyType)

		loadedKey, err := keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.ID, managedKey.ID)
		assert.Equal(t, loadedKey.Name, managedKey.Name)
		assert.Equal(t, loadedKey.Key, managedKey.Key)
		assert.Equal(t, loadedKey.Protection, managedKey.Protection)
		assert.Equal(t, loadedKey.KeyType, managedKey.KeyType)
	})

	t.Run("generate managed bjj", func(t *testing.T) {
		keyClient := NewKeyClient()

		name := "key-name"
		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.Bjj
		params := key.ManagedKeyParams{
			Name:       name,
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)

		assert.Equal(t, name, managedKey.Name)
		assert.NotEmpty(t, managedKey.Key)
		assert.Equal(t, protection, managedKey.Protection)
		assert.Equal(t, keyType, managedKey.KeyType)

		loadedKey, err := keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.ID, managedKey.ID)
		assert.Equal(t, loadedKey.Name, managedKey.Name)
		assert.Equal(t, loadedKey.Key, managedKey.Key)
		assert.Equal(t, loadedKey.Protection, managedKey.Protection)
		assert.Equal(t, loadedKey.KeyType, managedKey.KeyType)
	})

	t.Run("generate managed rsa", func(t *testing.T) {
		keyClient := NewKeyClient()

		name := "key-name"
		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.Rsa2048
		params := key.ManagedKeyParams{
			Name:       name,
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)

		assert.Equal(t, name, managedKey.Name)
		assert.NotEmpty(t, managedKey.Key)
		assert.Equal(t, protection, managedKey.Protection)
		assert.Equal(t, keyType, managedKey.KeyType)

		loadedKey, err := keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.ID, managedKey.ID)
		assert.Equal(t, loadedKey.Name, managedKey.Name)
		assert.Equal(t, loadedKey.Key, managedKey.Key)
		assert.Equal(t, loadedKey.Protection, managedKey.Protection)
		assert.Equal(t, loadedKey.KeyType, managedKey.KeyType)
	})

	t.Run("generate managed without name", func(t *testing.T) {
		keyClient := NewKeyClient()

		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.EcP256k
		params := key.ManagedKeyParams{
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)

		assert.Empty(t, managedKey.Name)
		assert.NotEmpty(t, managedKey.Key)
		assert.Equal(t, protection, managedKey.Protection)
		assert.Equal(t, keyType, managedKey.KeyType)

		loadedKey, err := keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.ID, managedKey.ID)
		assert.Equal(t, loadedKey.Name, managedKey.Name)
		assert.Equal(t, loadedKey.Key, managedKey.Key)
		assert.Equal(t, loadedKey.Protection, managedKey.Protection)
		assert.Equal(t, loadedKey.KeyType, managedKey.KeyType)
	})

	t.Run("generate local certificate ecdsa and sign", func(t *testing.T) {
		keyClient := NewKeyClient()

		keyType := key.Rsa2048
		org := "Google, Inc"
		orgUnit := "IT + Department"
		country := "US"

		subjectParams := key.SubjectCertificateParams{
			CommonName:       "Google, internet, Authority G2",
			Organization:     &org,
			OrganizationUnit: &orgUnit,
			Country:          &country,
		}
		params := key.LocalCertificateParams{
			KeyType:          keyType,
			Subject:          subjectParams,
			Password:         "password",
			ExpirationMonths: 2,
		}
		localCertificate, err := keyClient.NewLocalCertificate(params)
		assert.NoError(t, err)

		assert.NotEmpty(t, localCertificate.Pkcs12)

		loadedCertificate, err := keyClient.LoadLocalCertificate(localCertificate.Pkcs12, localCertificate.Password)
		assert.NoError(t, err)

		assert.Equal(t, localCertificate.Pkcs12, loadedCertificate.Pkcs12)

		authenticityClient := NewAuthenticityClient()
		recordClient := NewRecordClient()

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithLocalCertificate(loadedCertificate, nil))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
		assert.NotEmpty(t, signature.Kid)
		assert.NotEmpty(t, signature.Alg)
		assert.NotEmpty(t, signature.MessageHash)
	})

	t.Run("import local p12 certificate", func(t *testing.T) {
		keyClient := NewKeyClient()

		certificateBytes, err := os.ReadFile("./../test/test_utils/test.p12")
		assert.NoError(t, err)
		password := "bloock"

		loadedCertificate, err := keyClient.LoadLocalCertificate(certificateBytes, password)
		assert.NoError(t, err)

		assert.Equal(t, loadedCertificate.Pkcs12, certificateBytes)
	})

	t.Run("generate managed certificate", func(t *testing.T) {
		keyClient := NewKeyClient()

		keyType := key.EcP256k
		expiration := int32(5)
		org := "Google, Inc"
		orgUnit := "IT + Department"
		country := "US"

		subjectParams := key.SubjectCertificateParams{
			CommonName:       "Google, internet, Authority G2",
			Organization:     &org,
			OrganizationUnit: &orgUnit,
			Country:          &country,
		}
		params := key.ManagedCertificateParams{
			KeyType:          keyType,
			Subject:          subjectParams,
			ExpirationMonths: expiration,
		}
		managedCertificate, err := keyClient.NewManagedCertificate(params)
		assert.NoError(t, err)

		assert.NotEmpty(t, managedCertificate.Key)
		assert.Equal(t, key.KEY_PROTECTION_SOFTWARE, managedCertificate.Protection)
		assert.Equal(t, keyType, managedCertificate.KeyType)

		loadedCertificate, err := keyClient.LoadManagedCertificate(managedCertificate.ID)
		assert.NoError(t, err)

		assert.Equal(t, managedCertificate.ID, loadedCertificate.ID)
		assert.Equal(t, managedCertificate.Key, loadedCertificate.Key)
		assert.Equal(t, managedCertificate.Protection, loadedCertificate.Protection)
		assert.Equal(t, managedCertificate.KeyType, loadedCertificate.KeyType)
	})

	t.Run("import managed certificate pem", func(t *testing.T) {
		keyClient := NewKeyClient()

		certificateBytes, err := os.ReadFile("./../test/test_utils/test.pem")
		assert.NoError(t, err)
		managedCertificate, err := keyClient.ImportManagedCertificate(key.PEM, certificateBytes, key.NewImportCertificateParams())
		assert.NoError(t, err)

		assert.NotEmpty(t, managedCertificate.Key)
		assert.Equal(t, key.KEY_PROTECTION_SOFTWARE, managedCertificate.Protection)
		assert.Equal(t, key.Rsa2048, managedCertificate.KeyType)

		loadedCertificate, err := keyClient.LoadManagedCertificate(managedCertificate.ID)
		assert.NoError(t, err)

		assert.Equal(t, managedCertificate.ID, loadedCertificate.ID)
		assert.Equal(t, managedCertificate.Key, loadedCertificate.Key)
		assert.Equal(t, managedCertificate.Protection, loadedCertificate.Protection)
		assert.Equal(t, managedCertificate.KeyType, loadedCertificate.KeyType)
	})

	t.Run("import managed certificate pfx", func(t *testing.T) {
		keyClient := NewKeyClient()
		authenticityClient := NewAuthenticityClient()
		recordClient := NewRecordClient()

		certificateBytes, err := os.ReadFile("./../test/test_utils/test2.pfx")
		assert.NoError(t, err)
		params := key.NewImportCertificateParams()
		params.Password = "bloock"
		managedCertificate, err := keyClient.ImportManagedCertificate(key.PFX, certificateBytes, params)
		assert.NoError(t, err)

		assert.NotEmpty(t, managedCertificate.Key)
		assert.Equal(t, key.KEY_PROTECTION_SOFTWARE, managedCertificate.Protection)
		assert.Equal(t, key.EcP256k, managedCertificate.KeyType)

		loadedCertificate, err := keyClient.LoadManagedCertificate(managedCertificate.ID)
		assert.NoError(t, err)

		assert.Equal(t, managedCertificate.ID, loadedCertificate.ID)
		assert.Equal(t, managedCertificate.Key, loadedCertificate.Key)
		assert.Equal(t, managedCertificate.Protection, loadedCertificate.Protection)
		assert.Equal(t, managedCertificate.KeyType, loadedCertificate.KeyType)

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		signature, err := authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedCertificate(loadedCertificate, nil, nil))
		assert.NoError(t, err)

		assert.NotEmpty(t, signature.Signature)
	})

	t.Run("setup & recover totp access control", func(t *testing.T) {
		keyClient := NewKeyClient()
		authenticityClient := NewAuthenticityClient()
		recordClient := NewRecordClient()

		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.EcP256k
		params := key.ManagedKeyParams{
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)
		assert.Equal(t, managedKey.AccessControlType, key.ACCESS_CONTROL_NONE)

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		_, err = authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedKey(managedKey, nil, nil))
		assert.NoError(t, err)

		totp, err := keyClient.SetupTotpAccessControl(key.Managed{
			ManagedKey: &managedKey,
		})
		assert.NoError(t, err)
		assert.NotEmpty(t, totp.Secret)
		assert.NotEmpty(t, totp.SecretQr)
		assert.NotEmpty(t, totp.RecoveryCodes)

		managedKey, err = keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)
		assert.Equal(t, managedKey.AccessControlType, key.ACCESS_CONTROL_TOTP)

		_, err = authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedKey(managedKey, nil, nil))
		assert.Error(t, err)

		totpRecovered, err := keyClient.RecoverTotpAccessControl(key.Managed{
			ManagedKey: &managedKey,
		}, totp.RecoveryCodes[0])
		assert.NoError(t, err)
		assert.NotEmpty(t, totpRecovered.Secret)
		assert.NotEmpty(t, totpRecovered.SecretQr)
		assert.NotEmpty(t, totpRecovered.RecoveryCodes)
	})

	t.Run("setup secret access control", func(t *testing.T) {
		keyClient := NewKeyClient()
		authenticityClient := NewAuthenticityClient()
		recordClient := NewRecordClient()

		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.EcP256k
		params := key.ManagedKeyParams{
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)
		assert.Equal(t, managedKey.AccessControlType, key.ACCESS_CONTROL_NONE)

		record, err := recordClient.
			FromString("Hello world").
			Build()
		assert.NoError(t, err)

		_, err = authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedKey(managedKey, nil, nil))
		assert.NoError(t, err)

		email := fmt.Sprintf("%s@%s", generateRandomString(8), "bloock.com")
		err = keyClient.SetupSecretAccessControl(key.Managed{
			ManagedKey: &managedKey,
		}, "password", email)
		assert.NoError(t, err)

		managedKey, err = keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)
		assert.Equal(t, managedKey.AccessControlType, key.ACCESS_CONTROL_SECRET)

		_, err = authenticityClient.
			Sign(record, authenticity.NewSignerWithManagedKey(managedKey, nil, nil))
		assert.Error(t, err)
	})
}
