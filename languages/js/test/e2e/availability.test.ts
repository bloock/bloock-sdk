import { describe, test, expect } from "@jest/globals";
import { initSdk } from "./util";
import {
  AvailabilityClient,
  HostedLoader,
  HostedPublisher,
  IpfsLoader,
  IpfsPublisher,
  RecordClient
} from "../../dist";

describe("Availability Tests", () => {
  test("publish hosted", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(
      record,
      new HostedPublisher()
    );

    expect(result).toBeTruthy();
  });

  test("retrieve hosted", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let hash = await record.getHash();

    let availabilityClient = new AvailabilityClient();
    let id = await availabilityClient.publish(record, new HostedPublisher());

    let result = await availabilityClient.retrieve(new HostedLoader(id));
    let resultHash = await result.getHash();

    expect(resultHash).toBe(hash);
  });

  test("publish ipfs", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(record, new IpfsPublisher());

    expect(result).toBeTruthy();
  });

  test("retrieve ipfs", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let hash = await record.getHash();

    let availabilityClient = new AvailabilityClient();
    let id = await availabilityClient.publish(record, new IpfsPublisher());

    let result = await availabilityClient.retrieve(new IpfsLoader(id));
    let resultHash = await result.getHash();

    expect(resultHash).toBe(hash);
  });
});
