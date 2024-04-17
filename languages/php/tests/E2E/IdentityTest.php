<?php

use Bloock\Bloock;
use Bloock\Client\IdentityClient;
//use Bloock\Client\IdentityCoreClient;
use Bloock\Client\KeyClient;
use Bloock\Entity\Identity\Credential;
use Bloock\Entity\Identity\DidMethod;
//use Bloock\Entity\Identity\PublishIntervalParams;
use Bloock\Entity\Key\Key;
use Bloock\Entity\Key\KeyProtectionLevel;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\ManagedKeyParams;
use PHPUnit\Framework\TestCase;

final class IdentityTest extends TestCase
{
    const credentialJson = "{\"@context\":[\"https://www.w3.org/2018/credentials/v1\",\"https://schema.iden3.io/core/jsonld/iden3proofs.jsonld\",\"https://api.bloock.dev/hosting/v1/ipfs/QmYMYpSQsFbqXgSRK8KFDGMopD2CUke5yd4m7XFuVAZTat\"],\"id\":\"https://clientHost.com/v1/did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/2ff36890-2fc1-4bba-b489-bdd7685e9555\",\"type\":[\"VerifiableCredential\",\"DrivingLicense\"],\"issuanceDate\":\"2023-08-21T10:21:42.402140Z\",\"expirationDate\":\"2099-08-08T06:02:22Z\",\"credentialSubject\":{\"birth_date\":921950325,\"country\":\"Spain\",\"first_surname\":\"Tomas\",\"id\":\"did:polygonid:polygon:amoy:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr\",\"license_type\":1,\"name\":\"Eduard\",\"nif\":\"54688188M\",\"second_surname\":\"Escoruela\",\"type\":\"DrivingLicense\"},\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/3553270275\",\"revocationNonce\":3553270275,\"type\":\"SparseMerkleTreeProof\"},\"issuer\":\"did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"credentialSchema\":{\"id\":\"https://api.bloock.dev/hosting/v1/ipfs/QmWkPu699EF334ixBGEK7rDDurQfu2SYBXU39bSozu1i5h\",\"type\":\"JsonSchema2023\"},\"proof\":[{\"coreClaim\":\"e055485e9b8410b3cd71cb3ba3a0b7652a00000000000000000000000000000002125caf312e33a0b0c82d57fdd240b7261d58901a346261c5ce5621136c0b0056d1a9bf4e9d10b44fdd5b0f6b740b21dcd6675e770bf882249b8083471858190000000000000000000000000000000000000000000000000000000000000000039acad300000000ee30c6f30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"issuerData\":{\"authCoreClaim\":\"cca3371a6cb1b715004407e325bd993c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fbd3b6b8c8e24e08bb982c7d4990e594747e5c24d98ac4ec969e50e437c1eb08407c9e5acc278a1641c82488f7518432a5937973d4ddfe551e32f9f7ba4c4a2e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\",\"credentialStatus\":{\"id\":\"https://api.bloock.dev/identity/v1/did%3Apolygonid%3Apolygon%3Aamoy%3A2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6/claims/revocation/status/0\",\"revocationNonce\":0,\"type\":\"SparseMerkleTreeProof\"},\"id\":\"did:polygonid:polygon:amoy:2qLjqgeBQPHf9F6omWx2nrzV5F4PicWAWpGXNkxFp6\",\"mtp\":{\"existence\":true,\"siblings\":[]},\"state\":{\"claimsTreeRoot\":\"0da5ac49846ae0074b986e5eef7c84011529e9902a0ffc6e9973b5cd0d217709\",\"value\":\"778582fc18b636314cc027a7772c1429028d44cdd17234f06e6d2d59bedee31d\"}},\"signature\":\"7bf882354b7cedd4b7ee74590cd3b091fef7545cb4ae8cd35c72b106ff858a0a3b1272ab7748cf7187d2383acda44bdae4bce1a7f9dccc11921fb0f19a70ee03\",\"type\":\"BJJSignature2021\"}]}";
    const drivingLicenseSchemaType = "DrivingLicense";
    const holderDid = "did:polygonid:polygon:amoy:2qbhbai9AVMJKC4yk38PgyD5ieBuCSH43QBTrkpYGc";
    const expiration = 4089852142;

    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("DEV_API_KEY");
        Bloock::$apiHost =  getenv("DEV_API_HOST");
        Bloock::$identityApiHost = getenv("DEV_IDENTITY_API_HOST");
    }

    public function testCredentialToFromJson()
    {
        $credential = Credential::fromJSON(self::credentialJson);
        $credentialJson = $credential->toJSON();

        $newCredential = Credential::fromJSON($credentialJson);
        $newCredentialJson = $newCredential->toJson($credentialJson);

        $this->assertEquals($credentialJson, $newCredentialJson);
    }

    public function testCreateHolderIdentity()
    {
        $identityClient = new IdentityClient();
        $keyClient = new KeyClient();

        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::Bjj;

        $params = new ManagedKeyParams($keyProtection, $keyType);
        $key = $keyClient->newManagedKey($params);

        $holderKey = new Key($key);

        $holder = $identityClient->createHolder($holderKey, DidMethod::PolygonID);
        $this->assertStringContainsString("main", $holder->getDid()->getDid());
    }

    /*public function testIdentityEndToEnd()
    {
        $identityClient = new IdentityClient();
        $identityCoreClient = new IdentityCoreClient();
        $keyClient = new KeyClient();

        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::Bjj;

        $params = new ManagedKeyParams($keyProtection, $keyType);
        $managedKey = $keyClient->newManagedKey($params);

        $notFoundManagedKey = $keyClient->newManagedKey($params);

        $issuerKey = new Key($managedKey);
        $notFoundIssuerKey = new Key($notFoundManagedKey);

        $currentDirectory = getcwd();
        $fileContents = file_get_contents($currentDirectory . "/tests/E2E/TestUtils/profile_image.png");
        $base64File = rtrim(strtr(base64_encode($fileContents), '+/', '-_'), '=');

        $issuer = $identityClient->createIssuer($issuerKey, PublishIntervalParams::Interval15, DidMethod::PolygonIDTest, "Bloock Test", "bloock description test", $base64File);
        $this->assertStringContainsString("amoy", $issuer->getDid()->getDid());

        $importedIssuer = $identityClient->importIssuer($issuerKey, DidMethod::PolygonIDTest);
        $this->assertEquals($issuer->getDid()->getDid(), $importedIssuer->getDid()->getDid());

        $getNotFoundIssuerDid = $identityClient->importIssuer($notFoundIssuerKey, DidMethod::PolygonIDTest);
        $this->assertEquals(null, $getNotFoundIssuerDid->getDid()->getDid());

        $schema = $identityClient->buildSchema("Driving License", self::drivingLicenseSchemaType, "1.0", "driving license schema")
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

        $receipt = $identityClient->buildCredential($issuer, $schema->getCid(), self::holderDid, self::expiration, 0)
            ->withIntegerAttribute("license_type", 1)
            ->withDecimalAttribute("quantity_oil", 2.25555)
            ->withStringAttribute("nif", "54688188M")
            ->withBooleanAttribute("is_spanish", true)
            ->withDateAttribute("birth_date", $dateTime)
            ->withDatetimeAttribute("local_hour", new DateTime)
            ->withStringAttribute("car_type", "big")
            ->withIntegerAttribute("car_points", 5)
            ->withDecimalAttribute("precision_wheels", 1.10)
            ->build();
        $this->assertNotNull($receipt->getCredentialId());
        $this->assertNotNull($receipt->getCredential());
        $this->assertEquals(self::drivingLicenseSchemaType, $receipt->getCredentialType());
        $this->assertEquals("JsonSchema2023", $receipt->getCredential()->getCredentialSchema()->getType());
        $this->assertEquals(self::drivingLicenseSchemaType, $receipt->getCredential()->getType()[1]);

        $newReceipt = $identityCoreClient->buildCredential($issuer, $schema->getCid(), self::holderDid, self::expiration, 0)
            ->withIntegerAttribute("license_type", 1)
            ->withDecimalAttribute("quantity_oil", 2.25555)
            ->withStringAttribute("nif", "54688188M")
            ->withBooleanAttribute("is_spanish", true)
            ->withDateAttribute("birth_date", $dateTime)
            ->withDatetimeAttribute("local_hour", new DateTime)
            ->withStringAttribute("car_type", "big")
            ->withIntegerAttribute("car_points", 5)
            ->withDecimalAttribute("precision_wheels", 1.10)
            ->build();
        $this->assertNotNull($newReceipt->getCredentialId());
        $this->assertNotNull($newReceipt->getCredential());
        $this->assertEquals(self::drivingLicenseSchemaType, $newReceipt->getCredentialType());

        $credential = $identityClient->getCredential($receipt->getCredentialId());
        $this->assertEquals("JsonSchema2023", $credential->getCredentialSchema()->getType());
        $this->assertEquals(self::drivingLicenseSchemaType, $credential->getType()[1]);

        $jsonOffer = $identityClient->getCredentialOffer($issuer, $receipt->getCredentialId());
        $this->assertNotNull($jsonOffer);

        $ok = $identityClient->revokeCredential($credential, $issuer);
        $this->assertTrue($ok);

        $stateReceipt = $identityClient->forcePublishIssuerState($issuer);
        $this->assertNotNull($stateReceipt->getTxHash());

        [$proofRequest, $error] = prepareProofRequest($getSchema->getCidJsonLd());
        $this->assertNull($error);

        $verification = $identityClient->createVerification($proofRequest);
        $this->assertNotNull($verification->getSessionID());
        $this->assertNotNull($verification->getVerificationRequest());

        try {
            $identityClient->getVerificationStatus($verification->getSessionID());
        } catch (Exception $e) {
            $this->assertNotNull($e->getMessage());
        }

        try {
            $identityClient->waitVerification($verification->getSessionID(), 5);
        } catch (Exception $e) {
            $this->assertNotNull($e->getMessage());
        }
    }*/
}

class ProofRequest
{
    public $circuitId;
    public $id;
    public $query;
}

function prepareProofRequest($schemaID)
{
    $jsonString = '{
        "circuitId": "credentialAtomicQuerySigV2",
        "id": 1704207344,
        "query": {
            "allowedIssuers": [
                "*"
            ],
            "credentialSubject": {
                "birth_date": {}
            },
            "type": "DrivingLicense"
        }
    }';

    $data = json_decode($jsonString, true);

    if (json_last_error() != JSON_ERROR_NONE) {
        return ['', json_last_error_msg()];
    }

    $data['query']['context'] = sprintf('https://api.bloock.dev/hosting/v1/ipfs/%s', $schemaID);

    $updatedProof = json_encode($data, JSON_PRETTY_PRINT);

    if (json_last_error() != JSON_ERROR_NONE) {
        return ['', json_last_error_msg()];
    }

    return [$updatedProof, null];
}
