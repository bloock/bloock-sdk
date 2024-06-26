import { describe, expect, test } from "@jest/globals";
import { readFileSync } from "fs";
import path from "path";
import base64url from "urlsafe-base64";
import {
  Credential,
  IdentityClient,
  KeyClient,
  KeyProtectionLevel,
  KeyType,
  ManagedKeyParams
} from "../../dist";
import {
  DidMethod,
  IdentityCoreClient,
  Key,
  PublishIntervalParams
} from "../../dist/index";
import { initDevSdk } from "./util";

describe("Identity V2 Tests", () => {
  const credentialJson =
    '{"@context":["https://www.w3.org/2018/credentials/v1","https://schema.iden3.io/core/jsonld/iden3proofs.jsonld","https://api.bloock.dev/hosting/v1/ipfs/QmYMYpSQsFbqXgSRK8KFDGMopD2CUke5yd4m7XFuVAZTat"],"id":"https://clientHost.com/v1/did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/2ff36890-2fc1-4bba-b489-bdd7685e9555","type":["VerifiableCredential","DrivingLicense"],"issuanceDate":"2023-08-21T10:21:42.402140Z","expirationDate":"2099-08-08T06:02:22Z","credentialSubject":{"birth_date":921950325,"country":"Spain","first_surname":"Tomas","id":"did:polygonid:polygon:amoy:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr","license_type":1,"name":"Eduard","nif":"54688188M","second_surname":"Escoruela","type":"DrivingLicense"},"credentialStatus":{"id":"https://api.bloock.dev/identity/v1/did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/3553270275","revocationNonce":3553270275,"type":"SparseMerkleTreeProof"},"issuer":"did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6","credentialSchema":{"id":"https://api.bloock.dev/hosting/v1/ipfs/QmWkPu699EF334ixBGEK7rDDurQfu2SYBXU39bSozu1i5h","type":"JsonSchema2023"},"proof":[{"coreClaim":"e055485e9b8410b3cd71cb3ba3a0b7652a00000000000000000000000000000002125caf312e33a0b0c82d57fdd240b7261d58901a346261c5ce5621136c0b0056d1a9bf4e9d10b44fdd5b0f6b740b21dcd6675e770bf882249b8083471858190000000000000000000000000000000000000000000000000000000000000000039acad300000000ee30c6f30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","issuerData":{"authCoreClaim":"cca3371a6cb1b715004407e325bd993c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fbd3b6b8c8e24e08bb982c7d4990e594747e5c24d98ac4ec969e50e437c1eb08407c9e5acc278a1641c82488f7518432a5937973d4ddfe551e32f9f7ba4c4a2e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","credentialStatus":{"id":"https://api.bloock.dev/identity/v1/did%3Apolygonid%3Apolygon%3Aamoy%3A2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/0","revocationNonce":0,"type":"SparseMerkleTreeProof"},"id":"did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6","mtp":{"existence":true,"siblings":[]},"state":{"claimsTreeRoot":"0da5ac49846ae0074b986e5eef7c84011529e9902a0ffc6e9973b5cd0d217709","value":"778582fc18b636314cc027a7772c1429028d44cdd17234f06e6d2d59bedee31d"}},"signature":"7bf882354b7cedd4b7ee74590cd3b091fef7545cb4ae8cd35c72b106ff858a0a3b1272ab7748cf7187d2383acda44bdae4bce1a7f9dccc11921fb0f19a70ee03","type":"BJJSignature2021"}]}';
  const drivingLicenseSchemaType = "DrivingLicense";
  const holderDid =
    "did:polygonid:polygon:amoy:2qbhbai9AVMJKC4yk38PgyD5ieBuCSH43QBTrkpYGc";
  const expiration = 4089852142;

  test("test credential to/from json", async () => {
    initDevSdk();

    let credential = await Credential.fromJson(credentialJson);
    let json = await credential.toJson();

    let newCredential = await Credential.fromJson(json);
    let newCredentialJson = await newCredential.toJson();
    expect(json).toStrictEqual(newCredentialJson);
  });

  test("test create holder", async () => {
    initDevSdk();

    const identityClient = new IdentityClient();
    const keyClient = new KeyClient();

    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.Bjj;
    let managedKey = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType)
    );

    let holderKey = new Key(managedKey);

    let holder = await identityClient.createHolder(
      holderKey,
      DidMethod.PolygonID
    );
    expect(holder.did.did.includes("main")).toBeTruthy();
  });

  test("test identity end to end", async () => {
    initDevSdk();

    const identityClient = new IdentityClient();
    const identityCoreClient = new IdentityCoreClient();
    const keyClient = new KeyClient();

    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.Bjj;
    let managedKey = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType)
    );

    let notFoundManagedKey = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType)
    );

    let issuerKey = new Key(managedKey);
    let notFoundIssuerKey = new Key(notFoundManagedKey);

    const dirPath = path.join(__dirname, "/test_utils/profile_image.png");
    let fileBytes = readFileSync(dirPath);
    let encodedFile = base64url.encode(fileBytes);

    let issuer = await identityClient.createIssuer(
      issuerKey,
      PublishIntervalParams.Interval15,
      DidMethod.PolygonIDTest,
      "Bloock Test",
      "bloock description test",
      encodedFile
    );
    expect(issuer.did.did.includes("polygonid")).toBeTruthy();
    expect(issuer.did.did.includes("amoy")).toBeTruthy();

    try {
      await identityClient.createIssuer(
        issuerKey,
        PublishIntervalParams.Interval15,
        DidMethod.PolygonIDTest
      );
    } catch (error) {
      expect(error).toBeTruthy;
    }

    let importedIssuer = await identityClient.importIssuer(
      issuerKey,
      DidMethod.PolygonIDTest
    );
    expect(importedIssuer.did.did).toStrictEqual(issuer.did.did);

    let getNotFoundIssuerDid = await identityClient.importIssuer(
      notFoundIssuerKey,
      DidMethod.PolygonIDTest
    );
    expect(getNotFoundIssuerDid.did.did).toStrictEqual("");

    let schema = await identityClient
      .buildSchema(
        "Driving License",
        drivingLicenseSchemaType,
        "1.0",
        "driving license schema"
      )
      .addIntegerAttribute(
        "License Type",
        "license_type",
        "license type",
        false
      )
      .addDecimalAttribute("Quantity Oil", "quantity_oil", "quantity oil", true)
      .addStringAttribute("Nif", "nif", "nif", true)
      .addBooleanAttribute("Is Spanish", "is_spanish", "is spanish", true)
      .addDateAttribute("Birth Date", "birth_date", "birth date", true)
      .addDateTimeAttribute("Local Hour", "local_hour", "local hour", true)
      .addStringEnumAttribute("Car Type", "car_type", "car type", true, [
        "big",
        "medium",
        "small"
      ])
      .addIntegerEnumAttribute("Car Points", "car_points", "car points", true, [
        1,
        5,
        10
      ])
      .addDecimalEnumAttribute(
        "Precision wheels",
        "precision_wheels",
        "precision whels",
        true,
        [1.1, 1.2, 1.3]
      )
      .build();
    expect(schema.cid).toBeTruthy();

    schema = await identityClient.getSchema(schema.cid);
    expect(schema.cidJsonLd).toBeTruthy();
    expect(schema.json).toBeTruthy();
    expect(schema.schemaType).toBeTruthy();

    const receipt = await identityClient
      .buildCredential(issuer, schema.cid, holderDid, expiration, 0)
      .withIntegerAttribute("license_type", 1)
      .withDecimalAttribute("quantity_oil", 2.25555)
      .withStringAttribute("nif", "54688188M")
      .withBooleanAttribute("is_spanish", true)
      .withDateAttribute("birth_date", new Date(1999, 3, 20))
      .withDateTimeAttribute("local_hour", new Date(Date.now()))
      .withStringAttribute("car_type", "big")
      .withIntegerAttribute("car_points", 5)
      .withDecimalAttribute("precision_wheels", 1.1)
      .build();
    expect(receipt.credentialId).toBeTruthy();
    expect(receipt.credential).toBeTruthy();
    expect(receipt.credentialType).toStrictEqual(drivingLicenseSchemaType);
    expect(receipt.credential.issuer).toStrictEqual(issuer.did.did);
    expect(receipt.credential.credentialSchema.type).toStrictEqual(
      "JsonSchema2023"
    );
    expect(receipt.credential.type[1]).toStrictEqual(drivingLicenseSchemaType);

    const newReceipt = await identityCoreClient
      .buildCredential(issuer, schema.cid, holderDid, expiration, 0)
      .withIntegerAttribute("license_type", 1)
      .withDecimalAttribute("quantity_oil", 2.25555)
      .withStringAttribute("nif", "54688188M")
      .withBooleanAttribute("is_spanish", true)
      .withDateAttribute("birth_date", new Date(1999, 3, 20))
      .withDateTimeAttribute("local_hour", new Date(Date.now()))
      .withStringAttribute("car_type", "big")
      .withIntegerAttribute("car_points", 5)
      .withDecimalAttribute("precision_wheels", 1.1)
      .build();
    expect(newReceipt.credentialId).toBeTruthy();
    expect(newReceipt.credential).toBeTruthy();
    expect(newReceipt.credentialType).toStrictEqual(drivingLicenseSchemaType);

    const credential = await identityClient.getCredential(receipt.credentialId);
    expect(credential.issuer).toStrictEqual(issuer.did.did);
    expect(credential.credentialSchema.type).toStrictEqual("JsonSchema2023");
    expect(credential.type[1]).toStrictEqual(drivingLicenseSchemaType);

    const jsonOffer = await identityClient.getCredentialOffer(
      issuer,
      receipt.credentialId
    );
    expect(jsonOffer).toBeTruthy();

    const ok = await identityClient.revokeCredential(credential, issuer);
    expect(ok).toBeTruthy();

    const stateReceipt = await identityClient.forcePublishIssuerState(issuer);
    expect(stateReceipt.txHash).toBeTruthy();

    try {
      await identityClient.forcePublishIssuerState(issuer);
    } catch (error) {
      expect(error).toBeTruthy();
    }

    const proofRequest = prepareProofRequest(schema.cidJsonLd);

    const verification = await identityClient.createVerification(proofRequest);
    expect(verification.sessionID).toBeTruthy();
    expect(verification.verificationRequest).toBeTruthy();

    try {
      await identityClient.waitVerification(verification.sessionID, 5);
    } catch (error) {
      expect(error).toBeTruthy();
    }

    try {
      await identityClient.getVerificationStatus(verification.sessionID);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

interface ProofRequest {
  circuitId: string;
  id: number;
  query: {
    allowedIssuers: string[];
    credentialSubject: {
      birth_date: {};
    };
    type: string;
    context?: string; // Optional context field
  };
}

function prepareProofRequest(schemaID: string): string {
  const jsonString = `{
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
  }`;

  const data: ProofRequest = JSON.parse(jsonString);

  data.query.context = `https://api.bloock.dev/hosting/v1/ipfs/${schemaID}`;

  const updatedProof = JSON.stringify(data, null, 2); // The third parameter (2) specifies the number of spaces for indentation

  return updatedProof;
}
