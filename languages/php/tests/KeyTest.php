<?php

use PHPUnit\Framework\TestCase;

final class KeyTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        \Bloock\Bloock::$apiKey = getenv("API_KEY");
        \Bloock\Bloock::$disableAnalytics = true;
    }

    public function testGenerateLocalEcdsa()
    {
        $keyClient = new \Bloock\Client\KeyClient();
        $key = $keyClient->newLocalKey(\Bloock\Entity\Key\KeyType::EcP256k);

        $this->assertNotNull($key->key);
        $this->assertNotNull($key->privateKey);
    }

    public function testGenerateLocalRsa()
    {
        $keyClient = new \Bloock\Client\KeyClient();
        $key = $keyClient->newLocalKey(\Bloock\Entity\Key\KeyType::Rsa2048);

        $this->assertNotNull($key->key);
        $this->assertNotNull($key->privateKey);
    }

    public function testGenerateManagedEcdsa()
    {
        $keyClient = new \Bloock\Client\KeyClient();

        $keyName = "key_name";
        $keyProtection = \Bloock\Entity\Key\KeyProtectionLevel::SOFTWARE;
        $keyType = \Bloock\Entity\Key\KeyType::EcP256k;

        $params = new \Bloock\Entity\Key\ManagedKeyParams($keyProtection, $keyType, $keyName);
        $key = $keyClient->newManagedKey($params);

        $this->assertEquals($key->name, $keyName);
        $this->assertNotNull($key->key);
        $this->assertEquals($key->keyType, $keyType);
        $this->assertEquals($key->protection, $keyProtection);
    }

    public function testGenerateManagedRsa()
    {
        $keyClient = new \Bloock\Client\KeyClient();

        $keyName = "key_name";
        $keyProtection = \Bloock\Entity\Key\KeyProtectionLevel::SOFTWARE;
        $keyType = \Bloock\Entity\Key\KeyType::Rsa2048;

        $params = new \Bloock\Entity\Key\ManagedKeyParams($keyProtection, $keyType, $keyName);
        $key = $keyClient->newManagedKey($params);

        $this->assertEquals($key->name, $keyName);
        $this->assertNotNull($key->key);
        $this->assertEquals($key->keyType, $keyType);
        $this->assertEquals($key->protection, $keyProtection);
    }

    public function testGenerateManagedWithoutName()
    {
        $keyClient = new \Bloock\Client\KeyClient();

        $keyName = "key_name";
        $keyProtection = \Bloock\Entity\Key\KeyProtectionLevel::SOFTWARE;
        $keyType = \Bloock\Entity\Key\KeyType::EcP256k;

        $params = new \Bloock\Entity\Key\ManagedKeyParams($keyProtection, $keyType);
        $key = $keyClient->newManagedKey($params);

        $this->assertNull($key->name);
        $this->assertNotNull($key->key);
        $this->assertEquals($key->keyType, $keyType);
        $this->assertEquals($key->protection, $keyProtection);
    }
}