import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.bloock.sdk.client.AvailabilityClient;
import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.entity.availability.HostedLoader;
import com.bloock.sdk.entity.availability.HostedPublisher;
import com.bloock.sdk.entity.availability.IpfsLoader;
import com.bloock.sdk.entity.availability.IpfsPublisher;
import com.bloock.sdk.entity.record.Record;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class AvailabilityTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initSdk();
  }

  @Test
  void publishHosted() throws Exception {
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    String result = availabilityClient.publish(record, new HostedPublisher());

    assertNotNull(result);
  }

  @Test
  void retrieveHosted() throws Exception {
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    String recordHash = record.getHash();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    String id = availabilityClient.publish(record, new HostedPublisher());

    Record result = availabilityClient.retrieve(new HostedLoader(id));

    assertEquals(result.getHash(), recordHash);
  }

  @Test
  void publishIpfs() throws Exception {
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    String result = availabilityClient.publish(record, new IpfsPublisher());

    assertNotNull(result);
  }

  @Test
  void retrieveIpfs() throws Exception {
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    String recordHash = record.getHash();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    String id = availabilityClient.publish(record, new IpfsPublisher());

    Record result = availabilityClient.retrieve(new IpfsLoader(id));

    assertEquals(result.getHash(), recordHash);
  }
}
