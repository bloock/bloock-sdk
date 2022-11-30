import com.bloock.sdk.Bloock;
import com.bloock.sdk.builder.Builder;
import com.bloock.sdk.client.Client;
import com.bloock.sdk.entity.AesDecrypter;
import com.bloock.sdk.entity.AesEncrypter;
import com.bloock.sdk.entity.Anchor;
import com.bloock.sdk.entity.EcsdaSigner;
import com.bloock.sdk.entity.HostedLoader;
import com.bloock.sdk.entity.HostedPublisher;
import com.bloock.sdk.entity.Keys;
import com.bloock.sdk.entity.Network;
import com.bloock.sdk.entity.Proof;
import com.bloock.sdk.entity.Record;
import com.bloock.sdk.entity.RecordReceipt;
import com.bloock.sdk.entity.RsaDecrypter;
import com.bloock.sdk.entity.RsaEncrypter;
import com.bloock.sdk.entity.RsaKeyPair;
import com.bloock.sdk.entity.Signature;
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
    return new Client();
  }

  public static void main(String[] args) throws Exception {
    Client sdk = getSdk();
    ArrayList<String> records = new ArrayList<>();

    Record record = Builder.fromString("Hello world").build();
    String hash = record.getHash();
    assert hash.equals("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd");

    String result = record.publish(new HostedPublisher());
    assert result.equals(hash);

    record = Builder.fromLoader(new HostedLoader(result)).build();
    hash = record.getHash();
    assert hash.equals(result);
    records.add(hash);

    record = Builder.fromBytes(new byte[] {1, 2, 3, 4, 5}).build();
    hash = record.getHash();
    assert hash.equals("7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4");
    records.add(hash);

    record = Builder.fromHex("1234567890abcdef").build();
    hash = record.getHash();
    assert hash.equals("ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f");
    records.add(hash);

    record = Builder.fromJson("{\"hello\":\"world\"}").build();
    hash = record.getHash();
    assert hash.equals("586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312");
    records.add(hash);

    record = Builder.fromFile(new byte[] {2, 3, 4, 5, 6}).build();
    hash = record.getHash();
    assert hash.equals("507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446");
    records.add(hash);

    String payload = "Hello world 2";
    Record encryptedRecord =
        Builder.fromString(payload).withEncrypter(new AesEncrypter("some_password")).build();
    assert payload.getBytes() != encryptedRecord.getPayload();

    Record decryptedRecord =
        Builder.fromRecord(encryptedRecord)
            .withDecrypter(new AesDecrypter("some_password"))
            .build();

    assert Arrays.equals(decryptedRecord.getPayload(), payload.getBytes());

    hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");

    RsaKeyPair keyPair = sdk.generateRsaKeyPair();
    encryptedRecord =
        Builder.fromString(payload).withEncrypter(new RsaEncrypter(keyPair.getPublicKey())).build();
    assert payload.getBytes() != encryptedRecord.getPayload();

    decryptedRecord =
        Builder.fromRecord(encryptedRecord)
            .withDecrypter(new RsaDecrypter(keyPair.getPrivateKey()))
            .build();

    assert Arrays.equals(decryptedRecord.getPayload(), payload.getBytes());

    hash = decryptedRecord.getHash();
    assert hash.equals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6");

    records.add(hash);

    boolean throwsException = false;
    try {
      Builder.fromRecord(encryptedRecord)
          .withDecrypter(new AesDecrypter("incorrect_password"))
          .build();
    } catch (Exception e) {
      throwsException = true;
    }
    assert throwsException;

    Keys keys = sdk.generateKeys();
    Record signedRecord =
        Builder.fromString("Hello world 3")
            .withSigner(new EcsdaSigner(keys.getPrivateKey()))
            .build();

    Keys keys2 = sdk.generateKeys();
    Record recordWithMultipleSignatures =
        Builder.fromRecord(signedRecord).withSigner(new EcsdaSigner(keys2.getPrivateKey())).build();

    hash = recordWithMultipleSignatures.getHash();
    assert hash.equals("79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f");
    records.add(hash);

    List<Signature> signatures = recordWithMultipleSignatures.getSignatures();
    assert signatures.size() == 2;

    List<RecordReceipt> receipts = sdk.sendRecords(records);

    assert receipts.size() > 0;
    assert receipts.get(0).getRecord().equals(records.get(0));

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
}
