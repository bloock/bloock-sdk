//go:build e2e

package client

/*import (
	"strings"
	"testing"
	"time"

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

	credentialJson := "{\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://schema.iden3.io/core/jsonld/iden3proofs.jsonld\",\"https://api.bloock.dev/hosting/v1/ipfs/QmYMYpSQsFbqXgSRK8KFDGMopD2CUke5yd4m7XFuVAZTat\"],\"id\":\"https://clientHost.com/v1/did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/2ff36890-2fc1-4bba-b489-bdd7685e9555\",\"type\":[\"VerifiableCredential\",\"DrivingLicense\"],\"issuanceDate\":\"2023-08-21T10:21:42.402140Z\",\"expirationDate\":\"2099-08-08T06:02:22Z\",\"credentialSubject\":{\"birth_date\":921950325,\"country\":\"Spain\",\"first_surname\":\"Tomas\",\"id\":\"did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr\",\"license_type\":1,\"name\":\"Eduard\",\"nif\":\"54688188M\",\"second_surname\":\"Escoruela\",\"type\":\"DrivingLicense\"},\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/3553270275\",\"revocationNonce\":3553270275,\"type\":\"SparseMerkleTreeProof\"},\"issuer\":\"did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"credentialSchema\":{\"id\":\"https://api.bloock.dev/hosting/v1/ipfs/QmWkPu699EF334ixBGEK7rDDurQfu2SYBXU39bSozu1i5h\",\"type\":\"JsonSchema2023\"},\"proof\":[{\"coreClaim\":\"e055485e9b8410b3cd71cb3ba3a0b7652a00000000000000000000000000000002125caf312e33a0b0c82d57fdd240b7261d58901a346261c5ce5621136c0b0056d1a9bf4e9d10b44fdd5b0f6b740b21dcd6675e770bf882249b8083471858190000000000000000000000000000000000000000000000000000000000000000039acad300000000ee30c6f30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"issuerData\":{\"authCoreClaim\":\"cca3371a6cb1b715004407e325bd993c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fbd3b6b8c8e24e08bb982c7d4990e594747e5c24d98ac4ec969e50e437c1eb08407c9e5acc278a1641c82488f7518432a5937973d4ddfe551e32f9f7ba4c4a2e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did%3Apolygonid%3Apolygon%3Amumbai%3A2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/0\",\"revocationNonce\":0,\"type\":\"SparseMerkleTreeProof\"},\"id\":\"did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"mtp\":{\"existence\":true,\"siblings\":[]},\"state\":{\"claimsTreeRoot\":\"0da5ac49846ae0074b986e5eef7c84011529e9902a0ffc6e9973b5cd0d217709\",\"value\":\"778582fc18b636314cc027a7772c1429028d44cdd17234f06e6d2d59bedee31d\"}},\"signature\":\"7bf882354b7cedd4b7ee74590cd3b091fef7545cb4ae8cd35c72b106ff858a0a3b1272ab7748cf7187d2383acda44bdae4bce1a7f9dccc11921fb0f19a70ee03\",\"type\":\"BJJSignature2021\"}]}"
	DrivingLicenseSchemaType := "DrivingLicense"
	KYCAgeSchemaType := "KYCAgeCredential"
	holderDid := "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr"
	expiration := int64(4089852142)
	apiManagedHost := "https://clientHost.com"

	t.Run("credential to/from json", func(t *testing.T) {
		credential, err := identityV2.NewCredentialFromJson(credentialJson)
		assert.NoError(t, err)

		credJson, err := credential.ToJson()
		assert.NoError(t, err)

		newCredential, err := identityV2.NewCredentialFromJson(credJson)
		assert.NoError(t, err)

		newCredentialJson, err := newCredential.ToJson()
		assert.NoError(t, err)

		assert.Equal(t, credJson, newCredentialJson)
	})

	t.Run("identity v2 end to end first flow", func(t *testing.T) {
		identityClient := NewIdentityV2Client(apiManagedHost)
		keyClient := NewKeyClient()

		keys, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		assert.NoError(t, err)

		notFoundKey, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		assert.NoError(t, err)

		keyBjj, err := keyClient.LoadManagedKey(keys.ID)
		assert.NoError(t, err)

		issuerKey := identityV2.NewBjjIssuerKey(identityV2.IssuerKeyArgs{ManagedKey: &keyBjj})
		notFoundIssuerKey := identityV2.NewBjjIssuerKey(identityV2.IssuerKeyArgs{ManagedKey: &notFoundKey})
		issuer, err := identityClient.CreateIssuer(issuerKey, identityV2.NewIssuerParams())
		assert.NoError(t, err)
		assert.True(t, strings.Contains(issuer, "polygonid"))

		_, err = identityClient.CreateIssuer(issuerKey, identityV2.NewIssuerParams())
		assert.Error(t, err)

		getIssuerDid, err := identityClient.GetIssuerByKey(issuerKey, identityV2.NewIssuerParams())
		assert.NoError(t, err)
		assert.Equal(t, issuer, getIssuerDid)

		getIssuerDid, err = identityClient.GetIssuerByKey(notFoundIssuerKey, identityV2.NewIssuerParams())
		assert.NoError(t, err)
		assert.Equal(t, "", getIssuerDid)

		issuers, err := identityClient.GetIssuerList()
		assert.NoError(t, err)
		assert.NotNil(t, issuers)

		proofType := []identityV2.ProofType{identityV2.IntegrityProofType, identityV2.SparseMtProofType}

		schema, err := identityClient.BuildSchema("Driving License", DrivingLicenseSchemaType, "1.0", "driving license schema", issuer).
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
		assert.NotNil(t, schema.Id)

		res, err := identityClient.BuildCredential(schema.Id, issuer, holderDid, expiration, 0).
			WithIntegerAttribute("license_type", 1).
			WithDecimalAttribute("quantity_oil", 2.25555).
			WithStringAttribute("nif", "54688188M").
			WithBooleanAttribute("is_spanish", true).
			WithDateAttribute("birth_date", time.Date(1999, time.March, 20, 0, 0, 0, 0, time.UTC)).
			WithDatetimeAttribute("local_hour", time.Now()).
			WithStringAttribute("car_type", "big").
			WithIntegerAttribute("car_points", 5).
			WithDecimalAttribute("precision_wheels", 1.10).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &keyBjj})).
			WithProofType(proofType).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, res.CredentialId)
		assert.NotNil(t, res.AnchorID)
		assert.NotNil(t, res.Credential)

		credential := res.Credential
		assert.Equal(t, issuer, credential.Issuer)
		assert.Equal(t, "JsonSchema2023", credential.CredentialSchema.Type)
		assert.Equal(t, DrivingLicenseSchemaType, credential.Type[1])

		receipt, err := identityClient.BuildIssuerSatePublisher(issuer).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &keyBjj})).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, receipt.TxHash)

		receipt, err = identityClient.BuildIssuerSatePublisher(issuer).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &keyBjj})).
			Build()
		assert.Error(t, err)

		ok, err := identityClient.RevokeCredential(credential)
		assert.NoError(t, err)
		assert.True(t, ok)

		receipt, err = identityClient.BuildIssuerSatePublisher(issuer).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &keyBjj})).
			Build()
		assert.Error(t, err)
	})

	t.Run("identity v2 end to end second flow", func(t *testing.T) {
		identityClient := NewIdentityV2Client(apiManagedHost)
		keyClient := NewKeyClient()

		keyBjj, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		assert.NoError(t, err)

		issuerKey := identityV2.NewBjjIssuerKey(identityV2.IssuerKeyArgs{ManagedKey: &keyBjj})
		issuerParams := identityV2.NewIssuerParams()
		issuerParams.Method = identityV2.ListOfMethods().Iden3
		issuerParams.Blockchain = identityV2.ListOfBlockchains().Polygon
		issuerParams.NetworkId = identityV2.ListOfNetworkIds().Mumbai

		issuer, err := identityClient.CreateIssuer(issuerKey, issuerParams)
		assert.NoError(t, err)
		assert.True(t, strings.Contains(issuer, "iden3"))

		schema2, err := identityClient.BuildSchema("KYC Age Credential", KYCAgeSchemaType, "1.0", "kyc age schema", issuer).
			AddIntegerAttribute("Birth Date", "birth_date", "your bityh date", true).
			AddStringAttribute("Name", "name", "your name", true).
			AddIntegerAttribute("Document Type", "document_type", "your document type", false).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, schema2.Id)

		res, err := identityClient.BuildCredential(schema2.Id, issuer, holderDid, expiration, 0).
			WithIntegerAttribute("birth_date", 921950325).
			WithStringAttribute("name", "Eduard").
			WithIntegerAttribute("document_type", 1).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &keyBjj})).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, res.CredentialId)
		assert.Equal(t, int64(0), res.AnchorID)
		assert.NotNil(t, res.Credential)

		credential := res.Credential

		assert.Equal(t, issuer, credential.Issuer)
		assert.Equal(t, "JsonSchema2023", credential.CredentialSchema.Type)
		assert.Equal(t, KYCAgeSchemaType, credential.Type[1])

		receipt, err := identityClient.BuildIssuerSatePublisher(issuer).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &keyBjj})).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, receipt.TxHash)

		_, err = identityClient.BuildIssuerSatePublisher(issuer).Build()
		assert.Error(t, err)

		receipt, err = identityClient.BuildIssuerSatePublisher(issuer).
			WithSigner(authenticity.NewBjjSigner(authenticity.SignerArgs{ManagedKey: &keyBjj})).
			Build()
		assert.Error(t, err)

		proof, err := identityClient.GetCredentialProof(issuer, res.CredentialId)
		assert.NoError(t, err)
		assert.NotNil(t, proof.SignatureProof)
		assert.Equal(t, "", proof.IntegrityProof)
	})
}*/
