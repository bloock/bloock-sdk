<?php

use Bloock\Bloock;
use Bloock\Client\IdentityClient;
use Bloock\Entity\Identity\Credential;
use Bloock\Entity\Identity\CredentialOffer;
use PHPUnit\Framework\TestCase;

final class IdentityTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$disableAnalytics = true;
    }

    public function testCreateIdentity()
    {
        $identityClient = new IdentityClient();

        try {
            $identityClient->createIdentity();
            $this->fail('Exception was not thrown');
        } catch (Exception $e) {
            $this->assertSame("not implemented", $e->getMessage());
        }
    }

    public function testLoadIdentity()
    {
        $identityClient = new IdentityClient();

        try {
            $identityClient->loadIdentity("mnemonic");
            $this->fail('Exception was not thrown');
        } catch (Exception $e) {
            $this->assertSame("not implemented", $e->getMessage());
        }
    }

    public function testBuildSchema()
    {
        $identityClient = new IdentityClient();

        try {
            $identityClient->buildSchema("display_name", "technical_name")
                ->addBooleanAttribute("", "", "")
                ->addDateAttribute("", "", "")
                ->addDateTimeAttribute("", "", "")
                ->addMultichoiceAttribute("", "", ["a", "b", "c"], "")
                ->addNumberAttribute("", "", "")
                ->build();
            $this->fail('Exception was not thrown');
        } catch (Exception $e) {
            $this->assertSame("not implemented", $e->getMessage());
        }
    }

    public function testGetSchema()
    {
        $identityClient = new IdentityClient();

        try {
            $identityClient->getSchema("id");
            $this->fail('Exception was not thrown');
        } catch (Exception $e) {
            $this->assertSame("not implemented", $e->getMessage());
        }
    }

    public function testCredentialOfferBuilder()
    {
        $identityClient = new IdentityClient();

        try {
            $identityClient->buildOffer("id", "")
                ->withBooleanAttribute("", true)
                ->withDateAttribute("", 123)
                ->withDatetimeAttribute("", 123)
                ->withMultichoiceAttribute("", "a")
                ->withNumberAttribute("", 123)
                ->build();
            $this->fail('Exception was not thrown');
        } catch (Exception $e) {
            $this->assertSame("not implemented", $e->getMessage());
        }
    }

    public function testCredentialOfferToJson()
    {
        $credentialOfferJson = CredentialOffer::fromJSON("")->toJSON();
        $this->assertSame("", $credentialOfferJson);
    }

    public function testCredentialOfferRedeem()
    {
        $identityClient = new IdentityClient();

        try {
            $credentialOffer = CredentialOffer::fromJSON("");
            $identityClient->redeemOffer($credentialOffer, "");
            $this->fail('Exception was not thrown');
        } catch (Exception $e) {
            $this->assertSame("not implemented", $e->getMessage());
        }
    }

    public function testCredentialToJson()
    {
        $credentialJson = Credential::fromJson("")->toJson();
        $this->assertSame("", $credentialJson);
    }

    public function testCredentialFromJson()
    {
        $credential = Credential::fromJson("");
        $this->assertSame("", $credential->toJson());
    }

    public function testVerifyCredential()
    {
        $identityClient = new IdentityClient();

        try {
            $credential = Credential::fromJson("");
            $identityClient->verifyCredential($credential);
            $this->fail('Exception was not thrown');
        } catch (Exception $e) {
            $this->assertSame("not implemented", $e->getMessage());
        }
    }

    public function testRevokeCredential()
    {
        $identityClient = new IdentityClient();

        try {
            $credential = Credential::fromJson("");
            $identityClient->revokeCredential($credential);
            $this->fail('Exception was not thrown');
        } catch (Exception $e) {
            $this->assertSame("not implemented", $e->getMessage());
        }
    }
}