package bloock.sdk.java;

import static org.junit.jupiter.api.Assertions.*;

import bloock.sdk.java.client.Client;
import bloock.sdk.java.entity.Anchor;
import bloock.sdk.java.entity.Network;
import bloock.sdk.java.entity.Proof;
import bloock.sdk.java.entity.RecordReceipt;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;

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
  void endToEnd() {
    Client sdk = getSdk();
    ArrayList<String> records =
        new ArrayList<>(
            Arrays.asList("79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f"));

    List<RecordReceipt> receipts =
        assertDoesNotThrow(
            () -> {
              return sdk.sendRecords(records);
            });

    assertTrue(receipts.size() > 0);
    assertEquals(receipts.get(0).getRecord(), records.get(0));

    Anchor anchor =
        assertDoesNotThrow(
            () -> {
              return sdk.waitAnchor(receipts.get(0).getAnchor());
            });

    assertEquals(receipts.get(0).getAnchor(), anchor.getId());

    Proof proof =
        assertDoesNotThrow(
            () -> {
              return sdk.getProof(records);
            });

    String root =
        assertDoesNotThrow(
            () -> {
              return sdk.verifyProof(proof);
            });
    assertNotEquals(root, "");
    assertNotEquals(root, null);

    long timestampValidateRoot =
        assertDoesNotThrow(
            () -> {
              return sdk.validateRoot(root, Network.BLOOCK_CHAIN);
            });

    assertTrue(timestampValidateRoot > 0);

    long timestampVerifyRecords =
        assertDoesNotThrow(
            () -> {
              return sdk.verifyRecords(records);
            });

    assertTrue(timestampVerifyRecords > 0);

    assertEquals(timestampValidateRoot, timestampVerifyRecords);
  }
}
