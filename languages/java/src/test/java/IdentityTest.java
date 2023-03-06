import com.bloock.sdk.client.IdentityClient;
import com.bloock.sdk.entity.identity.Credential;
import com.bloock.sdk.entity.identity.CredentialOffer;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

class IdentityTest {

    @BeforeAll
    static void beforeAll() {
        Utils.initSdk();
    }

    @Test
    void createIdentity() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        try {
            identityClient.createIdentity();
            fail("Exception was not thrown");
        } catch (Exception e) {
            assertEquals(e.getMessage(), "not implemented");
        }
    }

    @Test
    void loadIdentity() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        try {
            identityClient.loadIdentity("mnemonic");
            fail("Exception was not thrown");
        } catch (Exception e) {
            assertEquals(e.getMessage(), "not implemented");
        }
    }

    @Test
    void buildSchema() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        try {
            identityClient.buildSchema("", "")
                    .addBooleanAttribute("", "", "")
                    .addDateAttribute("", "", "")
                    .addDatetimeAttribute("", "", "")
                    .addMultichoiceAttribute("", "", Arrays.asList("a", "b", "c"), "")
                    .addNumberAttribute("", "", "")
                    .build();
            fail("Exception was not thrown");
        } catch (Exception e) {
            assertEquals(e.getMessage(), "not implemented");
        }
    }

    @Test
    void getSchema() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        try {
            identityClient.getSchema("id");
            fail("Exception was not thrown");
        } catch (Exception e) {
            assertEquals(e.getMessage(), "not implemented");
        }
    }

    @Test
    void credentialOfferBuilder() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        try {
            identityClient.buildOffer("", "")
                    .withBooleanAttribute("", true)
                    .withDateAttribute("", 123L)
                    .withDatetimeAttribute("", 123L)
                    .withMultichoiceAttribute("", "a")
                    .withNumberAttribute("", 123L)
                    .build();
            fail("Exception was not thrown");
        } catch (Exception e) {
            assertEquals(e.getMessage(), "not implemented");
        }
    }

    @Test
    void credentialOfferToJson() throws Exception {
        String json = CredentialOffer.fromJson("{}").toJson();
        assertEquals(json, "{}");
    }

    @Test
    void credentialOfferFromJson() throws Exception {
        CredentialOffer credentialOffer = CredentialOffer.fromJson("{}");
        assertEquals(credentialOffer.toJson(), "{}");
    }

    @Test
    void credentialOfferRedeem() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        try {
            CredentialOffer credentialOffer = CredentialOffer.fromJson("{}");
            identityClient.redeemOffer(credentialOffer, "");
            fail("Exception was not thrown");
        } catch (Exception e) {
            assertEquals(e.getMessage(), "not implemented");
        }
    }

    @Test
    void credentialToJson() throws Exception {
        String json = Credential.fromJson("{}").toJson();
        assertEquals(json, "{}");
    }

    @Test
    void credentialFromJson() throws Exception {
        Credential credential = Credential.fromJson("{}");
        assertEquals(credential.toJson(), "{}");
    }

    @Test
    void verifyCredential() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        try {
            Credential credential = Credential.fromJson("{}");
            identityClient.verifyCredential(credential);
            fail("Exception was not thrown");
        } catch (Exception e) {
            assertEquals(e.getMessage(), "not implemented");
        }
    }

    @Test
    void revokeCredential() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        try {
            Credential credential = Credential.fromJson("{}");
            identityClient.revokeCredential(credential);
            fail("Exception was not thrown");
        } catch (Exception e) {
            assertEquals(e.getMessage(), "not implemented");
        }
    }
}
