import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.bloock.sdk.client.KeyClient;
import com.bloock.sdk.entity.key.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class KeyTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initSdk();
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
}
