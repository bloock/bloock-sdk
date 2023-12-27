<?php

use Bloock\Bloock;
use Bloock\Client\IdentityClient;
use Bloock\Client\KeyClient;
use Bloock\Entity\Authenticity\Signer;
use Bloock\Entity\IdentityV2\BjjIdentityKey;
use Bloock\Entity\IdentityV2\Blockchain;
use Bloock\Entity\IdentityV2\Credential;
use Bloock\Entity\IdentityV2\DidParams;
use Bloock\Entity\IdentityV2\IdentityKeyArgs;
use Bloock\Entity\IdentityV2\Method;
use Bloock\Entity\IdentityV2\Network;
use Bloock\Entity\Key\KeyProtectionLevel;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\ManagedKeyParams;
use PHPUnit\Framework\TestCase;

final class IdentityV2Test extends TestCase
{
    const credentialJson = "{\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://schema.iden3.io/core/jsonld/iden3proofs.jsonld\",\"https://api.bloock.dev/hosting/v1/ipfs/QmYMYpSQsFbqXgSRK8KFDGMopD2CUke5yd4m7XFuVAZTat\"],\"id\":\"https://clientHost.com/v1/did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/2ff36890-2fc1-4bba-b489-bdd7685e9555\",\"type\":[\"VerifiableCredential\",\"DrivingLicense\"],\"issuanceDate\":\"2023-08-21T10:21:42.402140Z\",\"expirationDate\":\"2099-08-08T06:02:22Z\",\"credentialSubject\":{\"birth_date\":921950325,\"country\":\"Spain\",\"first_surname\":\"Tomas\",\"id\":\"did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr\",\"license_type\":1,\"name\":\"Eduard\",\"nif\":\"54688188M\",\"second_surname\":\"Escoruela\",\"type\":\"DrivingLicense\"},\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/3553270275\",\"revocationNonce\":3553270275,\"type\":\"SparseMerkleTreeProof\"},\"issuer\":\"did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"credentialSchema\":{\"id\":\"https://api.bloock.dev/hosting/v1/ipfs/QmWkPu699EF334ixBGEK7rDDurQfu2SYBXU39bSozu1i5h\",\"type\":\"JsonSchema2023\"},\"proof\":[{\"coreClaim\":\"e055485e9b8410b3cd71cb3ba3a0b7652a00000000000000000000000000000002125caf312e33a0b0c82d57fdd240b7261d58901a346261c5ce5621136c0b0056d1a9bf4e9d10b44fdd5b0f6b740b21dcd6675e770bf882249b8083471858190000000000000000000000000000000000000000000000000000000000000000039acad300000000ee30c6f30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"issuerData\":{\"authCoreClaim\":\"cca3371a6cb1b715004407e325bd993c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fbd3b6b8c8e24e08bb982c7d4990e594747e5c24d98ac4ec969e50e437c1eb08407c9e5acc278a1641c82488f7518432a5937973d4ddfe551e32f9f7ba4c4a2e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did%3Apolygonid%3Apolygon%3Amumbai%3A2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/0\",\"revocationNonce\":0,\"type\":\"SparseMerkleTreeProof\"},\"id\":\"did:polygonid:polygon:mumbai:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"mtp\":{\"existence\":true,\"siblings\":[]},\"state\":{\"claimsTreeRoot\":\"0da5ac49846ae0074b986e5eef7c84011529e9902a0ffc6e9973b5cd0d217709\",\"value\":\"778582fc18b636314cc027a7772c1429028d44cdd17234f06e6d2d59bedee31d\"}},\"signature\":\"7bf882354b7cedd4b7ee74590cd3b091fef7545cb4ae8cd35c72b106ff858a0a3b1272ab7748cf7187d2383acda44bdae4bce1a7f9dccc11921fb0f19a70ee03\",\"type\":\"BJJSignature2021\"}]}";
    const apiManahedHost = "https://clientHost.com";
    const drivingLicenseSchemaType = "DrivingLicense";
    const holderDid = "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr";
    const expiration = 4089852142;

    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("DEV_API_KEY");
        Bloock::$apiHost = getenv("DEV_API_HOST");
        Bloock::$disableAnalytics = true;
    }

    public function testCredentialToFromJson()
    {
        $credential = Credential::fromJSON(self::credentialJson);
        $credentialJson = $credential->toJSON();

        $newCredential = Credential::fromJSON($credentialJson);
        $newCredentialJson = $newCredential->toJson($credentialJson);

        $this->assertEquals($credentialJson, $newCredentialJson);
    }

    public function testCreateIdentity()
    {
        $identityClient = new IdentityClient(self::apiManahedHost);
        $keyClient = new KeyClient();

        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::Bjj;

        $params = new ManagedKeyParams($keyProtection, $keyType);
        $key = $keyClient->newManagedKey($params);

        $issuerKey = new BjjIdentityKey(new IdentityKeyArgs($key));

        $issuer = $identityClient->createIdentity($issuerKey, null);
        $this->assertStringContainsString("polygonid", $issuer);
    }

    public function testIdentityEndToEnd()
    {
        $identityClient = new IdentityClient(self::apiManahedHost);
        $keyClient = new KeyClient();

        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::Bjj;

        $params = new ManagedKeyParams($keyProtection, $keyType);
        $keys = $keyClient->newManagedKey($params);

        $notFoundKey = $keyClient->newManagedKey($params);

        $keyBjj = $keyClient->loadManagedKey($keys->id);

        $issuerKey = new BjjIdentityKey(new IdentityKeyArgs($keyBjj));
        $notFoundIssuerKey = new BjjIdentityKey(new IdentityKeyArgs($notFoundKey));

        $currentDirectory = getcwd();
        $fileContents = file_get_contents($currentDirectory . "/tests/E2E/TestUtils/profile_image.png");
        $base64File = rtrim(strtr(base64_encode($fileContents), '+/', '-_'), '=');

        $issuer = $identityClient->createIssuer($issuerKey, null, "Bloock Test", "bloock description test", $base64File, 1);
        $this->assertStringContainsString("polygonid", $issuer);

        $getIssuerDid = $identityClient->getIssuerByKey($issuerKey);
        $this->assertEquals($issuer, $getIssuerDid);

        $getNotFoundIssuerDid = $identityClient->getIssuerByKey($notFoundIssuerKey);
        $this->assertEquals(null, $getNotFoundIssuerDid);

        $issuerParams = new DidParams(Method::IDEN3, Blockchain::POLYGON, Network::MUMBAI);
        $newIssuer = $identityClient->createIssuer($notFoundIssuerKey, $issuerParams);
        $this->assertStringContainsString("iden3", $newIssuer);

        $issuers = $identityClient->getIssuerList();
        $this->assertNotNull($issuers);

        $schema = $identityClient->buildSchema("Driving License", self::drivingLicenseSchemaType, "1.0", "driving license schema", $issuer)
            ->addIntegerAttribute("License Type", "license_type", "license type", false)
            ->addDecimalAttribute("Quantity Oil", "quantity_oil", "quantity oil", true)
            ->addStringAttribute("Nif", "nif", "nif", true)
            ->addBooleanAttribute("Is Spanish", "is_spanish", "is spanish", true)
            ->addDateAttribute("Birth Date", "birth_date", "birth date", true)
            ->addDateTimeAttribute("Local Hour", "local_hour", "local hour", true)
            ->addStringEnumAttribute("Car Type", "car_type", "car type", true, ["big", "medium", "small"])
            ->addIntegerEnumAttribute("Car Points", "car_points", "car points", true, [1, 5, 10])
            ->addDecimalEnumAttribute("Precision wheels", "precision_wheels", "precision wheels", true, [1.10, 1.20, 1.30])
            ->build();
        $this->assertNotNull($schema->getCid());

        $getSchema = $identityClient->getSchema($schema->getCid());
        $this->assertNotNull($getSchema->getCidJsonLd());
        $this->assertNotNull($getSchema->getJson());
        $this->assertNotNull($getSchema->getSchemaType());

        $dateString = "1999-03-20";
        $format = "Y-m-d";
        $dateTime = DateTime::createFromFormat($format, $dateString);

        $receipt = $identityClient->buildCredential($schema->getCid(), $issuer, self::holderDid, self::expiration, 0)
            ->withIntegerAttribute("license_type", 1)
            ->withDecimalAttribute("quantity_oil", 2.25555)
            ->withStringAttribute("nif", "54688188M")
            ->withBooleanAttribute("is_spanish", true)
            ->withDateAttribute("birth_date", $dateTime)
            ->withDatetimeAttribute("local_hour", new DateTime)
            ->withStringAttribute("car_type", "big")
            ->withIntegerAttribute("car_points", 5)
            ->withDecimalAttribute("precision_wheels", 1.10)
            ->withSigner(new Signer($keyBjj))
            ->build();
        $this->assertNotNull($receipt->getCredentialId());
        $this->assertNotNull($receipt->getCredential());
        $this->assertEquals(self::drivingLicenseSchemaType, $receipt->getCredentialType());

        $credential = $receipt->getCredential();
        $this->assertEquals(self::drivingLicenseSchemaType, $receipt->getCredentialType());
        $this->assertEquals("JsonSchema2023", $credential->getCredentialSchema()->getType());
        $this->assertEquals(self::drivingLicenseSchemaType, $credential->getType()[1]);

        $stateReceipt = $identityClient->publishIssuerState($issuer, new Signer($keyBjj));
        $this->assertNotNull($stateReceipt->getTxHash());

        $deadline = new DateTime();
        $deadline->add(new DateInterval('PT' . 120 . 'S'));

        $finish = true;
        while ($finish) {
            if (new DateTime() > $deadline) {
                break;
            }

            $proof = $identityClient->getCredentialProof($issuer, $credential->getId());

            if ($proof->getSparseMtProof() !== '') {
                $finish = false;
            }
        }

        $ok = $identityClient->revokeCredential($credential, new Signer($keyBjj));
        $this->assertTrue($ok);
    }
}
