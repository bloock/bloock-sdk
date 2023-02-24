<?php

use PHPUnit\Framework\TestCase;

final class AuthenticityTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        \Bloock\Bloock::$apiKey = getenv("API_KEY");
        \Bloock\Bloock::$disableAnalytics = true;
    }

    public function testGenerateEcdsaKeys()
    {
        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $keys = $authenticityClient->generateEcdsaKeyPair();

        $this->assertNotNull($keys->getPublicKey());
        $this->assertNotNull($keys->getPrivateKey());
    }

    public function testSignEcdsa()
    {
        $recordClient = new \Bloock\Client\RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();
        $signature = $authenticityClient->sign($record, new \Bloock\Entity\Authenticity\EcdsaSigner($ecdsaKeyPair->getPrivateKey()));

        $this->assertNotNull($signature);
    }

    public function testVerifyEcdsa()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new \Bloock\Entity\Authenticity\EcdsaSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    public function testSignEns()
    {
        $recordClient = new \Bloock\Client\RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();
        $signature = $authenticityClient->sign($record, new \Bloock\Entity\Authenticity\EnsSigner($ecdsaKeyPair->getPrivateKey()));

        $this->assertNotNull($signature);
    }

    public function testVerifyEns()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new \Bloock\Entity\Authenticity\EnsSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    public function testGetSignatures()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new \Bloock\Entity\Authenticity\EcdsaSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $signatures = $authenticityClient->getSignatures($record);

        $this->assertEquals(1, count($signatures));
        $this->assertEquals(\Bloock\Entity\Authenticity\SignatureAlg::ECDSA, \Bloock\Entity\Authenticity\SignatureAlg::fromString($signatures[0]->getHeader()->getAlg()));
    }

    public function testGetEmptySignatureCommonName()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new \Bloock\Entity\Authenticity\EcdsaSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $signatures = $authenticityClient->getSignatures($record);

        $throwsException = false;
        try {
            $authenticityClient->getSignatureCommonName($signatures[0]);
        } catch (Exception $e) {
            $throwsException = true;
        }

        $this->assertTrue($throwsException);
    }

    public function testGetEcdsaSignatureCommonName()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $commonName = "common_name";
        $record = $recordClient->fromString("Hello world")->withSigner(new \Bloock\Entity\Authenticity\EcdsaSigner($ecdsaKeyPair->getPrivateKey(), $commonName))->build();

        $signatures = $authenticityClient->getSignatures($record);

        $name = $authenticityClient->getSignatureCommonName($signatures[0]);

        $this->assertEquals($commonName, $name);
    }

    public function testGetEnsSignatureCommonName()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $authenticityClient = new \Bloock\Client\AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new \Bloock\Entity\Authenticity\EnsSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $signatures = $authenticityClient->getSignatures($record);
        $signature = $signatures[0];
        $signature->setSignature("66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601");
        $signature->setMessageHash("7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6");

        $name = $authenticityClient->getSignatureCommonName($signatures[0]);

        $this->assertEquals("vitalik.eth", $name);
    }
}