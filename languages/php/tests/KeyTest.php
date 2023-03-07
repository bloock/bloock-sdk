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
    }

    public function testGenerateLocalRsa()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Rsa2048);

        $this->assertNotNull($key->key);
        $this->assertNotNull($key->privateKey);
    }

    public function testGenerateLocalAes()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Aes256);

        $this->assertNotNull($key->key);
        $this->assertEquals($key->privateKey, "");
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
    }
}