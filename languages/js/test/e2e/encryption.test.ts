import { describe, test, expect } from "@jest/globals";
import { initSdk } from "./util";
import {
  Encrypter,
  EncryptionAlg,
  EncryptionClient,
  KeyClient,
  KeyProtectionLevel,
  KeyType,
  ManagedKeyParams,
  RecordClient
} from "../../dist";

describe("Encryptions Tests", () => {
  test("encrypt local aes", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();
    let recordHash = await record.getHash();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Aes256);

    let encryptionClient = new EncryptionClient();

    let encryptedRecord = await encryptionClient.encrypt(
      record,
      new Encrypter(key)
    );

    let decryptedRecord = await recordClient
      .fromRecord(encryptedRecord)
      .withDecrypter(new Encrypter(key))
      .build();

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(recordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("decrypt local aes", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Aes256);

    let encryptionClient = new EncryptionClient();

    let encryptedRecord = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(key))
      .build();

    let encryptedRecordHash = await encryptedRecord.getHash();

    let decryptedRecord = await encryptionClient.decrypt(
      encryptedRecord,
      new Encrypter(key)
    );

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(encryptedRecordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("encrypt local rsa", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();
    let recordHash = await record.getHash();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Rsa2048);

    let encryptionClient = new EncryptionClient();
    let encryptedRecord = await encryptionClient.encrypt(
      record,
      new Encrypter(key)
    );

    let decryptedRecord = await recordClient
      .fromRecord(encryptedRecord)
      .withDecrypter(new Encrypter(key))
      .build();

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(recordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("encrypt managed rsa", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();
    let recordHash = await record.getHash();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Rsa2048)
    );

    let encryptionClient = new EncryptionClient();
    let encryptedRecord = await encryptionClient.encrypt(
      record,
      new Encrypter(key)
    );

    let decryptedRecord = await recordClient
      .fromRecord(encryptedRecord)
      .withDecrypter(new Encrypter(key))
      .build();

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(recordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("decrypt local rsa", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Rsa2048);

    let encryptionClient = new EncryptionClient();
    let encryptedRecord = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(key))
      .build();

    let encryptedRecordHash = await encryptedRecord.getHash();

    let decryptedRecord = await encryptionClient.decrypt(
      encryptedRecord,
      new Encrypter(key)
    );

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(encryptedRecordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("decrypt managed rsa", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Rsa2048)
    );

    let encryptionClient = new EncryptionClient();
    let encryptedRecord = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(key))
      .build();

    let encryptedRecordHash = await encryptedRecord.getHash();

    let decryptedRecord = await encryptionClient.decrypt(
      encryptedRecord,
      new Encrypter(key)
    );

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(encryptedRecordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("get encryption alg", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Rsa2048);

    let encryptionClient = new EncryptionClient();
    let encryptedRecord = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(key))
      .build();

    let alg = await encryptionClient.getEncryptionAlg(encryptedRecord);
    expect(alg).toBe(EncryptionAlg.RSA);
  });
});
