<?php

use Bloock\Bloock;
use Bloock\Client\KeyClient;
use Bloock\Entity\Key\KeyProtectionLevel;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\ManagedKeyParams;
use PHPUnit\Framework\TestCase;

final class KeyTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$disableAnalytics = true;
    }

    public function testGenerateLocalEcdsa()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $this->assertNotNull($key->key);
        $this->assertNotNull($key->privateKey);

        $loadedKey = $keyClient->loadLocalKey(KeyType::EcP256k, $key->key, $key->privateKey);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->privateKey, $loadedKey->privateKey);

    }

    public function testGenerateLocalRsa()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Rsa2048);

        $this->assertNotNull($key->key);
        $this->assertNotNull($key->privateKey);

        $loadedKey = $keyClient->loadLocalKey(KeyType::Rsa2048, $key->key, $key->privateKey);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->privateKey, $loadedKey->privateKey);
    }

    public function testGenerateLocalAes()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Aes256);

        $this->assertNotNull($key->key);
        $this->assertEquals($key->privateKey, "");

        $loadedKey = $keyClient->loadLocalKey(KeyType::Aes256, $key->key, $key->privateKey);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->privateKey, $loadedKey->privateKey);
    }

    public function testGenerateManagedEcdsa()
    {
        $keyClient = new KeyClient();

        $keyName = "key_name";
        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::EcP256k;

        $params = new ManagedKeyParams($keyProtection, $keyType, $keyName);
        $key = $keyClient->newManagedKey($params);

        $this->assertEquals($key->name, $keyName);
        $this->assertNotNull($key->key);
        $this->assertEquals($key->keyType, $keyType);
        $this->assertEquals($key->protection, $keyProtection);

        $loadedKey = $keyClient->loadManagedKey($key->id);
        $this->assertEquals($key->id, $loadedKey->id);
        $this->assertEquals($key->name, $loadedKey->name);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->keyType, $loadedKey->keyType);
        $this->assertEquals($key->protection, $loadedKey->protection);
    }

    public function testGenerateManagedRsa()
    {
        $keyClient = new KeyClient();

        $keyName = "key_name";
        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::Rsa2048;

        $params = new ManagedKeyParams($keyProtection, $keyType, $keyName);
        $key = $keyClient->newManagedKey($params);

        $this->assertEquals($key->name, $keyName);
        $this->assertNotNull($key->key);
        $this->assertEquals($key->keyType, $keyType);
        $this->assertEquals($key->protection, $keyProtection);

        $loadedKey = $keyClient->loadManagedKey($key->id);
        $this->assertEquals($key->id, $loadedKey->id);
        $this->assertEquals($key->name, $loadedKey->name);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->keyType, $loadedKey->keyType);
        $this->assertEquals($key->protection, $loadedKey->protection);
    }

    public function testGenerateManagedWithoutName()
    {
        $keyClient = new KeyClient();

        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::EcP256k;

        $params = new ManagedKeyParams($keyProtection, $keyType);
        $key = $keyClient->newManagedKey($params);

        $this->assertEquals("", $key->name);
        $this->assertNotNull($key->key);
        $this->assertEquals($key->keyType, $keyType);
        $this->assertEquals($key->protection, $keyProtection);

        $loadedKey = $keyClient->loadManagedKey($key->id);
        $this->assertEquals($key->id, $loadedKey->id);
        $this->assertEquals($key->name, $loadedKey->name);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->keyType, $loadedKey->keyType);
        $this->assertEquals($key->protection, $loadedKey->protection);
    }
}