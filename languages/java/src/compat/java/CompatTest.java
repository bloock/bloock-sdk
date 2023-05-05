import static org.junit.jupiter.api.Assertions.assertEquals;

import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.entity.record.Record;
import org.junit.jupiter.api.Test;

class CompatTest {

  @Test
  void testCompat() throws Exception {
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString("Hello world").build();

    assertEquals(
        record.getHash(), "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd");
  }
}
