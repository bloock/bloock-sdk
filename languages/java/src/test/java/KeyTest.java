import com.bloock.sdk.client.KeyClient;
import com.bloock.sdk.entity.key.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

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
    }

    @Test
    void generateLocalRsa() throws Exception {
        KeyClient keyClient = new KeyClient();
        LocalKey localKey = keyClient.newLocalKey(KeyType.Rsa2048);

        assertNotNull(localKey.getKey());
        assertNotNull(localKey.getPrivateKey());
    }

    @Test
    void generateManagedEcdsa() throws Exception {
        KeyClient keyClient = new KeyClient();

        String name = "key_name";
        KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
        KeyType keyType = KeyType.EcP256k;

        ManagedKey managedKey = keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType, name));

        assertEquals(managedKey.getName(), name);
        assertNotNull(managedKey.getKey());
        assertEquals(managedKey.getKeyType(), keyType);
        assertEquals(managedKey.getProtection(), keyProtectionLevel);
    }

    @Test
    void generateManagedRsa() throws Exception {
        KeyClient keyClient = new KeyClient();

        String name = "key_name";
        KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
        KeyType keyType = KeyType.Rsa2048;

        ManagedKey managedKey = keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType, name));

        assertEquals(managedKey.getName(), name);
        assertNotNull(managedKey.getKey());
        assertEquals(managedKey.getKeyType(), keyType);
        assertEquals(managedKey.getProtection(), keyProtectionLevel);
    }

    @Test
    void generateManagedWithoutName() throws Exception {
        KeyClient keyClient = new KeyClient();

        KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
        KeyType keyType = KeyType.Rsa2048;

        ManagedKey managedKey = keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType));

        assertEquals(managedKey.getName(), "");
        assertNotNull(managedKey.getKey());
        assertEquals(managedKey.getKeyType(), keyType);
        assertEquals(managedKey.getProtection(), keyProtectionLevel);
    }

}
