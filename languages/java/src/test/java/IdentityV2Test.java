import static org.junit.jupiter.api.Assertions.*;

import com.bloock.sdk.client.IdentityClient;
import com.bloock.sdk.client.KeyClient;
import com.bloock.sdk.entity.authenticity.Signer;
import com.bloock.sdk.entity.authenticity.SignerArgs;
import com.bloock.sdk.entity.identity_v2.*;
import com.bloock.sdk.entity.key.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class IdentityV2Test {
  String credentialJson = "{\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://schema.iden3.io/core/jsonld/iden3proofs.jsonld\",\"https://api.bloock.dev/hosting/v1/ipfs/QmYMYpSQsFbqXgSRK8KFDGMopD2CUke5yd4m7XFuVAZTat\"],\"id\":\"https://clientHost.com/v1/did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/2ff36890-2fc1-4bba-b489-bdd7685e9555\",\"type\":[\"VerifiableCredential\",\"DrivingLicense\"],\"issuanceDate\":\"2023-08-21T10:21:42.402140Z\",\"expirationDate\":\"2099-08-08T06:02:22Z\",\"credentialSubject\":{\"birth_date\":921950325,\"country\":\"Spain\",\"first_surname\":\"Tomas\",\"id\":\"did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr\",\"license_type\":1,\"name\":\"Eduard\",\"nif\":\"54688188M\",\"second_surname\":\"Escoruela\",\"type\":\"DrivingLicense\"},\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/3553270275\",\"revocationNonce\":3553270275,\"type\":\"SparseMerkleTreeProof\"},\"issuer\":\"did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"credentialSchema\":{\"id\":\"https://api.bloock.dev/hosting/v1/ipfs/QmWkPu699EF334ixBGEK7rDDurQfu2SYBXU39bSozu1i5h\",\"type\":\"JsonSchema2023\"},\"proof\":[{\"coreClaim\":\"e055485e9b8410b3cd71cb3ba3a0b7652a00000000000000000000000000000002125caf312e33a0b0c82d57fdd240b7261d58901a346261c5ce5621136c0b0056d1a9bf4e9d10b44fdd5b0f6b740b21dcd6675e770bf882249b8083471858190000000000000000000000000000000000000000000000000000000000000000039acad300000000ee30c6f30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"issuerData\":{\"authCoreClaim\":\"cca3371a6cb1b715004407e325bd993c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fbd3b6b8c8e24e08bb982c7d4990e594747e5c24d98ac4ec969e50e437c1eb08407c9e5acc278a1641c82488f7518432a5937973d4ddfe551e32f9f7ba4c4a2e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did%3Apolygonid%3Apolygon%3Amumbai%3A2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/0\",\"revocationNonce\":0,\"type\":\"SparseMerkleTreeProof\"},\"id\":\"did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"mtp\":{\"existence\":true,\"siblings\":[]},\"state\":{\"claimsTreeRoot\":\"0da5ac49846ae0074b986e5eef7c84011529e9902a0ffc6e9973b5cd0d217709\",\"value\":\"778582fc18b636314cc027a7772c1429028d44cdd17234f06e6d2d59bedee31d\"}},\"signature\":\"7bf882354b7cedd4b7ee74590cd3b091fef7545cb4ae8cd35c72b106ff858a0a3b1272ab7748cf7187d2383acda44bdae4bce1a7f9dccc11921fb0f19a70ee03\",\"type\":\"BJJSignature2021\"}]}";
  String apiManagedHost = "https://clientHost.com";
  String drivingLicenseSchemaType = "DrivingLicense";
  String holderDid = "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr";
  Long expiration = 4089852142L;

  @BeforeAll
  static void beforeAll() {
    Utils.initDevSdk();
  }

  @Test
  void credentialToFromJson() throws Exception {
    Credential credential = Credential.fromJson(credentialJson);
    String json = credential.toJson();

    Credential newCredential = Credential.fromJson(json);
    String newCredentialJson = newCredential.toJson();
    assertEquals(json, newCredentialJson);
  }

  @Test
  void endToEnd() throws Exception {
    IdentityClient identityClient = new IdentityClient(apiManagedHost);
    KeyClient keyClient = new KeyClient();

    KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
    KeyType keyType = KeyType.Bjj;

    ManagedKey managedKey = keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType));

    ManagedKey notFoundManagedKey = keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType));

    ManagedKey keyBjj = keyClient.loadManagedKey(managedKey.getId());

    BjjIssuerKey issuerKey = new BjjIssuerKey(new IssuerKeyArgs(keyBjj));
    BjjIssuerKey notFoundIssuerKey = new BjjIssuerKey(new IssuerKeyArgs(notFoundManagedKey));

    String issuer = identityClient.createIssuer(issuerKey);
    assertTrue(issuer.contains("polygonid"));

    assertThrows(
        Exception.class,
        () -> {
          identityClient.createIssuer(issuerKey);
          throw new RuntimeException("This is an intentional exception.");
        });

    String getIssuerDid = identityClient.getIssuerByKey(issuerKey);
    assertEquals(issuer, getIssuerDid);

    String getNotFoundIssuerDid = identityClient.getIssuerByKey(notFoundIssuerKey);
    assertTrue(getNotFoundIssuerDid.isEmpty());

    IssuerParams issuerParams = new IssuerParams(Method.IDEN3, Blockchain.POLYGON, Network.MUMBAI);
    String newIssuer = identityClient.createIssuer(notFoundIssuerKey, issuerParams);
    assertTrue(newIssuer.contains("iden3"));

    List<String> issuers = identityClient.getIssuerList();
    assertNotNull(issuers);

    ArrayList<ProofType> proofList = new ArrayList<>(
        Arrays.asList(ProofType.INTEGRITY_PROOF_TYPE, ProofType.SPARSE_MT_PROOF_TYPE));

    List<String> stringList = new ArrayList<>();
    stringList.add("big");
    stringList.add("medium");
    stringList.add("small");
    List<Long> integerList = new ArrayList<>();
    integerList.add(1L);
    integerList.add(5L);
    integerList.add(10L);
    List<Double> doubleList = new ArrayList<>();
    doubleList.add(1.10);
    doubleList.add(1.20);
    doubleList.add(1.30);

    Schema schema = identityClient
        .buildSchema(
            "Driving License",
            drivingLicenseSchemaType,
            "1.0",
            "driving license schema",
            issuer)
        .addIntegerAttribute("License Type", "license_type", "license type", false)
        .addDecimalAttribute("Quantity Oil", "quantity_oil", "quantity oil", true)
        .addStringAttribute("Nif", "nif", "nif", true)
        .addBooleanAttribute("Is Spanish", "is_spanish", "is_spanish", true)
        .addDateAttribute("Birth Date", "birth_date", "birth date", true)
        .addDatetimeAttribute("Local Hour", "local_hour", "local hour", true)
        .addStringEnumAttribute("Car Type", "car_type", "car type", true, stringList)
        .addIntegerEnumAttribute("Car Points", "car_points", "car points", true, integerList)
        .addDecimalEnumAttribute(
            "Precision wheels", "precision_wheels", "precision wheels", true, doubleList)
        .build();
    assertNotNull(schema.getCid());

    Schema getSchema = identityClient.getSchema(schema.getCid());
    assertNotNull(getSchema.getCidJsonLD());
    assertNotNull(getSchema.getJson());
    assertNotNull(getSchema.getSchemaType());

    CredentialReceipt receipt = identityClient
        .buildCredential(schema.getCid(), issuer, holderDid, expiration, 0)
        .withIntegerAttribute("license_type", 1L)
        .withDecimalAttribute("quantity_oil", 2.25555)
        .withStringAttribute("nif", "54688188M")
        .withBooleanAttribute("is_spanish", true)
        .withDateAttribute("birth_date", LocalDate.of(1999, 3, 20))
        .withDatetimeAttribute("local_hour", LocalDateTime.now())
        .withStringAttribute("car_type", "big")
        .withIntegerAttribute("car_points", 5L)
        .withDecimalAttribute("precision_wheels", 1.10)
        .withSigner(new Signer(new SignerArgs(keyBjj)))
        .WithProofType(proofList)
        .build();
    assertNotNull(receipt.getCredentialId());
    assertNotNull(receipt.getAnchorId());
    assertNotNull(receipt.getCredential());
    assertEquals(drivingLicenseSchemaType, receipt.getCredentialType());

    Credential credential = receipt.getCredential();
    assertEquals(issuer, credential.getIssuer());
    assertEquals("JsonSchema2023", credential.getCredentialSchema().getCredentialType());
    assertEquals(drivingLicenseSchemaType, credential.getType().get(1));

    IssuerStateReceipt stateReceipt = identityClient
        .buildIssuerStatePublisher(issuer)
        .withSigner(new Signer(new SignerArgs(keyBjj)))
        .build();
    assertNotNull(stateReceipt.getTxHash());

    assertThrows(
        Exception.class,
        () -> {
          identityClient
              .buildIssuerStatePublisher(issuer)
              .withSigner(new Signer(new SignerArgs(keyBjj)))
              .build();
          throw new RuntimeException("This is an intentional exception.");
        });

    Boolean ok = identityClient.revokeCredential(credential);
    assertTrue(ok);

    assertThrows(
        Exception.class,
        () -> {
          identityClient.buildIssuerStatePublisher(issuer).build();
          throw new RuntimeException("This is an intentional exception.");
        });
  }
}
