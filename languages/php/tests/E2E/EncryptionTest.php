<?php

use Bloock\Bloock;
use Bloock\Client\KeyClient;
use Bloock\Entity\Key\KeyType;
use Bloock\Client\RecordClient;
use PHPUnit\Framework\TestCase;
use Bloock\Client\EncryptionClient;
use Bloock\Entity\Encryption\Encrypter;
use Bloock\Entity\Key\ManagedKeyParams;
use Bloock\Entity\Key\KeyProtectionLevel;
use Bloock\Entity\Encryption\EncryptionAlg;
use Bloock\Entity\Key\AccessControl;
use Bloock\Entity\Key\AccessControlTotp;
use Bloock\Entity\Key\Managed;
use OTPHP\InternalClock;
use OTPHP\TOTP;

final class EncryptionTest extends TestCase
{
    use Utils;

    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$apiHost = getenv("API_HOST");
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

        $encryptedRecord = $encryptionClient->encrypt($record, new Encrypter($key));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new Encrypter($key, null))
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

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new Encrypter($key))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new Encrypter($key));
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

        $encryptedRecord = $encryptionClient->encrypt($record, new Encrypter($key));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new Encrypter($key))
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

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new Encrypter($key))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new Encrypter($key));
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

        $encryptedRecord = $encryptionClient->encrypt($record, new Encrypter($key));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new Encrypter($key))
            ->build();

        $decryptedRecordHash = $decryptedRecord->getHash();
        $this->assertEquals($recordHash, $decryptedRecordHash);
    }

    /**
     * @throws Exception
     */
    public function testEncryptManagedRsaWithTotpAccessControl()
    {
        $payload = "Hello world";

        $recordClient = new RecordClient();
        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $encryptionClient = new EncryptionClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::Rsa2048));

        $totp = $keyClient->setupTotpAccessControl(new Managed($key));

        $clock ??= new InternalClock();
        $totpClient = TOTP::createFromSecret($totp->secret, $clock);

        $totpAccessControl = new AccessControlTotp($totpClient->now());
        $encryptedRecord = $encryptionClient->encrypt($record, new Encrypter($key, new AccessControl($totpAccessControl)));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new Encrypter($key, new AccessControl($totpAccessControl)))
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

        $encryptedRecord = $recordClient->fromString($payload)->withEncrypter(new Encrypter($key))->build();
        $encryptedRecordHash = $encryptedRecord->getHash();

        $decryptedRecord = $encryptionClient->decrypt($encryptedRecord, new Encrypter($key));
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
            ->withEncrypter(new Encrypter($key))
            ->build();

        $alg = $encryptionClient->getEncryptionAlg($encryptedRecord);
        $this->assertEquals(EncryptionAlg::RSA, $alg);
    }
}
