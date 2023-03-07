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

        $identityClient->createIdentity();
    }

    public function testLoadIdentity()
    {
        $identityClient = new IdentityClient();

        $identityClient->loadIdentity("mnemonic");
    }

    public function testBuildSchema()
    {
        $identityClient = new IdentityClient();

        $identityClient->buildSchema("display_name", "technical_name")
            ->addBooleanAttribute("", "", "")
            ->addDateAttribute("", "", "")
            ->addDateTimeAttribute("", "", "")
            ->addMultichoiceAttribute("", "", ["a", "b", "c"], "")
            ->addNumberAttribute("", "", "")
            ->build();
    }

    public function testGetSchema()
    {
        $identityClient = new IdentityClient();

        $identityClient->getSchema("id");
    }

    public function testCredentialOfferBuilder()
    {
        $identityClient = new IdentityClient();

        $identityClient->buildOffer("id", "")
            ->withBooleanAttribute("", true)
            ->withDateAttribute("", 123)
            ->withDatetimeAttribute("", 123)
            ->withMultichoiceAttribute("", "a")
            ->withNumberAttribute("", 123)
            ->build();
    }

    public function testCredentialOfferToJson()
    {
        $credentialOfferJson = CredentialOffer::fromJSON("")->toJSON();
        $this->assertSame("", $credentialOfferJson);
    }

    public function testCredentialOfferRedeem()
    {
        $identityClient = new IdentityClient();

        $credentialOffer = CredentialOffer::fromJSON("");
        $identityClient->redeemOffer($credentialOffer, "");
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

        $credential = Credential::fromJson("");
        $identityClient->verifyCredential($credential);
    }

    public function testRevokeCredential()
    {
        $identityClient = new IdentityClient();

        $credential = Credential::fromJson("");
        $identityClient->revokeCredential($credential);
    }
}