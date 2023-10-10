<?php

use Bloock\Bloock;
use Bloock\Client\AuthenticityClient;
use Bloock\Client\AvailabilityClient;
use Bloock\Client\EncryptionClient;
use Bloock\Client\IntegrityClient;
use Bloock\Client\KeyClient;
use Bloock\Client\RecordClient;
use Bloock\Entity\Authenticity\Signer;
use Bloock\Entity\Authenticity\SignatureAlg;
use Bloock\Entity\Authenticity\SignerArgs;
use Bloock\Entity\Availability\HostedLoader;
use Bloock\Entity\Availability\HostedPublisher;
use Bloock\Entity\Availability\IpfsLoader;
use Bloock\Entity\Availability\IpfsPublisher;
use Bloock\Entity\Encryption\AesDecrypter;
use Bloock\Entity\Encryption\AesEncrypter;
use Bloock\Entity\Encryption\DecrypterArgs;
use Bloock\Entity\Encryption\EncrypterArgs;
use Bloock\Entity\Encryption\EncryptionAlg;
use Bloock\Entity\Encryption\RsaDecrypter;
use Bloock\Entity\Encryption\RsaEncrypter;
use Bloock\Entity\Integrity\AnchorNetwork;
use Bloock\Entity\Integrity\Proof;
use Bloock\Entity\Integrity\ProofAnchor;
use Bloock\Entity\Key\KeyType;
use PHPUnit\Framework\TestCase;

final class RecordTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$apiHost = getenv("API_HOST");
        Bloock::$disableAnalytics = true;
    }

    public function testFromString()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromString("Hello world")->build();
        $hash = $record->getHash();
        $this->assertEquals("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd", $hash);
    }

    public function testFromBytes()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromBytes([1, 2, 3, 4, 5])->build();
        $hash = $record->getHash();
        $this->assertEquals("7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4", $hash);
    }

    public function testFromHex()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromHex("1234567890abcdef")->build();
        $hash = $record->getHash();
        $this->assertEquals("ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f", $hash);
    }

    public function testFromJson()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromJson("{\"hello\":\"world\"}")->build();
        $hash = $record->getHash();
        $this->assertEquals("586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312", $hash);
    }

    public function testFromFile()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromFile([2, 3, 4, 5, 6])->build();
        $hash = $record->getHash();
        $this->assertEquals("507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446", $hash);
    }

    public function testFromHostedLoader()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromString("Hello world")->build();
        $payload = $record->retrieve();

        $availabilityClient = new AvailabilityClient();
        $result = $availabilityClient->publish($record, new HostedPublisher());

        $record = $recordClient->fromLoader(new HostedLoader($result))->build();
        $this->assertEquals($payload, $record->retrieve());
    }

    public function testFromIpfsLoader()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromString("Hello world")->build();
        $payload = $record->retrieve();

        $availabilityClient = new AvailabilityClient();
        $result = $availabilityClient->publish($record, new IpfsPublisher());

        $record = $recordClient->fromLoader(new IpfsLoader($result))->build();
        $this->assertEquals($payload, $record->retrieve());
    }

    /**
     * @throws Exception
     */
    /*public function testEcdsaSignature()
    {
        $authenticityClient = new AuthenticityClient();
        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();
        $name = "Some name";

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $recordClient = new RecordClient();
        $signedRecord = $recordClient->fromString("Hello world")
            ->withSigner(new Signer(new SignerArgs($key, $name)))
            ->build();

        $key2 = $keyClient->newLocalKey(KeyType::EcP256k);
        $recordWithMultipleSignatures = $recordClient->fromRecord($signedRecord)
            ->withSigner(new Signer(new SignerArgs($key2)))
            ->build();

        $signatures = $authenticityClient->getSignatures($recordWithMultipleSignatures);
        $this->assertEquals(2, count($signatures));

        $this->assertEquals($name, $authenticityClient->getSignatureCommonName($signatures[0]));
        $this->assertEquals(SignatureAlg::ECDSA, $signatures[0]->getAlg());
    }*/

    /*public function testEnsSignature()
    {
        $authenticityClient = new AuthenticityClient();
        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();
        $name = "Some name";

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $recordClient = new RecordClient();
        $record = $recordClient->fromString("Hello world")
            ->withSigner(new Signer(new SignerArgs($key, $name)))
            ->build();

        $signatures = $authenticityClient->getSignatures($record);
        $this->assertEquals(1, count($signatures));
        $this->assertEquals(SignatureAlg::ENS, $signatures[0]->getAlg());

        $signatures[0]->setSignature("66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601");
        $signatures[0]->setMessageHash("7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6");
        $this->assertEquals("vitalik.eth", $authenticityClient->getSignatureCommonName($signatures[0]));
    }*/

    /**
     * @throws Exception
     */
    public function testAesEncryption()
    {
        $payload = "Hello world 2";

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Aes256);

        $recordClient = new RecordClient();
        $encryptedRecord = $recordClient->fromString($payload)
            ->withEncrypter(new AesEncrypter(new EncrypterArgs($key)))
            ->build();
        $this->assertNotEquals($payload, $encryptedRecord->retrieve());

        $encryptionClient = new EncryptionClient();
        $this->assertEquals(EncryptionAlg::AES256GCM, $encryptionClient->getEncryptionAlg($encryptedRecord));

        $invalidKey = $keyClient->newLocalKey(KeyType::Aes256);
        $throwsException = false;
        try {
            $recordClient->fromRecord($encryptedRecord)
                ->withDecrypter(new AesDecrypter(new DecrypterArgs($invalidKey)))
                ->build();
        } catch (Exception $e) {
            $throwsException = true;
        }

        $this->assertTrue($throwsException);

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new AesDecrypter(new DecrypterArgs($key)))
            ->build();

        $this->assertEquals($decryptedRecord->retrieve(), unpack("C*", $payload));

        $hash = $decryptedRecord->getHash();
        $this->assertEquals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", $hash);
    }

    /**
     * @throws Exception
     */
    public function testRsaEncryption()
    {
        $payload = "Hello world 2";
        $encryptionClient = new EncryptionClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::Rsa2048);

        $recordClient = new RecordClient();
        $encryptedRecord = $recordClient->fromString($payload)
            ->withEncrypter(new RsaEncrypter(new EncrypterArgs($key)))
            ->build();

        $this->assertNotEquals($payload, $encryptedRecord->retrieve());
        $this->assertEquals(EncryptionAlg::RSA, $encryptionClient->getEncryptionAlg($encryptedRecord));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new RsaDecrypter(new DecrypterArgs($key)))
            ->build();

        $this->assertEquals($decryptedRecord->retrieve(), unpack("C*", $payload));

        $hash = $decryptedRecord->getHash();
        $this->assertEquals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", $hash);
    }

    public function testSetProof()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromString("Hello world")->build();

        $originalProof = new Proof(
            array("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"),
            array("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"),
            "1010101",
            "0101010",
            new ProofAnchor(
                42,
                array(new AnchorNetwork("Ethereum", "state", "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd")),
                "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
                "success"
            )
        );
        $record->setProof($originalProof);

        $integrityClient = new IntegrityClient();
        $finalProof = $integrityClient->getProof(array($record));

        $this->assertEquals($originalProof->getLeaves(), $finalProof->getLeaves());
        $this->assertEquals($originalProof->getNodes(), $finalProof->getNodes());
        $this->assertEquals($originalProof->getDepth(), $finalProof->getDepth());
        $this->assertEquals($originalProof->getBitmap(), $finalProof->getBitmap());

        $this->assertEquals($originalProof->getAnchor()->getAnchorId(), $finalProof->getAnchor()->getAnchorId());
        $this->assertEquals($originalProof->getAnchor()->getRoot(), $finalProof->getAnchor()->getRoot());
        $this->assertEquals($originalProof->getAnchor()->getStatus(), $finalProof->getAnchor()->getStatus());
    }

}