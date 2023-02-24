<?php

use PHPUnit\Framework\TestCase;

final class EncryptionTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        \Bloock\Bloock::$apiKey = getenv("API_KEY");
        \Bloock\Bloock::$disableAnalytics = true;
    }

    public function testEncryptAes()
    {
        $payload = "Hello world";

        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $password = "some_password";
        $encryptionClient = new \Bloock\Client\EncryptionClient();

        $encryptedRecord = $encryptionClient->encrypt($record, new \Bloock\Entity\Encryption\AesEncrypter($password));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new \Bloock\Entity\Encryption\AesDecrypter($password))
            ->build();

        $decryptedRecordHash = $decryptedRecord->getHash();
        $this->assertEquals($recordHash, $decryptedRecordHash);
    }

    public function testDecryptAes()
    {
        $payload = "Hello world";

        $recordClient = new \Bloock\Client\RecordClient();
        $encryptionClient = new \Bloock\Client\EncryptionClient();

        $password = "some_password";

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new \Bloock\Entity\Encryption\AesEncrypter($password))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new \Bloock\Entity\Encryption\AesDecrypter($password));
        $decryptedRecordHash = $decryptedRecord->getHash();

        $this->assertEquals($encryptedRecordHash, $decryptedRecordHash);
    }

    public function testEncryptRsa()
    {
        $payload = "Hello world";

        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $encryptionClient = new \Bloock\Client\EncryptionClient();
        $keys = $encryptionClient->generateRsaKeyPair();

        $encryptedRecord = $encryptionClient->encrypt($record, new \Bloock\Entity\Encryption\RsaEncrypter($keys->getPublicKey()));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new \Bloock\Entity\Encryption\RsaDecrypter($keys->getPrivateKey()))
            ->build();

        $decryptedRecordHash = $decryptedRecord->getHash();
        $this->assertEquals($recordHash, $decryptedRecordHash);
    }

    public function testDecryptRsa()
    {
        $payload = "Hello world";

        $recordClient = new \Bloock\Client\RecordClient();
        $encryptionClient = new \Bloock\Client\EncryptionClient();

        $keys = $encryptionClient->generateRsaKeyPair();

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new \Bloock\Entity\Encryption\RsaEncrypter($keys->getPublicKey()))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new \Bloock\Entity\Encryption\RsaDecrypter($keys->getPrivateKey()));
        $decryptedRecordHash = $decryptedRecord->getHash();

        $this->assertEquals($encryptedRecordHash, $decryptedRecordHash);
    }

    public function testGetEncryptionAlg()
    {
        $payload = "Hello world";

        $recordClient = new \Bloock\Client\RecordClient();

        $encryptionClient = new \Bloock\Client\EncryptionClient();
        $keys = $encryptionClient->generateRsaKeyPair();

        $encryptedRecord = $recordClient->fromString($payload)
            ->withEncrypter(new \Bloock\Entity\Encryption\RsaEncrypter($keys->getPublicKey()))
            ->build();

        $alg = $encryptionClient->getEncryptionAlg($encryptedRecord);
        $this->assertEquals(\Bloock\Entity\Encryption\EncryptionAlg::RSA, $alg);
    }


}