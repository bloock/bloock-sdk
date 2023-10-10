<?php

use Bloock\Bloock;
use Bloock\Client\AuthenticityClient;
use Bloock\Client\KeyClient;
use Bloock\Client\RecordClient;
use Bloock\Entity\Authenticity\Signer;
use Bloock\Entity\Authenticity\SignatureAlg;
use Bloock\Entity\Authenticity\SignerArgs;
use Bloock\Entity\Key\KeyProtectionLevel;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\ManagedKeyParams;
use PHPUnit\Framework\TestCase;

final class AuthenticityTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$apiHost = getenv("API_HOST");
        Bloock::$disableAnalytics = true;
    }

    public function testGenerateEcdsaKeys()
    {
        $authenticityClient = new AuthenticityClient();

        $keys = $authenticityClient->generateEcdsaKeyPair();

        $this->assertNotNull($keys->getPublicKey());
        $this->assertNotNull($keys->getPrivateKey());
    }

    /**
     * @throws Exception
     */
    public function testSignLocalEcdsa()
    {
        $recordClient = new RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);
        $signature = $authenticityClient->sign($record, new Signer(new SignerArgs($key)));

        $this->assertNotNull($signature);
    }

    /**
     * @throws Exception
     */
    public function testSignManagedEcdsa()
    {
        $recordClient = new RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::EcP256k));
        $signature = $authenticityClient->sign($record, new Signer(new SignerArgs($key)));

        $this->assertNotNull($signature);
    }

    /**
     * @throws Exception
     */
    public function testSignManagedBjj()
    {
        $recordClient = new RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::Bjj));
        $signature = $authenticityClient->sign($record, new Signer(new SignerArgs($key)));

        $this->assertNotNull($signature);
    }

    /**
     * @throws Exception
     */
    public function testVerifyLocalEcdsa()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key)))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    /**
     * @throws Exception
     */
    public function testVerifyManagedEcdsa()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::EcP256k));

        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key)))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    /**
     * @throws Exception
     */
    public function testVerifyManagedBjj()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::Bjj));

        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key)))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    /**
     * @throws Exception
     */
    public function testSignLocalEns()
    {
        $recordClient = new RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);
        $signature = $authenticityClient->sign($record, new Signer(new SignerArgs($key)));

        $this->assertNotNull($signature);
    }

    /**
     * @throws Exception
     */
    public function testSignManagedEns()
    {
        $recordClient = new RecordClient();

        $record = $recordClient->fromString("Hello world")->build();

        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::EcP256k));
        $signature = $authenticityClient->sign($record, new Signer(new SignerArgs($key)));

        $this->assertNotNull($signature);
    }

    /**
     * @throws Exception
     */
    public function testVerifyLocalEns()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key)))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    /**
     * @throws Exception
     */
    public function testVerifyManagedEns()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newManagedKey(new ManagedKeyParams(KeyProtectionLevel::SOFTWARE, KeyType::EcP256k));

        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key)))->build();

        $valid = $authenticityClient->verify($record);
        $this->assertTrue($valid);
    }

    /**
     * @throws Exception
     */
    public function testGetSignatures()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key)))->build();

        $signatures = $authenticityClient->getSignatures($record);

        $this->assertCount(1, $signatures);
        $this->assertEquals(SignatureAlg::ECDSA, $signatures[0]->getAlg());
    }

    /**
     * @throws Exception
     */
    /*public function testGetEmptySignatureCommonName()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key)))->build();

        $signatures = $authenticityClient->getSignatures($record);

        $throwsException = false;
        try {
            $authenticityClient->getSignatureCommonName($signatures[0]);
        } catch (Exception $e) {
            $throwsException = true;
        }

        $this->assertTrue($throwsException);
    }*/

    /**
     * @throws Exception
     */
    /*public function testGetEcdsaSignatureCommonName()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $commonName = "common_name";
        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key, $commonName)))->build();

        $signatures = $authenticityClient->getSignatures($record);

        $name = $authenticityClient->getSignatureCommonName($signatures[0]);

        $this->assertEquals($commonName, $name);
    }*/

    /**
     * @throws Exception
     */
    /*public function testGetEnsSignatureCommonName()
    {
        $recordClient = new RecordClient();
        $authenticityClient = new AuthenticityClient();

        $keyClient = new KeyClient();
        $key = $keyClient->newLocalKey(KeyType::EcP256k);

        $record = $recordClient->fromString("Hello world")->withSigner(new Signer(new SignerArgs($key)))->build();

        $signatures = $authenticityClient->getSignatures($record);
        $signature = $signatures[0];
        $signature->setSignature("66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601");
        $signature->setMessageHash("7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6");

        $name = $authenticityClient->getSignatureCommonName($signatures[0]);

        $this->assertEquals("vitalik.eth", $name);
    }*/
}
