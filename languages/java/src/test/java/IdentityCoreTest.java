import com.bloock.sdk.client.IdentityClient;
import com.bloock.sdk.client.IdentityCoreClient;
import com.bloock.sdk.client.KeyClient;
import com.bloock.sdk.entity.identity.*;
import com.bloock.sdk.entity.key.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class IdentityCoreTest {
    String drivingLicenseSchemaType = "DrivingLicense";
    String holderDid = "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr";
    Long expiration = 4089852142L;

    @BeforeAll
    static void beforeAll() {
        Utils.initDevSdk();
    }

    @Test
    void endToEnd() throws Exception {
        IdentityClient identityClient = new IdentityClient();
        KeyClient keyClient = new KeyClient();
        IdentityCoreClient identityCoreClient = new IdentityCoreClient();

        KeyProtectionLevel keyProtectionLevel = KeyProtectionLevel.SOFTWARE;
        KeyType keyType = KeyType.Bjj;

        ManagedKey managedKey =
                keyClient.newManagedKey(new ManagedKeyParams(keyProtectionLevel, keyType));

        Key issuerKey = new Key(managedKey);

        Issuer issuer =
                identityClient.createIssuer(
                        issuerKey,
                        PublishIntervalParams.Interval15,
                        DidMethod.PolygonIDTest,
                        "SDK Issuer Test Core Client",
                        "sdk issuer test core client",
                        null);
        assertTrue(issuer.getDid().getDid().contains("polygonid"));

        List<String> stringList = new ArrayList<>();
        stringList.add("big");
        stringList.add("medium");
        stringList.add("small");
        List<Long> integerList = new ArrayList<>();
        integerList.add(1L);
        integerList.add(5L);
        integerList.add(10L);
        List<Double> doubleList = new ArrayList<>();
        doubleList.add(1.10);
        doubleList.add(1.20);
        doubleList.add(1.30);

        Schema schema =
                identityClient
                        .buildSchema(
                                "Driving License", drivingLicenseSchemaType, "1.0", "driving license schema")
                        .addIntegerAttribute("License Type", "license_type", "license type", false)
                        .addDecimalAttribute("Quantity Oil", "quantity_oil", "quantity oil", true)
                        .addStringAttribute("Nif", "nif", "nif", true)
                        .addBooleanAttribute("Is Spanish", "is_spanish", "is_spanish", true)
                        .addDateAttribute("Birth Date", "birth_date", "birth date", true)
                        .addDatetimeAttribute("Local Hour", "local_hour", "local hour", true)
                        .addStringEnumAttribute("Car Type", "car_type", "car type", true, stringList)
                        .addIntegerEnumAttribute("Car Points", "car_points", "car points", true, integerList)
                        .addDecimalEnumAttribute(
                                "Precision wheels", "precision_wheels", "precision wheels", true, doubleList)
                        .build();
        assertNotNull(schema.getCid());

        Schema getSchema = identityClient.getSchema(schema.getCid());
        assertNotNull(getSchema.getCidJsonLD());
        assertNotNull(getSchema.getJson());
        assertNotNull(getSchema.getSchemaType());

        CredentialReceipt receipt =
                identityCoreClient
                        .buildCredential(issuer, schema.getCid(), holderDid, expiration, 0)
                        .withIntegerAttribute("license_type", 1L)
                        .withDecimalAttribute("quantity_oil", 2.25555)
                        .withStringAttribute("nif", "54688188M")
                        .withBooleanAttribute("is_spanish", true)
                        .withDateAttribute("birth_date", LocalDate.of(1999, 3, 20))
                        .withDatetimeAttribute("local_hour", LocalDateTime.now())
                        .withStringAttribute("car_type", "big")
                        .withIntegerAttribute("car_points", 5L)
                        .withDecimalAttribute("precision_wheels", 1.10)
                        .build();
        assertNotNull(receipt.getCredentialId());
        assertNotNull(receipt.getCredential());
        assertEquals(drivingLicenseSchemaType, receipt.getCredentialType());

        Credential credential = receipt.getCredential();
        assertEquals(issuer.getDid().getDid(), credential.getIssuer());
        assertEquals("JsonSchema2023", credential.getCredentialSchema().getCredentialType());
        assertEquals(drivingLicenseSchemaType, credential.getType().get(1));
    }
}
