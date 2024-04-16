//go:build e2e

package client

/*func TestIdentity(t *testing.T) {
	credentialJson := "{\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://schema.iden3.io/core/jsonld/iden3proofs.jsonld\",\"https://api.bloock.dev/hosting/v1/ipfs/QmYMYpSQsFbqXgSRK8KFDGMopD2CUke5yd4m7XFuVAZTat\"],\"id\":\"https://clientHost.com/v1/did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/2ff36890-2fc1-4bba-b489-bdd7685e9555\",\"type\":[\"VerifiableCredential\",\"DrivingLicense\"],\"issuanceDate\":\"2023-08-21T10:21:42.402140Z\",\"expirationDate\":\"2099-08-08T06:02:22Z\",\"credentialSubject\":{\"birth_date\":921950325,\"country\":\"Spain\",\"first_surname\":\"Tomas\",\"id\":\"did:polygonid:polygon:amoy:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr\",\"license_type\":1,\"name\":\"Eduard\",\"nif\":\"54688188M\",\"second_surname\":\"Escoruela\",\"type\":\"DrivingLicense\"},\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/3553270275\",\"revocationNonce\":3553270275,\"type\":\"SparseMerkleTreeProof\"},\"issuer\":\"did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"credentialSchema\":{\"id\":\"https://api.bloock.dev/hosting/v1/ipfs/QmWkPu699EF334ixBGEK7rDDurQfu2SYBXU39bSozu1i5h\",\"type\":\"JsonSchema2023\"},\"proof\":[{\"coreClaim\":\"e055485e9b8410b3cd71cb3ba3a0b7652a00000000000000000000000000000002125caf312e33a0b0c82d57fdd240b7261d58901a346261c5ce5621136c0b0056d1a9bf4e9d10b44fdd5b0f6b740b21dcd6675e770bf882249b8083471858190000000000000000000000000000000000000000000000000000000000000000039acad300000000ee30c6f30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"issuerData\":{\"authCoreClaim\":\"cca3371a6cb1b715004407e325bd993c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fbd3b6b8c8e24e08bb982c7d4990e594747e5c24d98ac4ec969e50e437c1eb08407c9e5acc278a1641c82488f7518432a5937973d4ddfe551e32f9f7ba4c4a2e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did%3Apolygonid%3Apolygon%3Aamoy%3A2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/0\",\"revocationNonce\":0,\"type\":\"SparseMerkleTreeProof\"},\"id\":\"did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"mtp\":{\"existence\":true,\"siblings\":[]},\"state\":{\"claimsTreeRoot\":\"0da5ac49846ae0074b986e5eef7c84011529e9902a0ffc6e9973b5cd0d217709\",\"value\":\"778582fc18b636314cc027a7772c1429028d44cdd17234f06e6d2d59bedee31d\"}},\"signature\":\"7bf882354b7cedd4b7ee74590cd3b091fef7545cb4ae8cd35c72b106ff858a0a3b1272ab7748cf7187d2383acda44bdae4bce1a7f9dccc11921fb0f19a70ee03\",\"type\":\"BJJSignature2021\"}]}"
	DrivingLicenseSchemaType := "DrivingLicense"
	KYCAgeSchemaType := "KYCAgeCredential"
	holderDid := "did:polygonid:polygon:amoy:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr"
	expiration := int64(4089852142)

	InitDevSdk()

	t.Run("credential to/from json", func(t *testing.T) {
		credential, err := identity.NewCredentialFromJson(credentialJson)
		assert.NoError(t, err)

		credJson, err := credential.ToJson()
		assert.NoError(t, err)

		newCredential, err := identity.NewCredentialFromJson(credJson)
		assert.NoError(t, err)

		newCredentialJson, err := newCredential.ToJson()
		assert.NoError(t, err)

		assert.Equal(t, credJson, newCredentialJson)
	})

	t.Run("create holder identity", func(t *testing.T) {
		keyClient := NewKeyClient()
		identityClient := NewIdentityClient()

		managedKey, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		assert.NoError(t, err)

		holderKey := key.Key{ManagedKey: &managedKey}

		holder, err := identityClient.CreateHolder(holderKey, identity.PolygonID)
		assert.NoError(t, err)

		assert.NotEmpty(t, holder.Did.Did)
		assert.Equal(t, identity.PolygonID, holder.Did.DidMethod)
		assert.NotEmpty(t, holder.Key)
		assert.True(t, strings.Contains(holder.Did.Did, "main"))
	})

	t.Run("identity end to end with managed key", func(t *testing.T) {
		identityClient := NewIdentityClient()
		identityCoreClient := NewIdentityCoreClient()
		keyClient := NewKeyClient()

		managedKey, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		assert.NoError(t, err)

		notFoundManagedKey, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			KeyType:    key.Bjj,
			Protection: key.KEY_PROTECTION_SOFTWARE,
		})
		assert.NoError(t, err)

		issuerKey := key.Key{ManagedKey: &managedKey}
		notFoundIssuerKey := key.Key{ManagedKey: &notFoundManagedKey}

		profileImage, err := os.ReadFile("./../test/test_utils/profile_image.png")
		assert.NoError(t, err)
		encodedImage := base64.URLEncoding.EncodeToString(profileImage)

		issuer, err := identityClient.CreateIssuer(issuerKey, identity.Interval5, identity.PolygonIDTest, "Bloock Test", "bloock description test", encodedImage)
		assert.NoError(t, err)
		assert.True(t, strings.Contains(issuer.Did.Did, "polygonid"))
		assert.True(t, strings.Contains(issuer.Did.Did, "amoy"))

		_, err = identityClient.CreateIssuer(issuerKey, identity.Interval5, identity.PolygonIDTest, "", "", "")
		assert.Error(t, err)

		importedIssuer, err := identityClient.ImportIssuer(issuerKey, identity.PolygonIDTest)
		assert.NoError(t, err)
		assert.Equal(t, issuer, importedIssuer)

		getIssuerDid, err := identityClient.ImportIssuer(notFoundIssuerKey, identity.PolygonIDTest)
		assert.NoError(t, err)
		assert.Equal(t, "", getIssuerDid.Did.Did)

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

		receipt, err := identityClient.BuildCredential(issuer, schema.Cid, holderDid, expiration, 0).
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
		assert.NotNil(t, receipt.CredentialId)
		assert.Equal(t, issuer.Did.Did, receipt.Credential.Issuer)
		assert.Equal(t, "JsonSchema2023", receipt.Credential.CredentialSchema.Type)
		assert.Equal(t, DrivingLicenseSchemaType, receipt.Credential.Type[1])

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

		credential, err := identityClient.GetCredential(receipt.CredentialId)
		assert.NoError(t, err)

		assert.Equal(t, issuer.Did.Did, credential.Issuer)
		assert.Equal(t, "JsonSchema2023", credential.CredentialSchema.Type)
		assert.Equal(t, DrivingLicenseSchemaType, credential.Type[1])

		jsonOffer, err := identityClient.GetCredentialOffer(issuer, receipt.CredentialId)
		assert.NoError(t, err)
		assert.NotEmpty(t, jsonOffer)

		ok, err := identityClient.RevokeCredential(credential, issuer)
		assert.NoError(t, err)
		assert.True(t, ok)

		receiptState, err := identityClient.ForcePublishIssuerState(issuer)
		assert.NoError(t, err)
		assert.NotNil(t, receiptState.TxHash)

		receiptState, err = identityClient.ForcePublishIssuerState(issuer)
		assert.Error(t, err)

		proofRequest, err := prepareProofRequest(schema.CidJsonLd)
		require.NoError(t, err)

		verification, err := identityClient.CreateVerification(proofRequest)
		assert.NoError(t, err)
		assert.NotEmpty(t, verification.SessionID)
		assert.NotEmpty(t, verification.VerificationRequest)

		status, err := identityClient.GetVerificationStatus(verification.SessionID)
		assert.Error(t, err)
		assert.False(t, status)

		status, err = identityClient.WaitVerification(verification.SessionID, identity.VerificationParams{Timeout: 5})
		assert.Error(t, err)
		assert.False(t, status)
	})

	t.Run("identity end to end with local key", func(t *testing.T) {
		identityClient := NewIdentityClient()
		keyClient := NewKeyClient()

		localKey, err := keyClient.LoadLocalKey(key.Bjj, "bb73214b067393d96ba3b52831150ba1b4aaf0548fa2e776ea5905be2859bff1")
		assert.NoError(t, err)

		issuerKey := key.Key{LocalKey: &localKey}

		issuer, err := identityClient.ImportIssuer(issuerKey, identity.PolygonIDTest)
		assert.NoError(t, err)
		assert.True(t, strings.Contains(issuer.Did.Did, "polygonid"))
		assert.True(t, strings.Contains(issuer.Did.Did, "amoy"))

		schema, err := identityClient.BuildSchema("KYC Age Credential", KYCAgeSchemaType, "1.0", "kyc age schema").
			AddIntegerAttribute("Birth Date", "birth_date", "your bityh date", true).
			AddStringAttribute("Name", "name", "your name", true).
			AddIntegerAttribute("Document Type", "document_type", "your document type", false).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, schema.Cid)

		receipt, err := identityClient.BuildCredential(issuer, schema.Cid, holderDid, expiration, 0).
			WithIntegerAttribute("birth_date", 921950325).
			WithStringAttribute("name", "Eduard").
			WithIntegerAttribute("document_type", 1).
			Build()
		assert.NoError(t, err)
		assert.NotNil(t, receipt.CredentialId)
		assert.Equal(t, issuer.Did.Did, receipt.Credential.Issuer)
		assert.Equal(t, "JsonSchema2023", receipt.Credential.CredentialSchema.Type)
		assert.Equal(t, KYCAgeSchemaType, receipt.Credential.Type[1])

		credential, err := identityClient.GetCredential(receipt.CredentialId)
		assert.NoError(t, err)
		assert.Equal(t, issuer.Did.Did, credential.Issuer)
		assert.Equal(t, "JsonSchema2023", credential.CredentialSchema.Type)
		assert.Equal(t, KYCAgeSchemaType, credential.Type[1])

		proof, err := identityClient.GetCredentialProof(issuer.Did.Did, receipt.CredentialId)
		assert.NoError(t, err)
		assert.NotEmpty(t, proof.SignatureProof)
	})
}

type Query struct {
	AllowedIssuers    []string               `json:"allowedIssuers"`
	Context           string                 `json:"context"`
	CredentialSubject map[string]interface{} `json:"credentialSubject"`
	Type              string                 `json:"type"`
}

type ProofRequest struct {
	CircuitId string `json:"circuitId"`
	ID        int    `json:"id"`
	Query     Query  `json:"query"`
}

func prepareProofRequest(schemaID string) (string, error) {
	jsonString := `{
		"circuitId": "credentialAtomicQuerySigV2",
		"id": 1704207344,
		"query": {
		  "allowedIssuers": [
			"*"
		  ],
		  "credentialSubject": {
			"birth_date": {}
		  },
		  "type": "DrivingLicense"
		}
	  }`

	var data ProofRequest
	err := json.Unmarshal([]byte(jsonString), &data)
	if err != nil {
		return "", err
	}

	data.Query.Context = fmt.Sprintf("https://api.bloock.dev/hosting/v1/ipfs/%s", schemaID)

	updatedProof, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return "", err
	}

	return string(updatedProof), nil
}*/
