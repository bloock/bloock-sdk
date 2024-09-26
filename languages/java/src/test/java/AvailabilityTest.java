import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.client.AvailabilityClient;
import com.bloock.sdk.entity.availability.HostedLoader;
import com.bloock.sdk.entity.availability.HostedPublisher;
import com.bloock.sdk.entity.availability.IpfsLoader;
import com.bloock.sdk.entity.availability.IpfsPublisher;
import com.bloock.sdk.entity.availability.IpnsLoader;
import com.bloock.sdk.entity.availability.IpnsPublisher;
import com.bloock.sdk.entity.availability.PublishResponse;
import com.bloock.sdk.entity.record.Record;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class AvailabilityTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initDevSdk();
  }

  @Test
  void publishHosted() throws Exception {
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    PublishResponse result = availabilityClient.publish(record, new HostedPublisher());

    assertNotNull(result.getID());
    assertEquals("", result.getIpnsKey().getKeyID());
  }

  @Test
  void retrieveHosted() throws Exception {
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    String recordHash = record.getHash();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    PublishResponse response = availabilityClient.publish(record, new HostedPublisher());

    Record result = availabilityClient.retrieve(new HostedLoader(response.getID()));

    assertEquals(result.getHash(), recordHash);
  }

  @Test
  void publishIpfs() throws Exception {
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    PublishResponse result = availabilityClient.publish(record, new IpfsPublisher());

    assertNotNull(result.getID());
    assertEquals("", result.getIpnsKey().getKeyID());
  }

  @Test
  void retrieveIpfs() throws Exception {
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    String recordHash = record.getHash();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    PublishResponse response = availabilityClient.publish(record, new IpfsPublisher());

    Record result = availabilityClient.retrieve(new IpfsLoader(response.getID()));

    assertEquals(result.getHash(), recordHash);
  }

  @Test
  void publishIpns() throws Exception {    
    String payload = "Hello world";
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString(payload).build();

    AvailabilityClient availabilityClient = new AvailabilityClient();
    PublishResponse response = availabilityClient.publish(record, new IpnsPublisher());
    assertNotNull(response.getID());
    assertNotNull(response.getIpnsKey().getKeyID());

    Record result = availabilityClient.retrieve(new IpnsLoader(response.getID()));
		assertNotNull(result);

    String resultHash = result.getHash();
		assertEquals(record.getHash(), resultHash);

    Record recordUpdated = recordClient.fromString("Bye Bye").build();

    PublishResponse responseUpdated = availabilityClient.publish(recordUpdated, new IpnsPublisher(response.getIpnsKey()));
    assertNotNull(responseUpdated.getID());
    assertNotNull(responseUpdated.getIpnsKey().getKeyID());
  }
}
