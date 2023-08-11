//go:build e2e

package client

/*import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2"
	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/entity/identityV2"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/stretchr/testify/assert"
)

func TestIdentityV2(t *testing.T) {
	bloock.ApiKey = "tFD-hh1QYTj1TQEp3LulhHAredSkekobuuZI8vduysc7sx2RZTdpnX6A5FSQuSvT"
	apiHost := "https://api.bloock.dev"
	if apiHost != "" {
		bloock.ApiHost = apiHost
	}

	bloock.DisableAnalytics = true

	t.Run("identity end to end", func(t *testing.T) {
		schemaType := "DrivingLicense"
		holderDid := "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr"
		expiration := int64(4089852142)

		identityClient := NewIdentityV2Client()
		keyClient := NewKeyClient()

		keys, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		assert.NoError(t, err)
		keyId := keys.ID

		//6627fd49-d69a-480d-b69a-117c8b202e7f
		key, err := keyClient.LoadManagedKey(keyId)
		assert.NoError(t, err)

		issuerKey := identityV2.NewBjjIssuerKey(identityV2.IssuerKeyArgs{ManagedKey: &key})
		did, err := identityClient.CreateIssuer(issuerKey)
		assert.NoError(t, err)
		// did:polygonid:polygon:mumbai:2qH7BSPLEVZU6qNCAuCMdmw3yWvQiximqKw68PBAAp
		issuerDid := did

		proofType := []identityV2.ProofType{identityV2.BloockProof, identityV2.PolygonMtp}

		schema, err := identityClient.BuildSchema("Driving License", schemaType, "1.0", "driving license schema", issuerDid).
			AddNumberAttribute("License Type", "license_type", "license type", false).
			AddStringAttribute("Nif", "nif", "nif", true).
			AddStringAttribute("Country", "country", "country", true).
			AddNumberAttribute("Birth Date", "birth_date", "birth date", true).
			AddStringAttribute("Name", "name", "name", true).
			AddStringAttribute("Second Surname", "second_surname", "second surname", true).
			AddStringAttribute("First Surname", "first_surname", "first surname", true).
			Build()
		assert.NoError(t, err)
		schemaId := schema.Id

		res, err := identityClient.BuildCredential(schemaId, schemaType, issuerDid, holderDid, expiration, 0).
			WithNumberAttribute("birth_date", 921950325).
			WithStringAttribute("country", "Spain").
			WithStringAttribute("first_surname", "Tomas").
			WithNumberAttribute("license_type", 1).
			WithStringAttribute("name", "Eduard").
			WithStringAttribute("nif", "54688188M").
			WithStringAttribute("second_surname", "Escoruela").
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &key})).
			WithProofType(proofType).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, res.CredentialId)
		assert.NotNil(t, res.AnchorID)

		credential := res.Credential

		assert.Equal(t, issuerDid, credential.Issuer)
		assert.Equal(t, "", credential)

		credentialString, err := credential.ToJson()
		assert.NoError(t, err)
		assert.Equal(t, "", credentialString)

		newCredential, err := identityV2.NewCredentialFromJson(credentialString)
		assert.NoError(t, err)
		assert.Equal(t, credential, newCredential)

		receipt, err := identityClient.BuildIssuerSatePublisher(issuerDid).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &key})).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, receipt.TxHash)

		ok, err := identityClient.RevokeCredential(credential)
		assert.NoError(t, err)
		assert.True(t, ok)

		receipt, err = identityClient.BuildIssuerSatePublisher(issuerDid).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &key})).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, receipt.TxHash)

		proof, err := identityClient.GetCredentialProof(issuerDid, res.CredentialId)
		assert.NoError(t, err)
		assert.Equal(t, "", proof)
	})
}*/
