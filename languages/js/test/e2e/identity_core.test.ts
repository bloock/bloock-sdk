import { describe, test, expect } from "@jest/globals";
import {
    DidMethod,
    IdentityCoreClient,
    Key,
    PublishIntervalParams,
} from "../../dist/index";
import {
    IdentityClient,
    KeyClient,
    KeyProtectionLevel,
    KeyType,
    ManagedKeyParams,
} from "../../dist";
import { initDevSdk } from "./util";

describe("Identity V2 Tests", () => {
    const drivingLicenseSchemaType = "DrivingLicense";
    const holderDid =
        "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr";
    const expiration = 4089852142;

    test("test identity core end to end", async () => {
        initDevSdk();

        const identityClient = new IdentityClient();
        const keyClient = new KeyClient();
        const identityCoreClient = new IdentityCoreClient();

        let keyProtection = KeyProtectionLevel.SOFTWARE;
        let keyType = KeyType.Bjj;
        let managedKey = await keyClient.newManagedKey(
            new ManagedKeyParams(keyProtection, keyType)
        );

        let issuerKey = new Key(managedKey);

        let issuer = await identityClient.createIssuer(
            issuerKey,
            PublishIntervalParams.Interval15,
            DidMethod.PolygonIDTest,
            "Bloock Test",
            "bloock description test",
        );
        expect(issuer.did.did.includes("polygonid")).toBeTruthy();

        let schema = await identityClient
            .buildSchema(
                "Driving License",
                drivingLicenseSchemaType,
                "1.0",
                "driving license schema"
            )
            .addIntegerAttribute(
                "License Type",
                "license_type",
                "license type",
                false
            )
            .addDecimalAttribute("Quantity Oil", "quantity_oil", "quantity oil", true)
            .addStringAttribute("Nif", "nif", "nif", true)
            .addBooleanAttribute("Is Spanish", "is_spanish", "is spanish", true)
            .addDateAttribute("Birth Date", "birth_date", "birth date", true)
            .addDateTimeAttribute("Local Hour", "local_hour", "local hour", true)
            .addStringEnumAttribute("Car Type", "car_type", "car type", true, [
                "big",
                "medium",
                "small"
            ])
            .addIntegerEnumAttribute("Car Points", "car_points", "car points", true, [
                1,
                5,
                10
            ])
            .addDecimalEnumAttribute(
                "Precision wheels",
                "precision_wheels",
                "precision whels",
                true,
                [1.1, 1.2, 1.3]
            )
            .build();
        expect(schema.cid).toBeTruthy();

        schema = await identityClient.getSchema(schema.cid);
        expect(schema.cidJsonLd).toBeTruthy();
        expect(schema.json).toBeTruthy();
        expect(schema.schemaType).toBeTruthy();

        const receipt = await identityCoreClient
            .buildCredential(issuer, schema.cid, holderDid, expiration, 0)
            .withIntegerAttribute("license_type", 1)
            .withDecimalAttribute("quantity_oil", 2.25555)
            .withStringAttribute("nif", "54688188M")
            .withBoleanAttribute("is_spanish", true)
            .withDateAttribute("birth_date", new Date(1999, 3, 20))
            .withDateTimeAttribute("local_hour", new Date(Date.now()))
            .withStringAttribute("car_type", "big")
            .withIntegerAttribute("car_points", 5)
            .withDecimalAttribute("precision_wheels", 1.1)
            .build();
        expect(receipt.credentialId).toBeTruthy();
        expect(receipt.credential).toBeTruthy();
        expect(receipt.credentialType).toStrictEqual(drivingLicenseSchemaType);

        let credential = receipt.credential;
        expect(credential.issuer).toStrictEqual(issuer.did.did);
        expect(credential.credentialSchema.type).toStrictEqual("JsonSchema2023");
        expect(credential.type[1]).toStrictEqual(drivingLicenseSchemaType);
    })
})