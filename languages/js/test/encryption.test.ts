import { describe, test, expect } from "@jest/globals";
import { initSdk } from "./util";
import {
  AesDecrypter,
  AesEncrypter,
  EciesDecrypter,
  EciesEncrypter,
  EncryptionAlg,
  EncryptionClient,
  RecordClient,
  RsaDecrypter,
  RsaEncrypter
} from "../dist";

describe("Encryptions Tests", () => {
  test("encrypt aes", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();
    let recordHash = await record.getHash();

    let password = "some_password";
    let encryptionClient = new EncryptionClient();

    let encryptedRecord = await encryptionClient.encrypt(
      record,
      new AesEncrypter(password)
    );

    let decryptedRecord = await recordClient
      .fromRecord(encryptedRecord)
      .withDecrypter(new AesDecrypter(password))
      .build();

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(recordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("decrypt aes", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();

    let encryptionClient = new EncryptionClient();
    let password = "some_password";

    let encryptedRecord = await recordClient
      .fromString(payload)
      .withEncrypter(new AesEncrypter(password))
      .build();

    let encryptedRecordHash = await encryptedRecord.getHash();

    let decryptedRecord = await encryptionClient.decrypt(
      encryptedRecord,
      new AesDecrypter(password)
    );

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(encryptedRecordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("encrypt rsa", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();
    let recordHash = await record.getHash();

    let encryptionClient = new EncryptionClient();

    let keys = await encryptionClient.generateRsaKeyPair();
    let encryptedRecord = await encryptionClient.encrypt(
      record,
      new RsaEncrypter(keys.publicKey)
    );

    let decryptedRecord = await recordClient
      .fromRecord(encryptedRecord)
      .withDecrypter(new RsaDecrypter(keys.privateKey))
      .build();

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(recordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("decrypt rsa", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();

    let encryptionClient = new EncryptionClient();
    let keys = await encryptionClient.generateRsaKeyPair();

    let encryptedRecord = await recordClient
      .fromString(payload)
      .withEncrypter(new RsaEncrypter(keys.publicKey))
      .build();

    let encryptedRecordHash = await encryptedRecord.getHash();

    let decryptedRecord = await encryptionClient.decrypt(
      encryptedRecord,
      new RsaDecrypter(keys.privateKey)
    );

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(encryptedRecordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("encrypt ecies", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();
    let recordHash = await record.getHash();

    let encryptionClient = new EncryptionClient();

    let keys = await encryptionClient.generateEciesKeyPair();
    let encryptedRecord = await encryptionClient.encrypt(
      record,
      new EciesEncrypter(keys.publicKey)
    );

    let decryptedRecord = await recordClient
      .fromRecord(encryptedRecord)
      .withDecrypter(new EciesDecrypter(keys.privateKey))
      .build();

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(recordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("decrypt ecies", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();

    let encryptionClient = new EncryptionClient();
    let keys = await encryptionClient.generateEciesKeyPair();

    let encryptedRecord = await recordClient
      .fromString(payload)
      .withEncrypter(new EciesEncrypter(keys.publicKey))
      .build();

    let encryptedRecordHash = await encryptedRecord.getHash();

    let decryptedRecord = await encryptionClient.decrypt(
      encryptedRecord,
      new EciesDecrypter(keys.privateKey)
    );

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(encryptedRecordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("get encryption alg", async () => {
    initSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();

    let encryptionClient = new EncryptionClient();
    let keys = await encryptionClient.generateEciesKeyPair();

    let encryptedRecord = await recordClient
      .fromString(payload)
      .withEncrypter(new EciesEncrypter(keys.publicKey))
      .build();

    let alg = await encryptionClient.getEncryptionAlg(encryptedRecord);
    expect(alg).toBe(EncryptionAlg.ECIES);
  });
});
