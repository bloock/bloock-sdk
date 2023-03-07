import com.bloock.sdk.client.IdentityClient;
import com.bloock.sdk.entity.identity.Credential;
import com.bloock.sdk.entity.identity.CredentialOffer;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.assertEquals;

class IdentityTest {

    @BeforeAll
    static void beforeAll() {
        Utils.initSdk();
    }

    @Test
    void createIdentity() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        identityClient.createIdentity();
    }

    @Test
    void loadIdentity() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        identityClient.loadIdentity("mnemonic");
    }

    @Test
    void buildSchema() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        identityClient.buildSchema("", "")
                .addBooleanAttribute("", "", "")
                .addDateAttribute("", "", "")
                .addDatetimeAttribute("", "", "")
                .addMultichoiceAttribute("", "", Arrays.asList("a", "b", "c"), "")
                .addNumberAttribute("", "", "")
                .build();
    }

    @Test
    void getSchema() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        identityClient.getSchema("id");
    }

    @Test
    void credentialOfferBuilder() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        identityClient.buildOffer("", "")
                .withBooleanAttribute("", true)
                .withDateAttribute("", 123L)
                .withDatetimeAttribute("", 123L)
                .withMultichoiceAttribute("", "a")
                .withNumberAttribute("", 123L)
                .build();
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

        CredentialOffer credentialOffer = CredentialOffer.fromJson("{}");
        identityClient.redeemOffer(credentialOffer, "");
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

        Credential credential = Credential.fromJson("{}");
        identityClient.verifyCredential(credential);
    }

    @Test
    void revokeCredential() throws Exception {
        IdentityClient identityClient = new IdentityClient();

        Credential credential = Credential.fromJson("{}");
        identityClient.revokeCredential(credential);
    }
}
