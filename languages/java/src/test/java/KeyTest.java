import static org.junit.Assert.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.bloock.sdk.client.AuthenticityClient;
import com.bloock.sdk.client.KeyClient;
import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.entity.authenticity.Signature;
import com.bloock.sdk.entity.authenticity.Signer;
import com.bloock.sdk.entity.authenticity.SignerArgs;
import com.bloock.sdk.entity.key.*;
import com.bloock.sdk.entity.record.Record;
import java.io.File;
import java.io.FileInputStream;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class KeyTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initDevSdk();
  }

  @Test
  void generateLocalEcdsa() throws Exception {
    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    assertNotNull(localKey.getKey());
    assertNotNull(localKey.getPrivateKey());

    LocalKey loadedKey =
        keyClient.loadLocalKey(KeyType.EcP256k, localKey.getKey(), localKey.getPrivateKey());
    assertEquals(localKey.getKey(), loadedKey.getKey());
    assertEquals(localKey.getPrivateKey(), loadedKey.getPrivateKey());
  }

  @Test
  void generateLocalRsa() throws Exception {
    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.Rsa2048);

    assertNotNull(localKey.getKey());
    assertNotNull(localKey.getPrivateKey());

    LocalKey loadedKey =
        keyClient.loadLocalKey(KeyType.Rsa2048, localKey.getKey(), localKey.getPrivateKey());
    assertEquals(localKey.getKey(), loadedKey.getKey());
    assertEquals(localKey.getPrivateKey(), loadedKey.getPrivateKey());
  }

  @Test
  void generateLocalAes() throws Exception {
    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.Aes256);

    assertNotNull(localKey.getKey());
    assertEquals(localKey.getPrivateKey(), "");

    LocalKey loadedKey =
        keyClient.loadLocalKey(KeyType.Aes256, localKey.getKey(), localKey.getPrivateKey());
    assertEquals(localKey.getKey(), loadedKey.getKey());
    assertEquals(localKey.getPrivateKey(), loadedKey.getPrivateKey());
  }

  @Test
  void generateManagedEcdsa() throws Exception {
    KeyClient keyClient = new KeyClient();

    String name = "key_name";
    KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
    KeyType keyType = KeyType.EcP256k;

    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType, name));

    assertEquals(managedKey.getName(), name);
    assertNotNull(managedKey.getKey());
    assertEquals(managedKey.getKeyType(), keyType);
    assertEquals(managedKey.getProtection(), keyProtectionLevel);

    ManagedKey loadedKey = keyClient.loadManagedKey(managedKey.getId());
    assertEquals(managedKey.getId(), loadedKey.getId());
    assertEquals(managedKey.getName(), loadedKey.getName());
    assertEquals(managedKey.getKey(), loadedKey.getKey());
    assertEquals(managedKey.getKeyType(), loadedKey.getKeyType());
    assertEquals(managedKey.getProtection(), loadedKey.getProtection());
  }

  @Test
  void generateManagedBjj() throws Exception {
    KeyClient keyClient = new KeyClient();

    String name = "key_name";
    KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
    KeyType keyType = KeyType.Bjj;

    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType, name));

    assertEquals(managedKey.getName(), name);
    assertNotNull(managedKey.getKey());
    assertEquals(managedKey.getKeyType(), keyType);
    assertEquals(managedKey.getProtection(), keyProtectionLevel);

    ManagedKey loadedKey = keyClient.loadManagedKey(managedKey.getId());
    assertEquals(managedKey.getId(), loadedKey.getId());
    assertEquals(managedKey.getName(), loadedKey.getName());
    assertEquals(managedKey.getKey(), loadedKey.getKey());
    assertEquals(managedKey.getKeyType(), loadedKey.getKeyType());
    assertEquals(managedKey.getProtection(), loadedKey.getProtection());
  }

  @Test
  void generateManagedRsa() throws Exception {
    KeyClient keyClient = new KeyClient();

    String name = "key_name";
    KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
    KeyType keyType = KeyType.Rsa2048;

    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType, name));

    assertEquals(managedKey.getName(), name);
    assertNotNull(managedKey.getKey());
    assertEquals(managedKey.getKeyType(), keyType);
    assertEquals(managedKey.getProtection(), keyProtectionLevel);

    ManagedKey loadedKey = keyClient.loadManagedKey(managedKey.getId());
    assertEquals(managedKey.getId(), loadedKey.getId());
    assertEquals(managedKey.getName(), loadedKey.getName());
    assertEquals(managedKey.getKey(), loadedKey.getKey());
    assertEquals(managedKey.getKeyType(), loadedKey.getKeyType());
    assertEquals(managedKey.getProtection(), loadedKey.getProtection());
  }

  @Test
  void generateManagedWithoutName() throws Exception {
    KeyClient keyClient = new KeyClient();

    KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
    KeyType keyType = KeyType.Rsa2048;

    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType));

    assertEquals(managedKey.getName(), "");
    assertNotNull(managedKey.getKey());
    assertEquals(managedKey.getKeyType(), keyType);
    assertEquals(managedKey.getProtection(), keyProtectionLevel);

    ManagedKey loadedKey = keyClient.loadManagedKey(managedKey.getId());
    assertEquals(managedKey.getId(), loadedKey.getId());
    assertEquals(managedKey.getName(), loadedKey.getName());
    assertEquals(managedKey.getKey(), loadedKey.getKey());
    assertEquals(managedKey.getKeyType(), loadedKey.getKeyType());
    assertEquals(managedKey.getProtection(), loadedKey.getProtection());
  }

  @Test
  void generateLocalCertificate() throws Exception {
    KeyClient keyClient = new KeyClient();

    KeyType keyType = KeyType.Rsa2048;
    SubjectCertificateParams subjectParams =
        new SubjectCertificateParams(
            "Google internet Authority G2", "Google Inc", "IT Department", "", "", "US");

    LocalCertificate localCertificate =
        keyClient.newLocalCertificate(
            new LocalCertificateParams(keyType, subjectParams, "password"));

    assertNotNull(localCertificate.getPkcs12());

    LocalCertificate loadedCertificate =
        keyClient.loadLocalCertificate(
            localCertificate.getPkcs12(), localCertificate.getPassword());
    assertArrayEquals(localCertificate.getPkcs12(), loadedCertificate.getPkcs12());

    // TODO not yet implemented signature with RSA on local
    /*RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();

    AuthenticityClient authenticityClient = new AuthenticityClient();
    Signature signature =
            authenticityClient.sign(record, new Signer(new SignerArgs(loadedCertificate)));

    assertNotNull(signature);*/
  }

  @Test
  void importLocalP12Certificate() throws Exception {
    KeyClient keyClient = new KeyClient();

    String currentDirectory = System.getProperty("user.dir");
    File file = new File(currentDirectory + "/src/test/test_utils/test.p12");
    int fileSize = (int) file.length();
    byte[] bytes = new byte[fileSize];

    try (FileInputStream inputStream = new FileInputStream(file)) {
      inputStream.read(bytes);
    }

    LocalCertificate localCertificate = keyClient.loadLocalCertificate(bytes, "bloock");

    assertArrayEquals(localCertificate.getPkcs12(), bytes);
  }

  @Test
  void generateManagedCertificate() throws Exception {
    KeyClient keyClient = new KeyClient();

    KeyType keyType = KeyType.EcP256k;
    SubjectCertificateParams subjectParams =
        new SubjectCertificateParams(
            "Google internet Authority G2", "Google Inc", "IT Department", "", "", "US");

    ManagedCertificate managedCertificate =
        keyClient.newManagedCertificate(new ManagedCertificateParams(keyType, subjectParams, 5));

    assertNotNull(managedCertificate.getKey());
    assertEquals(managedCertificate.getKeyType(), keyType);
    assertEquals(managedCertificate.getProtection(), KeyProtectionLevel.SOFTWARE);

    ManagedCertificate loadedCertificate =
        keyClient.loadManagedCertificate(managedCertificate.getId());
    assertEquals(managedCertificate.getId(), loadedCertificate.getId());
    assertEquals(managedCertificate.getKey(), loadedCertificate.getKey());
    assertEquals(managedCertificate.getKeyType(), loadedCertificate.getKeyType());
    assertEquals(managedCertificate.getProtection(), loadedCertificate.getProtection());
  }

  @Test
  void importManagedCertificatePEM() throws Exception {
    KeyClient keyClient = new KeyClient();

    String currentDirectory = System.getProperty("user.dir");
    File file = new File(currentDirectory + "/src/test/test_utils/test.pem");
    int fileSize = (int) file.length();
    byte[] bytes = new byte[fileSize];

    try (FileInputStream inputStream = new FileInputStream(file)) {
      inputStream.read(bytes);
    }

    ManagedCertificate managedCertificate =
        keyClient.importManagedCertificate(
            CertificateType.PEM, bytes, new ImportCertificateParams());

    assertNotNull(managedCertificate.getKey());
    assertEquals(managedCertificate.getKeyType(), KeyType.Rsa2048);
    assertEquals(managedCertificate.getProtection(), KeyProtectionLevel.SOFTWARE);

    ManagedCertificate loadedCertificate =
        keyClient.loadManagedCertificate(managedCertificate.getId());
    assertEquals(managedCertificate.getId(), loadedCertificate.getId());
    assertEquals(managedCertificate.getKey(), loadedCertificate.getKey());
    assertEquals(managedCertificate.getKeyType(), loadedCertificate.getKeyType());
    assertEquals(managedCertificate.getProtection(), loadedCertificate.getProtection());
  }

  @Test
  void importManagedCertificatePFX() throws Exception {
    KeyClient keyClient = new KeyClient();

    String currentDirectory = System.getProperty("user.dir");
    File file = new File(currentDirectory + "/src/test/test_utils/test2.pfx");
    int fileSize = (int) file.length();
    byte[] bytes = new byte[fileSize];

    try (FileInputStream inputStream = new FileInputStream(file)) {
      inputStream.read(bytes);
    }
    String password = "bloock";

    ManagedCertificate managedCertificate =
        keyClient.importManagedCertificate(
            CertificateType.PFX, bytes, new ImportCertificateParams(password));

    assertNotNull(managedCertificate.getKey());
    assertEquals(managedCertificate.getKeyType(), KeyType.EcP256k);
    assertEquals(managedCertificate.getProtection(), KeyProtectionLevel.SOFTWARE);

    ManagedCertificate loadedCertificate =
        keyClient.loadManagedCertificate(managedCertificate.getId());
    assertEquals(managedCertificate.getId(), loadedCertificate.getId());
    assertEquals(managedCertificate.getKey(), loadedCertificate.getKey());
    assertEquals(managedCertificate.getKeyType(), loadedCertificate.getKeyType());
    assertEquals(managedCertificate.getProtection(), loadedCertificate.getProtection());

    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();

    AuthenticityClient authenticityClient = new AuthenticityClient();
    Signature signature =
        authenticityClient.sign(record, new Signer(new SignerArgs(loadedCertificate)));

    assertNotNull(signature);
  }
}
