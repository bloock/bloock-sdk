import com.bloock.sdk.Bloock;
import com.bloock.sdk.builder.Builder;
import com.bloock.sdk.client.Client;
import com.bloock.sdk.entity.AesDecrypter;
import com.bloock.sdk.entity.AesEncrypter;
import com.bloock.sdk.entity.Anchor;
import com.bloock.sdk.entity.AnchorNetwork;
import com.bloock.sdk.entity.EcdsaSigner;
import com.bloock.sdk.entity.EciesDecrypter;
import com.bloock.sdk.entity.EciesEncrypter;
import com.bloock.sdk.entity.HostedLoader;
import com.bloock.sdk.entity.HostedPublisher;
import com.bloock.sdk.entity.IpfsLoader;
import com.bloock.sdk.entity.IpfsPublisher;
import com.bloock.sdk.entity.KeyPair;
import com.bloock.sdk.entity.Keys;
import com.bloock.sdk.entity.Network;
import com.bloock.sdk.entity.Proof;
import com.bloock.sdk.entity.ProofAnchor;
import com.bloock.sdk.entity.Record;
import com.bloock.sdk.entity.RecordReceipt;
import com.bloock.sdk.entity.RsaDecrypter;
import com.bloock.sdk.entity.RsaEncrypter;
import com.bloock.sdk.entity.RsaKeyPair;
import com.bloock.sdk.entity.Signature;
import com.bloock.sdk.entity.SignerArgs;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Test {
  static Client getSdk() {
    Bloock.apiKey = System.getenv("API_KEY");
    String apiHost = System.getenv("API_HOST");
    if (apiHost != null) {
      Bloock.apiHost = apiHost;
    }
    Bloock.disableAnalytics = true;
    return new Client();
  }

  public static void main(String[] args) throws Exception {
    Client sdk = getSdk();

    testVerifyWebhookSignatureOk(sdk);
    testVerifyWebhookSignatureInvalidSecret(sdk);

    testEnd2End(sdk);
  }

  static void testEnd2End(Client sdk) throws Exception {
    ArrayList<Record> records = new ArrayList<>();

    records.add(testFromString());
    records.add(testFromBytes());
    records.add(testFromHex());
    records.add(testFromJson());
    records.add(testFromFile());
    records.add(testEcdsaSignature(sdk));

    testFromHostedLoader();
    testFromIpfsLoader();

    testAesEncryption();
    testAesEncryptionHosted();
    testAesEncryptionIpfs();

    testRsaEncryption(sdk);
    testRsaEncryptionHosted(sdk);
    testRsaEncryptionIpfs(sdk);

    testEciesEncryption(sdk);
    testEciesEncryptionHosted(sdk);
    testEciesEncryptionIpfs(sdk);

    testSetProof(sdk);

    List<RecordReceipt> receipts = sdk.sendRecords(records);

    assert receipts.size() > 0;
    assert receipts.get(0).getRecord().equals(records.get(0).getHash());

    Anchor anchor = sdk.waitAnchor(receipts.get(0).getAnchor());

    assert receipts.get(0).getAnchor() == anchor.getId();

    Proof proof = sdk.getProof(records);

    String root = sdk.verifyProof(proof);
    assert root != "";
    assert root != null;

    long timestampValidateRoot = sdk.validateRoot(root, Network.BLOOCK_CHAIN);

    assert timestampValidateRoot > 0;

    long timestampVerifyRecords = sdk.verifyRecords(records, Network.BLOOCK_CHAIN);

    assert timestampVerifyRecords > 0;

    assert timestampValidateRoot == timestampVerifyRecords;
  }

  static Record testFromString() throws Exception {
    Record record = Builder.fromString("Hello world").build();
    String hash = record.getHash();
    assert hash.equals("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd");
    return record;
  }

  static Record testFromBytes() throws Exception {
    Record record = Builder.fromBytes(new byte[] {1, 2, 3, 4, 5}).build();
    String hash = record.getHash();
    assert hash.equals("7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4");
    return record;
  }

  static Record testFromHex() throws Exception {
    Record record = Builder.fromHex("1234567890abcdef").build();
    String hash = record.getHash();
    assert hash.equals("ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f");
    return record;
  }

  static Record testFromJson() throws Exception {
    Record record = Builder.fromJson("{\"hello\":\"world\"}").build();
    String hash = record.getHash();
    assert hash.equals("586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312");
    return record;
  }

  static Record testFromFile() throws Exception {
    Record record = Builder.fromFile(new byte[] {2, 3, 4, 5, 6}).build();
    String hash = record.getHash();
    assert hash.equals("507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446");
    return record;
  }

  static void testFromHostedLoader() throws Exception {
    Record record = Builder.fromString("Hello world").build();
    String hash = record.getHash();

    String result = record.publish(new HostedPublisher());
    assert result.equals(hash);

    record = Builder.fromLoader(new HostedLoader(result)).build();
    hash = record.getHash();
    assert hash.equals(result);
  }

  static void testFromIpfsLoader() throws Exception {
    Record record = Builder.fromString("Hello world").build();
    String hash = record.getHash();

    String result = record.publish(new IpfsPublisher());
    assert result.equals(hash);

    record = Builder.fromLoader(new IpfsLoader(result)).build();
    hash = record.getHash();
    assert hash.equals(result);
  }

  static Record testEcdsaSignature(Client sdk) throws Exception {
    Keys keys = sdk.generateKeys();
    String name = "Some name";

    Record signedRecord =
        Builder.fromString("Hello world 3")
            .withSigner(new EcdsaSigner(new SignerArgs(keys.getPrivateKey(), name)))
            .build();

    Keys keys2 = sdk.generateKeys();

    Record recordWithMultipleSignatures =
        Builder.fromRecord(signedRecord).withSigner(new EcdsaSigner(keys2.getPrivateKey())).build();

    String hash = recordWithMultipleSignatures.getHash();
    assert hash.equals("79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f");

    List<Signature> signatures = recordWithMultipleSignatures.getSignatures();
    assert signatures.size() == 2;

    assert signatures.get(0).getCommonName().equals(name);

    return recordWithMultipleSignatures;
  }

  static void testAesEncryption() throws Exception {
    String payload = "Hello world 2";
    String password = "some_password";
    Record encryptedRecord =
        Builder.fromString(payload).withEncrypter(new AesEncrypter(password)).build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    boolean throwsException = false;
    try {
      Builder.fromRecord(encryptedRecord)
          .withDecrypter(new AesDecrypter("incorrect_password"))
          .build();
    } catch (Exception e) {
      throwsException = true;
    }
    assert throwsException;

    Record decryptedRecord =
        Builder.fromRecord(encryptedRecord).withDecrypter(new AesDecrypter(password)).build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testAesEncryptionHosted() throws Exception {
    String payload = "Hello world 2";
    String password = "some_password";
    Record encryptedRecord =
        Builder.fromString(payload).withEncrypter(new AesEncrypter(password)).build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    String result = encryptedRecord.publish(new HostedPublisher());

    Record loadedRecord = Builder.fromLoader(new HostedLoader(result)).build();

    Record decryptedRecord =
        Builder.fromRecord(loadedRecord).withDecrypter(new AesDecrypter(password)).build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testAesEncryptionIpfs() throws Exception {
    String payload = "Hello world 2";
    String password = "some_password";
    Record encryptedRecord =
        Builder.fromString(payload).withEncrypter(new AesEncrypter(password)).build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    String result = encryptedRecord.publish(new IpfsPublisher());

    Record loadedRecord = Builder.fromLoader(new IpfsLoader(result)).build();

    Record decryptedRecord =
        Builder.fromRecord(loadedRecord).withDecrypter(new AesDecrypter(password)).build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testRsaEncryption(Client sdk) throws Exception {
    String payload = "Hello world 2";
    RsaKeyPair keyPair = sdk.generateRsaKeyPair();
    Record encryptedRecord =
        Builder.fromString(payload).withEncrypter(new RsaEncrypter(keyPair.getPublicKey())).build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    Record decryptedRecord =
        Builder.fromRecord(encryptedRecord)
            .withDecrypter(new RsaDecrypter(keyPair.getPrivateKey()))
            .build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testRsaEncryptionHosted(Client sdk) throws Exception {
    String payload = "Hello world 2";
    RsaKeyPair keyPair = sdk.generateRsaKeyPair();
    Record encryptedRecord =
        Builder.fromString(payload).withEncrypter(new RsaEncrypter(keyPair.getPublicKey())).build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    String result = encryptedRecord.publish(new HostedPublisher());

    Record loadedRecord = Builder.fromLoader(new HostedLoader(result)).build();

    Record decryptedRecord =
        Builder.fromRecord(loadedRecord)
            .withDecrypter(new RsaDecrypter(keyPair.getPrivateKey()))
            .build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testRsaEncryptionIpfs(Client sdk) throws Exception {
    String payload = "Hello world 2";
    RsaKeyPair keyPair = sdk.generateRsaKeyPair();
    Record encryptedRecord =
        Builder.fromString(payload).withEncrypter(new RsaEncrypter(keyPair.getPublicKey())).build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    String result = encryptedRecord.publish(new IpfsPublisher());

    Record loadedRecord = Builder.fromLoader(new IpfsLoader(result)).build();

    Record decryptedRecord =
        Builder.fromRecord(loadedRecord)
            .withDecrypter(new RsaDecrypter(keyPair.getPrivateKey()))
            .build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testEciesEncryption(Client sdk) throws Exception {
    String payload = "Hello world 2";
    KeyPair keyPair = sdk.generateEciesKeyPair();
    Record encryptedRecord =
        Builder.fromString(payload)
            .withEncrypter(new EciesEncrypter(keyPair.getPublicKey()))
            .build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    Record decryptedRecord =
        Builder.fromRecord(encryptedRecord)
            .withDecrypter(new EciesDecrypter(keyPair.getPrivateKey()))
            .build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testEciesEncryptionHosted(Client sdk) throws Exception {
    String payload = "Hello world 2";
    KeyPair keyPair = sdk.generateEciesKeyPair();
    Record encryptedRecord =
        Builder.fromString(payload)
            .withEncrypter(new EciesEncrypter(keyPair.getPublicKey()))
            .build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    String result = encryptedRecord.publish(new HostedPublisher());

    Record loadedRecord = Builder.fromLoader(new HostedLoader(result)).build();

    Record decryptedRecord =
        Builder.fromRecord(loadedRecord)
            .withDecrypter(new EciesDecrypter(keyPair.getPrivateKey()))
            .build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testEciesEncryptionIpfs(Client sdk) throws Exception {
    String payload = "Hello world 2";
    KeyPair keyPair = sdk.generateEciesKeyPair();
    Record encryptedRecord =
        Builder.fromString(payload)
            .withEncrypter(new EciesEncrypter(keyPair.getPublicKey()))
            .build();
    assert payload.getBytes() != encryptedRecord.retrieve();

    String result = encryptedRecord.publish(new IpfsPublisher());

    Record loadedRecord = Builder.fromLoader(new IpfsLoader(result)).build();

    Record decryptedRecord =
        Builder.fromRecord(loadedRecord)
            .withDecrypter(new EciesDecrypter(keyPair.getPrivateKey()))
            .build();

    assert Arrays.equals(decryptedRecord.retrieve(), payload.getBytes());

    String hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");
  }

  static void testSetProof(Client sdk) throws Exception {
    Record record = Builder.fromString("Hello world").build();

    Proof originalProof =
        new Proof(
            Arrays.asList("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"),
            Arrays.asList("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"),
            "1010101",
            "0101010",
            new ProofAnchor(
                42L,
                Arrays.asList(
                    new AnchorNetwork(
                        "Ethereum",
                        "state",
                        "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd")),
                "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
                "succes"));

    record.setProof(originalProof);

    Proof finalProof = sdk.getProof(Arrays.asList(record));

    assert originalProof.getLeaves().equals(finalProof.getLeaves());
    assert originalProof.getNodes().equals(finalProof.getNodes());
    assert originalProof.getDepth().equals(finalProof.getDepth());
    assert originalProof.getBitmap().equals(finalProof.getBitmap());

    assert originalProof.getAnchor().getAnchorId() == finalProof.getAnchor().getAnchorId();
    assert originalProof.getAnchor().getRoot().equals(finalProof.getAnchor().getRoot());
    assert originalProof.getAnchor().getStatus().equals(finalProof.getAnchor().getStatus());
  }

  private static void testVerifyWebhookSignatureOk(Client client) throws Exception {
    String payload =
        "{\"webhook_id\":\"80b505b4-df81-48f4-92a6-69cbc1a114a0\",\"request_id\":\"8d30ef45-69a3-4cdd-8457-8cad485848f2\",\"type\":\"core.bloock_chain\",\"created_at\":1672909660,\"data\":{\"created_at\":1672909591,\"finalized\":true,\"id\":105122,\"message_count\":1,\"network\":{\"anchor_id\":105122,\"created_at\":1672909661,\"name\":\"bloock_chain\",\"status\":\"Confirmed\",\"test\":false,\"tx_hash\":\"0x53d1c7c1ff8100b921ce0ef593c81ed4e5e50eff888b3bb5c69260c13f0b2f58\"},\"root\":\"fd71e7ac128ff2219853e43e4044769df36c5329ce34655b4c5d166d1564d5b7\",\"test\":false}}";
    String header =
        "t=1672909660,v1=955e726c98d606ff5534d325f68854173411be61698ef7c5c466a5485f979a29";
    String secret = "NHJTAE6ikKBccSaeCSBSWGdp7NmixXy7";

    boolean isValid = client.verifyWebhookSignature(payload.getBytes(), header, secret, false);
    assert isValid;
  }

  private static void testVerifyWebhookSignatureInvalidSecret(Client client) throws Exception {
    String payload =
        "{\"webhook_id\":\"80b505b4-df81-48f4-92a6-69cbc1a114a0\",\"request_id\":\"8d30ef45-69a3-4cdd-8457-8cad485848f2\",\"type\":\"core.bloock_chain\",\"created_at\":1672909660,\"data\":{\"created_at\":1672909591,\"finalized\":true,\"id\":105122,\"message_count\":1,\"network\":{\"anchor_id\":105122,\"created_at\":1672909661,\"name\":\"bloock_chain\",\"status\":\"Confirmed\",\"test\":false,\"tx_hash\":\"0x53d1c7c1ff8100b921ce0ef593c81ed4e5e50eff888b3bb5c69260c13f0b2f58\"},\"root\":\"fd71e7ac128ff2219853e43e4044769df36c5329ce34655b4c5d166d1564d5b7\",\"test\":false}}";
    String header =
        "t=1672909660,v1=955e726c98d606ff5534d325f68854173411be61698ef7c5c466a5485f979a29";
    String secret = "asdf";

    boolean isValid = client.verifyWebhookSignature(payload.getBytes(), header, secret, false);
    assert !isValid;
  }
}
