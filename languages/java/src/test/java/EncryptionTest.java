import static org.junit.jupiter.api.Assertions.assertEquals;

import com.bloock.sdk.client.EncryptionClient;
import com.bloock.sdk.client.KeyClient;
import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.entity.encryption.*;
import com.bloock.sdk.entity.key.*;
import com.bloock.sdk.entity.record.Record;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class EncryptionTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initSdk();
  }

  @Test
  void encryptLocalAes() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString(payload).build();
    String recordHash = record.getHash();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.Aes256);

    EncryptionClient encryptionClient = new EncryptionClient();

    Record encryptedRecord = encryptionClient.encrypt(record, new AesEncrypter(localKey));

    Record decryptedRecord =
        recordClient.fromRecord(encryptedRecord).withDecrypter(new AesDecrypter(localKey)).build();

    String decryptedRecordHash = decryptedRecord.getHash();
    assertEquals(recordHash, decryptedRecordHash);
  }

  @Test
  void decryptLocalAes() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();

    EncryptionClient encryptionClient = new EncryptionClient();
    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.Aes256);

    Record encryptedRecord =
        recordClient.fromString(payload).withEncrypter(new AesEncrypter(localKey)).build();
    String encryptedRecordHash = encryptedRecord.getHash();

    Record decryptedRecord = encryptionClient.decrypt(encryptedRecord, new AesDecrypter(localKey));
    String decryptedRecordHash = decryptedRecord.getHash();

    assertEquals(encryptedRecordHash, decryptedRecordHash);
  }

  @Test
  void encryptLocalRsa() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString(payload).build();
    String recordHash = record.getHash();

    EncryptionClient encryptionClient = new EncryptionClient();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.Rsa2048);

    Record encryptedRecord = encryptionClient.encrypt(record, new RsaEncrypter(localKey));

    Record decryptedRecord =
        recordClient.fromRecord(encryptedRecord).withDecrypter(new RsaDecrypter(localKey)).build();

    String decryptedRecordHash = decryptedRecord.getHash();
    assertEquals(recordHash, decryptedRecordHash);
  }

  @Test
  void decryptLocalRsa() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();

    EncryptionClient encryptionClient = new EncryptionClient();
    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.Rsa2048);

    Record encryptedRecord =
        recordClient.fromString(payload).withEncrypter(new RsaEncrypter(localKey)).build();
    String encryptedRecordHash = encryptedRecord.getHash();

    Record decryptedRecord = encryptionClient.decrypt(encryptedRecord, new RsaDecrypter(localKey));
    String decryptedRecordHash = decryptedRecord.getHash();

    assertEquals(encryptedRecordHash, decryptedRecordHash);
  }

  @Test
  void encryptManagedRsa() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString(payload).build();
    String recordHash = record.getHash();

    EncryptionClient encryptionClient = new EncryptionClient();

    KeyClient keyClient = new KeyClient();
    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Rsa2048));

    Record encryptedRecord = encryptionClient.encrypt(record, new RsaEncrypter(managedKey));

    Record decryptedRecord =
        recordClient
            .fromRecord(encryptedRecord)
            .withDecrypter(new RsaDecrypter(managedKey))
            .build();

    String decryptedRecordHash = decryptedRecord.getHash();
    assertEquals(recordHash, decryptedRecordHash);
  }

  @Test
  void decryptManagedRsa() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();

    EncryptionClient encryptionClient = new EncryptionClient();
    KeyClient keyClient = new KeyClient();
    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Rsa2048));

    Record encryptedRecord =
        recordClient.fromString(payload).withEncrypter(new RsaEncrypter(managedKey)).build();
    String encryptedRecordHash = encryptedRecord.getHash();

    Record decryptedRecord =
        encryptionClient.decrypt(encryptedRecord, new RsaDecrypter(managedKey));
    String decryptedRecordHash = decryptedRecord.getHash();

    assertEquals(encryptedRecordHash, decryptedRecordHash);
  }

  @Test
  void getEncryptionAlg() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();

    EncryptionClient encryptionClient = new EncryptionClient();
    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.Rsa2048);

    Record encryptedRecord =
        recordClient.fromString(payload).withEncrypter(new RsaEncrypter(localKey)).build();

    EncryptionAlg alg = encryptionClient.getEncryptionAlg(encryptedRecord);
    assertEquals(alg, EncryptionAlg.RSA);
  }
}
