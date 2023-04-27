<?php

use Bloock\Bloock;
use Bloock\Client\IdentityClient;
use Bloock\Client\IntegrityClient;
use Bloock\Entity\Identity\Credential;
use Bloock\Entity\Identity\CredentialOffer;
use PHPUnit\Framework\TestCase;

final class IdentityTest extends TestCase
{
    const credentialOfferJson = "{\"thid\":\"aff91293-faec-4ffb-b0a0-c9be5e17fcaf\",\"body\":{\"url\":\"https//api.bloock.com/identity/v1/claims/792f62fb-7b26-4dd6-a440-f0e6f4ad402a/redeem\",\"credentials\":[{\"id\":\"792f62fb-7b26-4dd6-a440-f0e6f4ad402a\",\"description\":\"TestSchema\"}]},\"from\":\"did:iden3:eth:main:zxHh4f4NFe6a6D1NhUNEUrMw1nb36YNMHgiboNNz7\",\"to\":\"did:iden3:eth:main:zxJDvyiWDaLXiFEUBCKbPBQBxznbb2LgqwG9vXTp2\"}";
    const credentialJson = "{\"id\":\"https://api.bloock.com/identity/v1/claims/0f08f63c-0e31-4bb6-8fc3-28893bdeb7aa\",\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/iden3credential-v2.json-ld\"],\"type\":[\"VerifiableCredential\",\"TestSchema\"],\"issuanceDate\":\"2023-03-22T12:32:33.239583166Z\",\"credentialSubject\":{\"BoolAttr\":0,\"id\":\"did:polygonid:polygon:mumbai:2qHCSnJzmiB9mP5L86h51d6i3FhEgcYg9AmUcUg8jg\",\"type\":\"TestSchema\"},\"credentialStatus\":{\"id\":\"https://api.bloock.com/identity/v1/did:iden3:eth:main:zzGodZP2enAnrp5LBcXVCigERQcTWJbCF67wBc7iJ/claims/revocation/status/1500049182\",\"revocationNonce\":1500049182,\"type\":\"BloockRevocationProof\"},\"issuer\":\"did:iden3:eth:main:zzGodZP2enAnrp5LBcXVCigERQcTWJbCF67wBc7iJ\",\"credentialSchema\":{\"id\":\"https://api.bloock.com/hosting/v1/ipfs/Qmcj962wRkypdbAopKLvcedSkBf33ctJaGJ8PkXiUTMm79\",\"type\":\"JsonSchemaValidator2018\"},\"proof\":[{\"header\":{\"alg\":\"ES256K_M\",\"kid\":\"230303a5-8aef-4e92-bc7c-e06f5c488784\"},\"message_hash\":\"7de2019ac52a160191f748bed783b3582d66cb025b963330c63397aa17503d97\",\"protected\":\"e30\",\"signature\":\"ISAqQwDBMaSSkmAYbifS-uC0UzfAtnA7fzz51G4KQov6JJZwMHOKKZoRblOzvcF2D_W_Bf8ukCZJOBXBMc0_5g==\",\"type\":\"BloockSignatureProof\"},{\"anchor\":{\"anchor_id\":296849,\"networks\":[{\"name\":\"bloock_chain\",\"state\":\"Confirmed\",\"tx_hash\":\"0x5ce3e8e3b4b8735f295dbd8a2e6d98077474177c6f0578f1096dabc60617d6bb\"}],\"root\":\"aa39de63e0fc71aaaa9253086116b24b8a964cd9ba2ab58e33ef2554c0c095c2\",\"status\":\"Success\"},\"bitmap\":\"ffefc0\",\"depth\":\"000100020004000600080009000b000c000d000e001100110010000f000a000700050003\",\"leaves\":[\"b8654cc90adb6ad348287a4017e335c2785be2ef93f16f940b86605fc36d5c97\"],\"nodes\":[\"f566fe90b22641e6c4c89b5a39ea3bd4400303bf7ffa12016325b81cc0984825\",\"408f4da6b4e5b09c26a58f066beb6d81588bc3afddc4b39288e6e80cfe58b45a\",\"79be2e105bfe45b3b91f6749fd66dd920a25dfb0c089a27b98705a012c08e6e6\",\"e270112ede50dfca26404a9a7812df5a777322dedb7421c80abb3061c60a1b35\",\"22eba74324f088f18425cc9e93c2b3a21bced8d5a6cfade4b874abba361ff920\",\"b72dfb3f491e53c4816e83fd607fdaf7c79f64fe563d3f55b16af8241fbe22a6\",\"1688d687f3507abcbf9ebfd286bc2eba0e69f6af585cf2461650d74713c0d670\",\"efc548462843bbb9ddef0965a0c646eeb71c78fd662babb2635722d02a97985b\",\"287a57e146ff9d469ae5b39f11343b3c9e55fdbdc7f4edd9f4ca8fba4bd268c7\",\"94644790f7cd155d3b58c60c3f021f30666e5cfeb683ab12d27fec78aa418397\",\"515ecaf2713b13b8ba615674b4a94694d30d33ce133addd8331af5e56032f4bd\",\"717127712b837d4747d78db3dc55c1e9ded34ff6c124db409c11a72f6c1b2d7d\",\"f6b8d2fdb44c2b0a0e12b5ec232a4097c3bc45db51d89af26e0432b84fe07aca\",\"a00deee4b96eacdd9ff30e4691d805221deb8284e6856c856611766cfa54721f\",\"7b1c1939a58bd75e0dda34d3de7fcaa2143f0b65ffc27645c6a513b819e70601\",\"fc749d3a915ce5429560c8bc4f73d47bcc9cadec8ef3e9779c0462447ae50475\",\"296a21e0117f26be026eb608be5b54f1e305ac241b248ef4e045ec9467f47047\"],\"type\":\"BloockIntegrityProof\"}]}";

    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$disableAnalytics = true;
    }

    public function testCreateAndLoadIdentity()
    {
        $identityClient = new IdentityClient();
        $created = $identityClient->createIdentity();
        $loaded = $identityClient->loadIdentity($created->getMnemonic());

        $this->assertEquals($created->getKey(), $loaded->getKey());
        $this->assertEquals($created->getPrivateKey(), $loaded->getPrivateKey());
        $this->assertEquals($created->getMnemonic(), $loaded->getMnemonic());
    }

    public function testCredentialOfferToFromJson()
    {
        $offer = CredentialOffer::fromJSON(self::credentialOfferJson);
        $offerJson = $offer->toJSON();

        $newOffer = CredentialOffer::fromJSON($offerJson);

        $this->assertEquals($offer, $newOffer);
    }

    public function testCredentialToFromJson()
    {
        $credential = Credential::fromJSON(self::credentialJson);
        $credentialJson = $credential->toJSON();

        $newCredential = Credential::fromJSON($credentialJson);

        $this->assertEquals($credential, $newCredential);
    }

    public function testIdentityEndToEnd()
    {
        $identityClient = new IdentityClient();

        $holder = $identityClient->createIdentity();

        $schema = $identityClient->buildSchema("Test Schema", "test_schema")
            ->addBooleanAttribute("Boolean Attribute", "bool_attr", "")
            ->addMultichoiceAttribute("Multichoice Attribute", "multichoice_attr", ["option_a", "option_b", "option_c"], "")
            ->build();

        $receipt = $identityClient->buildCredential($schema->getId(), $holder->getKey())
            ->withBooleanAttribute("bool_attr", true)
            ->withMultichoiceAttribute("multichoice_attr", "option_b")
            ->build();

        $identityClient->waitOffer($receipt->getId());

        $offer = $identityClient->getOffer($receipt->getId());
        $offerJson = $offer->toJSON();

        $newOffer = CredentialOffer::fromJSON($offerJson);
        $this->assertEquals($offer, $newOffer);

        $credential = $identityClient->redeemOffer($newOffer, $holder->getPrivateKey());
        $credentialJson = $credential->toJSON();

        $newCredential = Credential::fromJSON($credentialJson);
        $this->assertEquals($credential, $newCredential);

        $verification = $identityClient->verifyCredential($credential);
        $this->assertGreaterThan(0, $verification->getTimestamp());
        $this->assertEquals(0, $verification->getRevocation());
        $this->assertNotEmpty($verification->getIssuer());

        $revocation = $identityClient->revokeCredential($credential);
        $this->assertTrue($revocation);
    }
}