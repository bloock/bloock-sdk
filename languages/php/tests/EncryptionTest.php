<?php

use Bloock\Bloock;
use Bloock\Client\EncryptionClient;
use Bloock\Client\KeyClient;
use Bloock\Client\RecordClient;
use Bloock\Entity\Encryption\AesDecrypter;
use Bloock\Entity\Encryption\AesEncrypter;
use Bloock\Entity\Encryption\DecrypterArgs;
use Bloock\Entity\Encryption\EncrypterArgs;
use Bloock\Entity\Encryption\EncryptionAlg;
use Bloock\Entity\Encryption\RsaDecrypter;
use Bloock\Entity\Encryption\RsaEncrypter;
use Bloock\Entity\Key\KeyProtectionLevel;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\ManagedKeyParams;
use PHPUnit\Framework\TestCase;

final class EncryptionTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$disableAnalytics = true;
    }

    /**
     * @throws Exception
     */
    public function testEncryptLocalAes()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Aes256);

        $encryptionClient = new EncryptionClient();

        $encryptedRecord = $encryptionClient->encrypt($record, new AesEncrypter(new EncrypterArgs($key)));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new AesDecrypter(new DecrypterArgs($key)))
            ->build();

        $decryptedRecordHash = $decryptedRecord->getHash();
        $this->assertEquals($recordHash, $decryptedRecordHash);
    }

    /**
     * @throws Exception
     */
    public function testDecryptLocalAes()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $encryptionClient = new EncryptionClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Aes256);

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new AesEncrypter(new EncrypterArgs($key)))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new AesDecrypter(new DecrypterArgs($key)));
        $decryptedRecordHash = $decryptedRecord->getHash();

        $this->assertEquals($encryptedRecordHash, $decryptedRecordHash);
    }

    /**
     * @throws Exception
     */
    public function testEncryptLocalRsa()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $encryptionClient = new EncryptionClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Rsa2048);

        $encryptedRecord = $encryptionClient->encrypt($record, new RsaEncrypter(new EncrypterArgs($key)));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new RsaDecrypter(new DecrypterArgs($key)))
            ->build();

        $decryptedRecordHash = $decryptedRecord->getHash();
        $this->assertEquals($recordHash, $decryptedRecordHash);
    }

    /**
     * @throws Exception
     */
    public function testDecryptLocalRsa()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $encryptionClient = new EncryptionClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Rsa2048);

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new RsaEncrypter(new EncrypterArgs($key)))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new RsaDecrypter(new DecrypterArgs($key)));
        $decryptedRecordHash = $decryptedRecord->getHash();

        $this->assertEquals($encryptedRecordHash, $decryptedRecordHash);
    }

    /**
     * @throws Exception
     */
    public function testEncryptManagedRsa()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $encryptionClient = new EncryptionClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::Rsa2048));

        $encryptedRecord = $encryptionClient->encrypt($record, new RsaEncrypter(new EncrypterArgs($key)));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new RsaDecrypter(new DecrypterArgs($key)))
            ->build();

        $decryptedRecordHash = $decryptedRecord->getHash();
        $this->assertEquals($recordHash, $decryptedRecordHash);
    }

    /**
     * @throws Exception
     */
    public function testDecryptManagedRsa()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $encryptionClient = new EncryptionClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::Rsa2048));

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new RsaEncrypter(new EncrypterArgs($key)))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new RsaDecrypter(new DecrypterArgs($key)));
        $decryptedRecordHash = $decryptedRecord->getHash();

        $this->assertEquals($encryptedRecordHash, $decryptedRecordHash);
    }

    /**
     * @throws Exception
     */
    public function testGetEncryptionAlg()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();

        $encryptionClient = new EncryptionClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Rsa2048);

        $encryptedRecord = $recordClient->fromString($payload)
            ->withEncrypter(new RsaEncrypter(new EncrypterArgs($key)))
            ->build();

        $alg = $encryptionClient->getEncryptionAlg($encryptedRecord);
        $this->assertEquals(EncryptionAlg::RSA, $alg);
    }


}