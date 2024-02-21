//go:build e2e

package client

import (
	"testing"
	"time"

	"github.com/bloock/bloock-sdk-go/v2/entity/identity"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestIdentityCore(t *testing.T) {
	DrivingLicenseSchemaType := "DrivingLicense"
	holderDid := "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr"
	expiration := int64(4089852142)

	InitDevSdk()

	t.Run("identity core end to end create credential", func(t *testing.T) {
		identityClient := NewIdentityClient()
		keyClient := NewKeyClient()
		identityCoreClient := NewIdentityCoreClient()

		managedKey, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		require.NoError(t, err)

		issuerKey := key.Key{ManagedKey: &managedKey}

		issuer, err := identityClient.CreateIssuer(issuerKey, identity.Interval60, identity.PolygonIDTest, "SDK Issuer Test Core Client", "sdk issuer test core client", "")
		require.NoError(t, err)

		schema, err := identityClient.BuildSchema("Driving License", DrivingLicenseSchemaType, "1.0", "driving license schema").
			AddIntegerAttribute("License Type", "license_type", "license type", false).
			AddDecimalAttribute("Quantity Oil", "quantity_oil", "quantity oil", true).
			AddStringAttribute("Nif", "nif", "nif", true).
			AddBooleanAttribute("Is Spanish", "is_spanish", "is spanish", true).
			AddDateAttribute("Birth Date", "birth_date", "birth date", true).
			AddDatetimeAttribute("Local Hour", "local_hour", "local hour", true).
			AddStringEnumAttribute("Car Type", "car_type", "car type", true, []string{"big", "medium", "small"}).
			AddIntegerEnumAttribute("Car Points", "car_points", "car points", true, []int64{1, 5, 10}).
			AddDecimalEnumAttribute("Precision wheels", "precision_wheels", "precision wheels", true, []float64{1.10, 1.20, 1.30}).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, schema.Cid)

		schema, err = identityClient.GetSchema(schema.Cid)
		assert.NoError(t, err)
		assert.NotNil(t, schema.CidJsonLd)
		assert.NotNil(t, schema.Json)
		assert.NotNil(t, schema.SchemaType)

		res, err := identityCoreClient.BuildCredential(issuer, schema.Cid, holderDid, expiration, 0).
			WithIntegerAttribute("license_type", 1).
			WithDecimalAttribute("quantity_oil", 2.25555).
			WithStringAttribute("nif", "54688188M").
			WithBooleanAttribute("is_spanish", true).
			WithDateAttribute("birth_date", time.Date(1999, time.March, 20, 0, 0, 0, 0, time.UTC)).
			WithDatetimeAttribute("local_hour", time.Now()).
			WithStringAttribute("car_type", "big").
			WithIntegerAttribute("car_points", 5).
			WithDecimalAttribute("precision_wheels", 1.10).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, res.CredentialId)
		assert.NotNil(t, res.Credential)
		assert.Equal(t, DrivingLicenseSchemaType, res.CredentialType)

		credential := res.Credential
		assert.Equal(t, issuer.Did.Did, credential.Issuer)
		assert.Equal(t, "JsonSchema2023", credential.CredentialSchema.Type)
		assert.Equal(t, DrivingLicenseSchemaType, credential.Type[1])
	})
}
