import static org.junit.jupiter.api.Assertions.assertEquals;

import com.bloock.sdk.client.EncryptionClient;
import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.entity.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class EncryptionTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initSdk();
  }

  @Test
  void encryptAes() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString(payload).build();
    String recordHash = record.getHash();

    String password = "some_password";
    EncryptionClient encryptionClient = new EncryptionClient();

    Record encryptedRecord = encryptionClient.encrypt(record, new AesEncrypter(password));

    Record decryptedRecord =
        recordClient.fromRecord(encryptedRecord).withDecrypter(new AesDecrypter(password)).build();

    String decryptedRecordHash = decryptedRecord.getHash();
    assertEquals(recordHash, decryptedRecordHash);
  }

  @Test
  void decryptAes() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();

    EncryptionClient encryptionClient = new EncryptionClient();
    String password = "some_password";

    Record encryptedRecord =
        recordClient.fromString(payload).withEncrypter(new AesEncrypter(password)).build();
    String encryptedRecordHash = encryptedRecord.getHash();

    Record decryptedRecord = encryptionClient.decrypt(encryptedRecord, new AesDecrypter(password));
    String decryptedRecordHash = decryptedRecord.getHash();

    assertEquals(encryptedRecordHash, decryptedRecordHash);
  }

  @Test
  void encryptRsa() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString(payload).build();
    String recordHash = record.getHash();

    EncryptionClient encryptionClient = new EncryptionClient();

    RsaKeyPair keys = encryptionClient.generateRsaKeyPair();
    Record encryptedRecord =
        encryptionClient.encrypt(record, new RsaEncrypter(keys.getPublicKey()));

    Record decryptedRecord =
        recordClient
            .fromRecord(encryptedRecord)
            .withDecrypter(new RsaDecrypter(keys.getPrivateKey()))
            .build();

    String decryptedRecordHash = decryptedRecord.getHash();
    assertEquals(recordHash, decryptedRecordHash);
  }

  @Test
  void decryptRsa() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();

    EncryptionClient encryptionClient = new EncryptionClient();
    RsaKeyPair keys = encryptionClient.generateRsaKeyPair();

    Record encryptedRecord =
        recordClient
            .fromString(payload)
            .withEncrypter(new RsaEncrypter(keys.getPublicKey()))
            .build();
    String encryptedRecordHash = encryptedRecord.getHash();

    Record decryptedRecord =
        encryptionClient.decrypt(encryptedRecord, new RsaDecrypter(keys.getPrivateKey()));
    String decryptedRecordHash = decryptedRecord.getHash();

    assertEquals(encryptedRecordHash, decryptedRecordHash);
  }

  @Test
  void encryptEcies() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString(payload).build();
    String recordHash = record.getHash();

    EncryptionClient encryptionClient = new EncryptionClient();

    EciesKeyPair keys = encryptionClient.generateEciesKeyPair();
    Record encryptedRecord =
        encryptionClient.encrypt(record, new EciesEncrypter(keys.getPublicKey()));

    Record decryptedRecord =
        recordClient
            .fromRecord(encryptedRecord)
            .withDecrypter(new EciesDecrypter(keys.getPrivateKey()))
            .build();

    String decryptedRecordHash = decryptedRecord.getHash();
    assertEquals(recordHash, decryptedRecordHash);
  }

  @Test
  void decryptEcies() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();

    EncryptionClient encryptionClient = new EncryptionClient();
    EciesKeyPair keys = encryptionClient.generateEciesKeyPair();

    Record encryptedRecord =
        recordClient
            .fromString(payload)
            .withEncrypter(new EciesEncrypter(keys.getPublicKey()))
            .build();
    String encryptedRecordHash = encryptedRecord.getHash();

    Record decryptedRecord =
        encryptionClient.decrypt(encryptedRecord, new EciesDecrypter(keys.getPrivateKey()));
    String decryptedRecordHash = decryptedRecord.getHash();

    assertEquals(encryptedRecordHash, decryptedRecordHash);
  }

  @Test
  void getEncryptionAlg() throws Exception {
    String payload = "Hello world";

    RecordClient recordClient = new RecordClient();

    EncryptionClient encryptionClient = new EncryptionClient();
    EciesKeyPair keys = encryptionClient.generateEciesKeyPair();

    Record encryptedRecord =
        recordClient
            .fromString(payload)
            .withEncrypter(new EciesEncrypter(keys.getPublicKey()))
            .build();

    EncryptionAlg alg = encryptionClient.getEncryptionAlg(encryptedRecord);
    assertEquals(alg, EncryptionAlg.ECIES);
  }
}
