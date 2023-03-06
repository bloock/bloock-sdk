<?php

use Bloock\Bloock;
use Bloock\Client\EncryptionClient;
use Bloock\Client\RecordClient;
use Bloock\Entity\Encryption\AesDecrypter;
use Bloock\Entity\Encryption\AesEncrypter;
use Bloock\Entity\Encryption\EncryptionAlg;
use Bloock\Entity\Encryption\RsaDecrypter;
use Bloock\Entity\Encryption\RsaEncrypter;
use PHPUnit\Framework\TestCase;

final class EncryptionTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$disableAnalytics = true;
    }

    public function testEncryptAes()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $password = "some_password";
        $encryptionClient = new EncryptionClient();

        $encryptedRecord = $encryptionClient->encrypt($record, new AesEncrypter($password));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new AesDecrypter($password))
            ->build();

        $decryptedRecordHash = $decryptedRecord->getHash();
        $this->assertEquals($recordHash, $decryptedRecordHash);
    }

    public function testDecryptAes()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $encryptionClient = new EncryptionClient();

        $password = "some_password";

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new AesEncrypter($password))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new AesDecrypter($password));
        $decryptedRecordHash = $decryptedRecord->getHash();

        $this->assertEquals($encryptedRecordHash, $decryptedRecordHash);
    }

    public function testEncryptRsa()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $encryptionClient = new EncryptionClient();
        $keys = $encryptionClient->generateRsaKeyPair();

        $encryptedRecord = $encryptionClient->encrypt($record, new RsaEncrypter($keys->getPublicKey()));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new RsaDecrypter($keys->getPrivateKey()))
            ->build();

        $decryptedRecordHash = $decryptedRecord->getHash();
        $this->assertEquals($recordHash, $decryptedRecordHash);
    }

    public function testDecryptRsa()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $encryptionClient = new EncryptionClient();

        $keys = $encryptionClient->generateRsaKeyPair();

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new RsaEncrypter($keys->getPublicKey()))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new RsaDecrypter($keys->getPrivateKey()));
        $decryptedRecordHash = $decryptedRecord->getHash();

        $this->assertEquals($encryptedRecordHash, $decryptedRecordHash);
    }

    public function testGetEncryptionAlg()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();

        $encryptionClient = new EncryptionClient();
        $keys = $encryptionClient->generateRsaKeyPair();

        $encryptedRecord = $recordClient->fromString($payload)
            ->withEncrypter(new RsaEncrypter($keys->getPublicKey()))
            ->build();

        $alg = $encryptionClient->getEncryptionAlg($encryptedRecord);
        $this->assertEquals(EncryptionAlg::RSA, $alg);
    }


}