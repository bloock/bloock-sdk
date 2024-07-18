import { describe, test, expect } from "@jest/globals";
import { initDevSdk } from "./util";
import {
  AvailabilityClient,
  HostedLoader,
  HostedPublisher,
  IpfsLoader,
  IpfsPublisher,
  RecordClient,
  ManagedKeyParams,
  KeyClient,
  KeyProtectionLevel,
  KeyType,
  IpnsPublisher,
  IpnsKey,
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

    expect(result).toBeTruthy();
  });

  test("retrieve hosted", async () => {
    initDevSdk();

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
    initDevSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(record, new IpfsPublisher());

    expect(result).toBeTruthy();
  });

  test("retrieve ipfs", async () => {
    initDevSdk();

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

  test("publish ipns", async () => {
    initDevSdk();

    let keyName = "ipns_key_name_test_sdk";
    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.Rsa2048;
    let keyClient = new KeyClient();
    let managedKey = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType, keyName)
    );

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(record, new IpnsPublisher(new IpnsKey(managedKey)));

    expect(result).toBeTruthy();
  });
});
