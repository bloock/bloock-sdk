<?php

use PHPUnit\Framework\TestCase;

final class RecordTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        \Bloock\Bloock::$apiKey = getenv("API_KEY");
        \Bloock\Bloock::$disableAnalytics = true;
    }

    public function testFromString()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromString("Hello world")->build();
        $hash = $record->getHash();
        $this->assertEquals("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd", $hash);
    }

    public function testFromBytes()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromBytes([1, 2, 3, 4, 5])->build();
        $hash = $record->getHash();
        $this->assertEquals("7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4", $hash);
    }

    public function testFromHex()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromHex("1234567890abcdef")->build();
        $hash = $record->getHash();
        $this->assertEquals("ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f", $hash);
    }

    public function testFromJson()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromJson("{\"hello\":\"world\"}")->build();
        $hash = $record->getHash();
        $this->assertEquals("586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312", $hash);
    }

    public function testFromFile()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromFile([2, 3, 4, 5, 6])->build();
        $hash = $record->getHash();
        $this->assertEquals("507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446", $hash);
    }

    public function testFromHostedLoader()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromString("Hello world")->build();
        $payload = $record->retrieve();

        $availabilityClient = new \Bloock\Client\AvailabilityClient();
        $result = $availabilityClient->publish($record, new \Bloock\Entity\Availability\HostedPublisher());

        $record = $recordClient->fromLoader(new \Bloock\Entity\Availability\HostedLoader($result))->build();
        $this->assertEquals($payload, $record->retrieve());
    }

    public function testFromIpfsLoader()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromString("Hello world")->build();
        $payload = $record->retrieve();

        $availabilityClient = new \Bloock\Client\AvailabilityClient();
        $result = $availabilityClient->publish($record, new \Bloock\Entity\Availability\IpfsPublisher());

        $record = $recordClient->fromLoader(new \Bloock\Entity\Availability\IpfsLoader($result))->build();
        $this->assertEquals($payload, $record->retrieve());
    }

    public function testEcdsaSignature()
    {
        $authenticityClient = new \Bloock\Client\AuthenticityClient();
        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();
        $name = "Some name";

        $recordClient = new \Bloock\Client\RecordClient();
        $signedRecord = $recordClient->fromString("Hello world")
            ->withSigner(new \Bloock\Entity\Authenticity\EcdsaSigner($ecdsaKeyPair->getPrivateKey(), $name))
            ->build();

        $ecdsaKeyPair2 = $authenticityClient->generateEcdsaKeyPair();
        $recordWithMultipleSignatures = $recordClient->fromRecord($signedRecord)
            ->withSigner(new \Bloock\Entity\Authenticity\EcdsaSigner($ecdsaKeyPair2->getPrivateKey()))
            ->build();

        $signatures = $authenticityClient->getSignatures($recordWithMultipleSignatures);
        $this->assertEquals(2, count($signatures));

        $this->assertEquals($name, $authenticityClient->getSignatureCommonName($signatures[0]));
        $this->assertEquals(\Bloock\Entity\Authenticity\SignatureAlg::ECDSA, $signatures[0]->getAlg());
    }

    public function testEnsSignature()
    {
        $authenticityClient = new \Bloock\Client\AuthenticityClient();
        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();
        $name = "Some name";

        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromString("Hello world")
            ->withSigner(new \Bloock\Entity\Authenticity\EnsSigner($ecdsaKeyPair->getPrivateKey(), $name))
            ->build();

        $signatures = $authenticityClient->getSignatures($record);
        $this->assertEquals(1, count($signatures));
        $this->assertEquals(\Bloock\Entity\Authenticity\SignatureAlg::ENS, $signatures[0]->getAlg());

        $signatures[0]->setSignature("66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601");
        $signatures[0]->setMessageHash("7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6");
        $this->assertEquals("vitalik.eth", $authenticityClient->getSignatureCommonName($signatures[0]));
    }

    public function testAesEncryption()
    {
        $payload = "Hello world 2";
        $password = "some_password";

        $recordClient = new \Bloock\Client\RecordClient();
        $encryptedRecord = $recordClient->fromString($payload)
            ->withEncrypter(new \Bloock\Entity\Encryption\AesEncrypter($password))
            ->build();
        $this->assertNotEquals($payload, $encryptedRecord->retrieve());

        $encryptionClient = new \Bloock\Client\EncryptionClient();
        $this->assertEquals(\Bloock\Entity\Encryption\EncryptionAlg::AES256GCM, $encryptionClient->getEncryptionAlg($encryptedRecord));

        $throwsException = false;
        try {
            $recordClient->fromRecord($encryptedRecord)
                ->withDecrypter(new \Bloock\Entity\Encryption\AesDecrypter("incorrect_password"))
                ->build();
        } catch (Exception $e) {
            $throwsException = true;
        }

        $this->assertTrue($throwsException);

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new \Bloock\Entity\Encryption\AesDecrypter($password))
            ->build();

        $this->assertEquals($decryptedRecord->retrieve(), unpack("C*", $payload));

        $hash = $decryptedRecord->getHash();
        $this->assertEquals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", $hash);
    }

    public function testRsaEncryption()
    {
        $payload = "Hello world 2";
        $encryptionClient = new \Bloock\Client\EncryptionClient();
        $keyPair = $encryptionClient->generateRsaKeyPair();

        $recordClient = new \Bloock\Client\RecordClient();
        $encryptedRecord = $recordClient->fromString($payload)
            ->withEncrypter(new \Bloock\Entity\Encryption\RsaEncrypter($keyPair->getPublicKey()))
            ->build();

        $this->assertNotEquals($payload, $encryptedRecord->retrieve());
        $this->assertEquals(\Bloock\Entity\Encryption\EncryptionAlg::RSA, $encryptionClient->getEncryptionAlg($encryptedRecord));

        $decryptedRecord = $recordClient->fromRecord($encryptedRecord)
            ->withDecrypter(new \Bloock\Entity\Encryption\RsaDecrypter($keyPair->getPrivateKey()))
            ->build();

        $this->assertEquals($decryptedRecord->retrieve(), unpack("C*", $payload));

        $hash = $decryptedRecord->getHash();
        $this->assertEquals("96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", $hash);
    }

    public function testSetProof()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromString("Hello world")->build();

        $originalProof = new \Bloock\Entity\Integrity\Proof(
            array("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"),
            array("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"),
            "1010101",
            "0101010",
            new \Bloock\Entity\Integrity\ProofAnchor(
                42,
                array(new \Bloock\Entity\Integrity\AnchorNetwork("Ethereum", "state", "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd")),
                "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
                "success"
            )
        );
        $record->setProof($originalProof);

        $integrityClient = new \Bloock\Client\IntegrityClient();
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