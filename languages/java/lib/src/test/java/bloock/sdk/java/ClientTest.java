package bloock.sdk.java;

import org.junit.jupiter.api.Test;

import bloock.sdk.java.entity.Anchor;

import static org.junit.jupiter.api.Assertions.*;

class ClientTest {
    Client getSdk() {
        Bloock.apiKey = System.getenv("API_KEY");
        String apiHost = System.getenv("API_HOST");
        if (apiHost != null) {
            Bloock.apiHost = apiHost;
        }
        return new Client();
    }

    @Test 
    void endToEnd() throws Exception {
        Client sdk = getSdk();
        System.out.println(5);
        Anchor anchor = sdk.waitAnchor(700);
        System.out.println("ANCHOR ==> " + anchor);
    }
}
