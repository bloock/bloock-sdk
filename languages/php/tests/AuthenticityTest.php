<?php

use Bloock\Bloock;
use Bloock\Client\AuthenticityClient;
use Bloock\Client\RecordClient;
use Bloock\Entity\Authenticity\EcdsaSigner;
use Bloock\Entity\Authenticity\EnsSigner;
use Bloock\Entity\Authenticity\SignatureAlg;
use PHPUnit\Framework\TestCase;

final class AuthenticityTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$disableAnalytics = true;
    }

    public function testGenerateEcdsaKeys()
    {
        $authenticityClient = new AuthenticityClient();

        $keys = $authenticityClient->generateEcdsaKeyPair();

        $this->assertNotNull($keys->getPublicKey());
        $this->assertNotNull($keys->getPrivateKey());
    }

    public function testSignEcdsa()
    {
        $recordClient = new RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();
        $signature = $authenticityClient->sign($record, new EcdsaSigner($ecdsaKeyPair->getPrivateKey()));

        $this->assertNotNull($signature);
    }

    public function testVerifyEcdsa()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new EcdsaSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    public function testSignEns()
    {
        $recordClient = new RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();
        $signature = $authenticityClient->sign($record, new EnsSigner($ecdsaKeyPair->getPrivateKey()));

        $this->assertNotNull($signature);
    }

    public function testVerifyEns()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new EnsSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    public function testGetSignatures()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new EcdsaSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $signatures = $authenticityClient->getSignatures($record);

        $this->assertEquals(1, count($signatures));
        $this->assertEquals(SignatureAlg::ECDSA, SignatureAlg::fromString($signatures[0]->getHeader()->getAlg()));
    }

    public function testGetEmptySignatureCommonName()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new EcdsaSigner($ecdsaKeyPair->getPrivateKey()))->build();

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
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $commonName = "common_name";
        $record = $recordClient->fromString("Hello world")->withSigner(new EcdsaSigner($ecdsaKeyPair->getPrivateKey(), $commonName))->build();

        $signatures = $authenticityClient->getSignatures($record);

        $name = $authenticityClient->getSignatureCommonName($signatures[0]);

        $this->assertEquals($commonName, $name);
    }

    public function testGetEnsSignatureCommonName()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $ecdsaKeyPair = $authenticityClient->generateEcdsaKeyPair();

        $record = $recordClient->fromString("Hello world")->withSigner(new EnsSigner($ecdsaKeyPair->getPrivateKey()))->build();

        $signatures = $authenticityClient->getSignatures($record);
        $signature = $signatures[0];
        $signature->setSignature("66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601");
        $signature->setMessageHash("7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6");

        $name = $authenticityClient->getSignatureCommonName($signatures[0]);

        $this->assertEquals("vitalik.eth", $name);
    }
}