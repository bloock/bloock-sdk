import { describe, test, expect } from "@jest/globals";
import { initDevSdk } from "./util";
import {
  AvailabilityClient,
  HostedLoader,
  HostedPublisher,
  IpfsLoader,
  IpfsPublisher,
  RecordClient,
  IpnsPublisher,
  IpnsKey,
  IpnsLoader,
} from "../../dist";

describe("Availability Tests", () => {
  test("publish hosted", async () => {
    initDevSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(
      record,
      new HostedPublisher()
    );

    expect(result.id).toBeTruthy();
    expect(result.ipnsKey).toBeUndefined();
  });

  test("retrieve hosted", async () => {
    initDevSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let hash = await record.getHash();

    let availabilityClient = new AvailabilityClient();
    let res = await availabilityClient.publish(record, new HostedPublisher());

    let result = await availabilityClient.retrieve(new HostedLoader(res.id));
    let resultHash = await result.getHash();

    expect(resultHash).toBe(hash);
  });

  test("publish ipfs", async () => {
    initDevSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(record, new IpfsPublisher());

    expect(result.id).toBeTruthy();
    expect(result.ipnsKey).toBeUndefined();
  });

  test("retrieve ipfs", async () => {
    initDevSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let hash = await record.getHash();

    let availabilityClient = new AvailabilityClient();
    let res = await availabilityClient.publish(record, new IpfsPublisher());

    let result = await availabilityClient.retrieve(new IpfsLoader(res.id));
    let resultHash = await result.getHash();

    expect(resultHash).toBe(hash);
  });

  test("publish ipns", async () => {
    initDevSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();
    let recordHash = await record.getHash()

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(record, new IpnsPublisher());

    expect(result.id).toBeTruthy();
    expect(result.ipnsKey).toBeTruthy();

    let resultRetrieved = await availabilityClient.retrieve(new IpnsLoader(result.id));
    let resultHash = await resultRetrieved.getHash();

    expect(resultHash).toBe(recordHash);

    let recordUpdated = await recordClient.fromString("Bye Bye").build();
    if (result.ipnsKey) {
      let resultUpdated = await availabilityClient.publish(recordUpdated, new IpnsPublisher(new IpnsKey(result.ipnsKey.keyID)));

      expect(resultUpdated.id).toBeTruthy();
      expect(resultUpdated.ipnsKey).toBeTruthy();
    }
  });
});
