<?php

use Bloock\Bloock;
use Bloock\Client\KeyClient;
use Bloock\Client\RecordClient;
use Bloock\Client\AuthenticityClient;
use Bloock\Entity\Key\CertificateType;
use Bloock\Entity\Key\ImportCertificateParams;
use Bloock\Entity\Key\KeyProtectionLevel;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\ManagedCertificateParams;
use Bloock\Entity\Key\LocalCertificateArgs;
use Bloock\Entity\Key\ManagedKeyParams;
use Bloock\Entity\Key\SubjectCertificateParams;
use Bloock\Entity\Authenticity\Signer;
use Bloock\Entity\Key\Managed;
use PHPUnit\Framework\TestCase;

final class KeyTest extends TestCase
{
    use Utils;

    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("DEV_API_KEY");
        Bloock::$apiHost = getenv("DEV_API_HOST");
        Bloock::$disableAnalytics = true;
    }

    public function testGenerateLocalEcdsa()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $this->assertNotNull($key->key);
        $this->assertNotNull($key->privateKey);

        $loadedKey = $keyClient->loadLocalKey(KeyType::EcP256k, $key->privateKey);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->privateKey, $loadedKey->privateKey);
    }

    public function testGenerateLocalBjj()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Bjj);

        $this->assertNotNull($key->key);
        $this->assertNotNull($key->privateKey);

        $loadedKey = $keyClient->loadLocalKey(KeyType::Bjj, $key->privateKey);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->privateKey, $loadedKey->privateKey);
    }

    public function testGenerateLocalRsa()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Rsa2048);

        $this->assertNotNull($key->key);
        $this->assertNotNull($key->privateKey);

        $loadedKey = $keyClient->loadLocalKey(KeyType::Rsa2048, $key->privateKey);
        $this->assertEquals($key->key, $loadedKey->key);
        $this->assertEquals($key->privateKey, $loadedKey->privateKey);
    }

    public function testGenerateLocalAes()
    {
        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Aes256);

        $this->assertNotNull($key->key);
        $this->assertEquals($key->privateKey, "");

        $loadedKey = $keyClient->loadLocalKey(KeyType::Aes256, $key->key);
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

    public function testGenerateManagedBjj()
    {
        $keyClient = new KeyClient();

        $keyName = "key_name";
        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::Bjj;

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

    public function testGenerateLocalCertificate()
    {
        $keyClient = new KeyClient();

        $keyType = KeyType::Rsa2048;
        $subjectParams = new SubjectCertificateParams("Google, internet, Authority G2", "Google, Inc", "IT + Department", null, null, "US");

        $params = new LocalCertificateArgs($keyType, $subjectParams, "password", 2);
        $certificate = $keyClient->newLocalCertificate($params);

        $this->assertNotNull($certificate->pkcs12);

        $loadedCertificate = $keyClient->loadLocalCertificate($certificate->pkcs12, $certificate->password);
        $this->assertEquals($loadedCertificate->pkcs12, $certificate->pkcs12);

        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $record = $recordClient->fromString("Hello world")->build();
        $signature = $authenticityClient->sign($record, new Signer($loadedCertificate));

        $this->assertNotNull($signature);
    }

    public function testImportLocalCertificateP12()
    {
        $keyClient = new KeyClient();

        $currentDirectory = getcwd();
        $fileContents = file_get_contents($currentDirectory . "/tests/E2E/TestUtils/test.p12");
        $byteArray = unpack('C*', $fileContents);

        $certificate = $keyClient->loadLocalCertificate($byteArray, "bloock");

        $this->assertEquals($certificate->pkcs12, $byteArray);
    }

    public function testGenerateManagedCertificate()
    {
        $keyClient = new KeyClient();

        $keyType = KeyType::EcP256k;
        $subjectParams = new SubjectCertificateParams("Google, internet, Authority G2", "Google, Inc", "IT + Department", null, null, "US");

        $params = new ManagedCertificateParams($keyType, $subjectParams, 5);
        $certificate = $keyClient->newManagedCertificate($params);

        $this->assertNotNull($certificate->key);
        $this->assertEquals($certificate->keyType, KeyType::EcP256k);
        $this->assertEquals($certificate->protection, KeyProtectionLevel::SOFTWARE);

        $loadedCertificate = $keyClient->loadManagedCertificate($certificate->id);
        $this->assertEquals($loadedCertificate->id, $certificate->id);
        $this->assertEquals($loadedCertificate->key, $certificate->key);
        $this->assertEquals($loadedCertificate->keyType, $certificate->keyType);
        $this->assertEquals($loadedCertificate->protection, $certificate->protection);
    }

    public function testImportManagedCertificatePEM()
    {
        $keyClient = new KeyClient();

        $currentDirectory = getcwd();
        $fileContents = file_get_contents($currentDirectory . "/tests/E2E/TestUtils/test.pem");
        $byteArray = unpack('C*', $fileContents);

        $certificate = $keyClient->importManagedCertificate(CertificateType::PEM, $byteArray, new ImportCertificateParams());

        $this->assertNotNull($certificate->key);
        $this->assertEquals($certificate->keyType, KeyType::Rsa2048);
        $this->assertEquals($certificate->protection, KeyProtectionLevel::SOFTWARE);

        $loadedCertificate = $keyClient->loadManagedCertificate($certificate->id);
        $this->assertEquals($loadedCertificate->id, $certificate->id);
        $this->assertEquals($loadedCertificate->key, $certificate->key);
        $this->assertEquals($loadedCertificate->keyType, $certificate->keyType);
        $this->assertEquals($loadedCertificate->protection, $certificate->protection);
    }

    public function testImportManagedCertificatePFX()
    {
        $keyClient = new KeyClient();

        $currentDirectory = getcwd();
        $fileContents = file_get_contents($currentDirectory . "/tests/E2E/TestUtils/test2.pfx");
        $byteArray = unpack('C*', $fileContents);
        $password = "bloock";

        $certificate = $keyClient->importManagedCertificate(CertificateType::PFX, $byteArray, new ImportCertificateParams($password));

        $this->assertNotNull($certificate->key);
        $this->assertEquals($certificate->keyType, KeyType::EcP256k);
        $this->assertEquals($certificate->protection, KeyProtectionLevel::SOFTWARE);

        $loadedCertificate = $keyClient->loadManagedCertificate($certificate->id);
        $this->assertEquals($loadedCertificate->id, $certificate->id);
        $this->assertEquals($loadedCertificate->key, $certificate->key);
        $this->assertEquals($loadedCertificate->keyType, $certificate->keyType);
        $this->assertEquals($loadedCertificate->protection, $certificate->protection);

        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $record = $recordClient->fromString("Hello world")->build();
        $signature = $authenticityClient->sign($record, new Signer($loadedCertificate));

        $this->assertNotNull($signature);
    }

    public function testSetupAndRecoverTotpAccessControl()
    {
        $keyClient = new KeyClient();
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::EcP256k;

        $params = new ManagedKeyParams($keyProtection, $keyType);
        $managedKey = $keyClient->newManagedKey($params);

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient->sign($record, new Signer($managedKey));

        $totp = $keyClient->setupTotpAccessControl(new Managed($managedKey));
        $this->assertNotNull($totp->getSecret());
        $this->assertNotNull($totp->getSecretQr());
        $this->assertNotNull($totp->getRecoveryCodes());

        try {
            $authenticityClient->sign($record, new Signer($managedKey));
        } catch (Exception $e) {
            $this->assertNotNull($e->getMessage());
        }

        $totpRecovered = $keyClient->recoverTotpAccessControl(new Managed($managedKey), $totp->getRecoveryCodes()[0]);
        $this->assertNotNull($totpRecovered->getSecret());
        $this->assertNotNull($totpRecovered->getSecretQr());
        $this->assertNotNull($totpRecovered->getRecoveryCodes());
    }

    public function testSetupSecretAccessControl()
    {
        $keyClient = new KeyClient();
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::EcP256k;

        $params = new ManagedKeyParams($keyProtection, $keyType);
        $managedKey = $keyClient->newManagedKey($params);

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient->sign($record, new Signer($managedKey));

        $email = $this->generateRandomString(8) . "@bloock.com";
        $keyClient->setupSecretAccessControl(new Managed($managedKey), "password", $email);

        try {
            $authenticityClient->sign($record, new Signer($managedKey));
        } catch (Exception $e) {
            $this->assertNotNull($e->getMessage());
        }
    }
}
