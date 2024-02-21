<?php

use Bloock\Bloock;
use Bloock\Client\IdentityClient;
use Bloock\Client\IdentityCoreClient;
use Bloock\Client\KeyClient;
use Bloock\Entity\Identity\DidMethod;
use Bloock\Entity\Identity\PublishIntervalParams;
use Bloock\Entity\Key\Key;
use Bloock\Entity\Key\KeyProtectionLevel;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\ManagedKeyParams;
use PHPUnit\Framework\TestCase;

final class IdentityV2Test extends TestCase
{
    const drivingLicenseSchemaType = "DrivingLicense";
    const holderDid = "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr";
    const expiration = 4089852142;

    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("DEV_API_KEY");
        Bloock::$apiHost = getenv("DEV_API_HOST");
        Bloock::$identityApiHost = getenv("DEV_IDENTITY_API_HOST");
        Bloock::$disableAnalytics = true;
    }

    public function testIdentityEndToEnd()
    {
        $identityClient = new IdentityClient();
        $keyClient = new KeyClient();
        $identityCoreClient = new IdentityCoreClient();

        $keyProtection = KeyProtectionLevel::SOFTWARE;
        $keyType = KeyType::Bjj;

        $params = new ManagedKeyParams($keyProtection, $keyType);
        $managedKey = $keyClient->newManagedKey($params);

        $issuerKey = new Key($managedKey);

        $issuer = $identityClient->createIssuer($issuerKey, PublishIntervalParams::Interval15, DidMethod::PolygonIDTest, "SDK Issuer Test Core Client", "sdk issuer test core client");
        $this->assertStringContainsString("polygonid", $issuer->getDid()->getDid());

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

        $receipt = $identityCoreClient->buildCredential($issuer, $schema->getCid(), self::holderDid, self::expiration, 0)
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

        $credential = $receipt->getCredential();
        $this->assertEquals(self::drivingLicenseSchemaType, $receipt->getCredentialType());
        $this->assertEquals("JsonSchema2023", $credential->getCredentialSchema()->getType());
        $this->assertEquals(self::drivingLicenseSchemaType, $credential->getType()[1]);
    }
}
