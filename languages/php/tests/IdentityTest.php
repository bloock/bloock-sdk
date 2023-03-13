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
    const credentialJson = "{\"threadID\":\"ce7bb4f3-ce14-4b5b-8917-d0298ca290e9\",\"body\":{\"id\":\"https://api.bloock.com//v1/claims/cd9a7e15-b0bd-4c11-a04b-5553b82ff85e\",\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/iden3credential-v2.json-ld\"],\"type\":[\"VerifiableCredential\",\"TestSchema\"],\"issuanceDate\":\"2023-03-09T15:23:48.888937432Z\",\"credentialSubject\":{\"BoolAttr\":0,\"id\":\"did:iden3:eth:main:216KpPWSfV1dZWtoW3yFTG8EjcDs1bEcJxmAw65Erp\",\"type\":\"TestSchema\"},\"credentialStatus\":{\"id\":\"https://api.bloock.com/v1/did%3Aiden3%3Aeth%3Amain%3AzxHh4f4NFe6a6D1NhUNEUrMw1nb36YNMHgiboNNz7/claims/revocation/status/2615659019\",\"revocationNonce\":2615659019,\"type\":\"BloockRevocationProof\"},\"issuer\":\"did:iden3:eth:main:zxHh4f4NFe6a6D1NhUNEUrMw1nb36YNMHgiboNNz7\",\"credentialSchema\":{\"id\":\"https://api.bloock.com/hosting/v1/ipfs/Qmcj962wRkypdbAopKLvcedSkBf33ctJaGJ8PkXiUTMm79\",\"type\":\"JsonSchemaValidator2018\"},\"proof\":[{\"header\":{\"alg\":\"ES256K\",\"kid\":\"034861428fd1764d37d5d1c5883ad6c6727746bc33bb4556047ba000ea9ff47259\"},\"message_hash\":\"72062ae22b7b9e2d58497ba18f35bd8e56924d399bbf9c0e3f52efd922325ad2\",\"protected\":\"e30\",\"signature\":\"19b95d1b2a043a6f568559b84191903d1ec44d8e3d5948c61950d2ea1b24a3666302f6a50fa006a75cd88e9416442a0feb1c213afba2bb207fd90e2338553ebb00\",\"type\":\"BloockSignatureProof\"},{\"anchor\":{\"anchor_id\":278298,\"networks\":[{\"name\":\"bloock_chain\",\"state\":\"Confirmed\",\"tx_hash\":\"0xcf37ac910991d90f483c1a2ba6f518e4c08f66df456dfef6ed5565863406508d\"}],\"root\":\"db13b66a88f5edc4c4b9f2aa4f05d59510176570ea2efce56d8fb3a5c0819136\",\"status\":\"Success\"},\"bitmap\":\"ffdff8\",\"depth\":\"0002000400050007000c000d001000110012001400140013000f000e000b000a00090008000600030001\",\"leaves\":[\"2feeac09c037b2f09f06b871a84a23801da15a727484eadda27dab68fc1c94dc\"],\"nodes\":[\"516176fdc620c8ab71bb60c517fd7809b881b85b393d668b8e25ca682f46a087\",\"8af96651608104afeeeec17f37ff2a53ab0449819d6f41183453c0e409f165ac\",\"b04d2c9d5a731b6141b0d0a5f89d8bb5f8900a728257b1978f083dc913de632e\",\"50c47a9ac87c811e2031c53f99e9a9808bbce2a92fc7625abcc00f5ffa8f9b16\",\"e59e4cec622bde163d80bdaf50a497047af79c1019062445011ecffe12c5a8d4\",\"342749208e85a234017be9cd0ca2e87038fb6976e68ef824f88d1f3f4c94fba1\",\"352129325f49025ec4a0e292719a6cdbf83d5e86e2a854923d20c1b31c048038\",\"55d5b8c56247360a4ffd4c4d217f8e156b7b279542082a68300053f0c6c893cc\",\"5a199da3e0ef0660372b1020aa45854c31ca0b6514c8ffa1baf1a0bdb0c0e14b\",\"2b93948f81be82b18547d106b8c8e2c553d0e4a0b8bc6321ab71b789e7b5c710\",\"5a19be76ff9799de9a1585a3e811377459448cf024a2a235173224ac455b29ce\",\"69b949d1398417b50d64ebb5d5249de1d556dc6718d7d52907c99a5e27580e36\",\"d8cca1db86f60771fb5fe29252f6f05e8cdd3a61a3f51a761421945514b81e76\",\"550635d8c04f0fa3396eeefd80dd9cc2db4aa4c19c6f7b1b6ec61722d4b68a53\",\"15ea15725a070f948eb198636c3c7f7240c00694e65a9e5a5ce0b1222fd5133b\",\"094217b5d82005489d8fbbdc644e7ab8226da2491f550e6c633e5d4fca5a1f7f\",\"86b38affacad14fe3015d38b331f471628bc0d28fdea296b54194da26f93b9c7\",\"fd252542a270246623f06535691f6f41bab75148b94beb8bede97e1d753a50a3\",\"49745954e8ef71f5bb529100f2cb78476dae4b08255b1f1ead4dacb1fb138ddb\",\"dcc37ac76d4012f50e54010a9d97d2421359dab21b02b8919063231c117f1631\"],\"type\":\"BloockIntegrityProof\"}]}}";

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
            ->addBooleanAttribute("bool_attr", "bool_attr", "")
            ->build();

        $receipt = $identityClient->buildCredential($schema->getId(), $holder->getKey())
            ->withBooleanAttribute("BoolAttr", true)
            ->build();

        $integrityClient = new IntegrityClient();
        $integrityClient->waitAnchor($receipt->getAnchorId());

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