import static org.junit.jupiter.api.Assertions.*;

import com.bloock.sdk.client.IntegrityClient;
import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.entity.*;
import com.bloock.sdk.entity.Record;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class IntegrityTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initSdk();
  }

  @Test
  void integrityEndToEnd() throws Exception {
    ArrayList<Record> records = new ArrayList<>();

    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();
    records.add(record);

    IntegrityClient integrityClient = new IntegrityClient();
    List<RecordReceipt> receipts = integrityClient.sendRecords(records);

    assertTrue(receipts.size() > 0);
    assertEquals(receipts.get(0).getRecord(), records.get(0).getHash());

    Anchor anchor = integrityClient.waitAnchor(receipts.get(0).getAnchor());

    assert receipts.get(0).getAnchor() == anchor.getId();

    Proof proof = integrityClient.getProof(records);

    String root = integrityClient.verifyProof(proof);
    assertNotSame("", root);
    assertNotNull(root);

    long timestampValidateRoot = integrityClient.validateRoot(root, Network.BLOOCK_CHAIN);

    assertTrue(timestampValidateRoot > 0);

    long timestampVerifyRecords = integrityClient.verifyRecords(records, Network.BLOOCK_CHAIN);

    assertTrue(timestampVerifyRecords > 0);
    assertEquals(timestampValidateRoot, timestampVerifyRecords);
  }
}
