import static org.junit.jupiter.api.Assertions.*;

import com.bloock.sdk.client.*;
import com.bloock.sdk.entity.authenticity.*;
import com.bloock.sdk.entity.availability.HostedLoader;
import com.bloock.sdk.entity.availability.HostedPublisher;
import com.bloock.sdk.entity.availability.IpfsLoader;
import com.bloock.sdk.entity.availability.IpfsPublisher;
import com.bloock.sdk.entity.encryption.*;
import com.bloock.sdk.entity.integrity.AnchorNetwork;
import com.bloock.sdk.entity.integrity.Proof;
import com.bloock.sdk.entity.integrity.ProofAnchor;
import com.bloock.sdk.entity.key.KeyType;
import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.record.Record;
import java.util.Collections;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class RecordTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initSdk();
  }

  @Test
  void testFromString() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();
    String hash = record.getHash();
    assertEquals(hash, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd");
  }

  @Test
  void testFromBytes() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromBytes(new byte[] {1, 2, 3, 4, 5}).build();
    String hash = record.getHash();
    assertEquals(hash, "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4");
  }

  @Test
  void testFromHex() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromHex("1234567890abcdef").build();
    String hash = record.getHash();
    assertEquals(hash, "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f");
  }

  @Test
  void testFromJson() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromJson("{\"hello\":\"world\"}").build();
    String hash = record.getHash();
    assertEquals(hash, "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312");
  }

  @Test
  void testFromFile() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromFile(new byte[] {2, 3, 4, 5, 6}).build();
    String hash = record.getHash();
    assertEquals(hash, "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446");
  }

  @Test
  void testFromHostedLoader() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();
    byte[] payload = record.retrieve();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    String result = availabilityClient.publish(record, new HostedPublisher());

    record = recordClient.fromLoader(new HostedLoader(result)).build();
    assertArrayEquals(record.retrieve(), payload);
  }

  @Test
  void testFromIpfsLoader() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();
    byte[] payload = record.retrieve();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    String result = availabilityClient.publish(record, new IpfsPublisher());

    record = recordClient.fromLoader(new IpfsLoader(result)).build();
    assertArrayEquals(record.retrieve(), payload);
  }

  /*@Test
  void testEcdsaSignature() throws Exception {
    AuthenticityClient authenticityClient = new AuthenticityClient();
    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);
    String name = "Some name";

    RecordClient recordClient = new RecordClient();
    Record signedRecord =
        recordClient
            .fromString("Hello world 3")
            .withSigner(new Signer(new SignerArgs(localKey, name)))
            .build();

    Record recordWithMultipleSignatures =
        recordClient
            .fromRecord(signedRecord)
            .withSigner(new Signer(new SignerArgs(localKey)))
            .build();

    List<Signature> signatures = authenticityClient.getSignatures(recordWithMultipleSignatures);
    assertEquals(signatures.size(), 2);

    assertEquals(authenticityClient.getSignatureCommonName(signatures.get(0)), name);
    assertEquals(signatures.get(0).getAlg(), SignatureAlg.ECDSA);
  }

  @Test
  void testEnsSignature() throws Exception {
    AuthenticityClient authenticityClient = new AuthenticityClient();
    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    RecordClient recordClient = new RecordClient();
    Record record =
        recordClient
            .fromString("Hello world 4")
            .withSigner(new Signer(new SignerArgs(localKey)))
            .build();

    List<Signature> signatures = authenticityClient.getSignatures(record);
    assertEquals(signatures.size(), 1);
    assertEquals(signatures.get(0).getAlg(), SignatureAlg.ENS);

    signatures
        .get(0)
        .setSignature(
            "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601");
    signatures
        .get(0)
        .setMessageHash("7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6");
    assertEquals(authenticityClient.getSignatureCommonName(signatures.get(0)), "vitalik.eth");
  }*/

  @Test
  void testAesEncryption() throws Exception {
    String payload = "Hello world 2";
    String password = "some_password";
    RecordClient recordClient = new RecordClient();
    Record encryptedRecord =
        recordClient.fromString(payload).withEncrypter(new AesEncrypter(password)).build();
    assertNotEquals(payload.getBytes(), encryptedRecord.retrieve());

    EncryptionClient encryptionClient = new EncryptionClient();
    assertEquals(encryptionClient.getEncryptionAlg(encryptedRecord), EncryptionAlg.AES256GCM);

    boolean throwsException = false;
    try {
      recordClient
          .fromRecord(encryptedRecord)
          .withDecrypter(new AesDecrypter("incorrect_password"))
          .build();
    } catch (Exception e) {
      throwsException = true;
    }
    assertTrue(throwsException);

    Record decryptedRecord =
        recordClient.fromRecord(encryptedRecord).withDecrypter(new AesDecrypter(password)).build();

    assertArrayEquals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assertEquals(hash, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  @Test
  void testRsaEncryption() throws Exception {
    String payload = "Hello world 2";
    EncryptionClient encryptionClient = new EncryptionClient();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.Rsa2048);

    RecordClient recordClient = new RecordClient();
    Record encryptedRecord =
        recordClient.fromString(payload).withEncrypter(new RsaEncrypter(localKey)).build();

    assertNotEquals(payload.getBytes(), encryptedRecord.retrieve());
    assertEquals(encryptionClient.getEncryptionAlg(encryptedRecord), EncryptionAlg.RSA);

    Record decryptedRecord =
        recordClient.fromRecord(encryptedRecord).withDecrypter(new RsaDecrypter(localKey)).build();

    assertArrayEquals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assertEquals(hash, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  @Test
  void testSetProof() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();

    Proof originalProof =
        new Proof(
            Collections.singletonList(
                "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"),
            Collections.singletonList(
                "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"),
            "1010101",
            "0101010",
            new ProofAnchor(
                42L,
                Collections.singletonList(
                    new AnchorNetwork(
                        "Ethereum",
                        "state",
                        "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd")),
                "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
                "succes"));

    record.setProof(originalProof);

    IntegrityClient integrityClient = new IntegrityClient();
    Proof finalProof = integrityClient.getProof(Collections.singletonList(record));

    assertEquals(originalProof.getLeaves(), finalProof.getLeaves());
    assertEquals(originalProof.getNodes(), finalProof.getNodes());
    assertEquals(originalProof.getDepth(), finalProof.getDepth());
    assertEquals(originalProof.getBitmap(), finalProof.getBitmap());

    assertEquals(originalProof.getAnchor().getAnchorId(), finalProof.getAnchor().getAnchorId());
    assertEquals(originalProof.getAnchor().getRoot(), finalProof.getAnchor().getRoot());
    assertEquals(originalProof.getAnchor().getStatus(), finalProof.getAnchor().getStatus());
  }
}
