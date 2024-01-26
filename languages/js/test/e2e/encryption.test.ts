import { describe, test, expect } from "@jest/globals";
import { generateTOTPClient, initDevSdk } from "./util";
import {
  AccessControl,
  AccessControlTotp,
  Encrypter,
  EncryptionAlg,
  EncryptionClient,
  KeyClient,
  KeyProtectionLevel,
  KeyType,
  Managed,
  ManagedKeyParams,
  RecordClient
} from "../../dist";

describe("Encryptions Tests", () => {
  test("encrypt local aes", async () => {
    initDevSdk();

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
    initDevSdk();

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
    initDevSdk();

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
    initDevSdk();

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

  test("encrypt managed rsa with totp access control", async () => {
    initDevSdk();

    let payload = "Hello world";
    let recordClient = new RecordClient();
    let record = await recordClient.fromString(payload).build();
    let recordHash = await record.getHash();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Rsa2048)
    );

    let totp = await keyClient.setupTotpAccessControl(new Managed(key))

    const timestamp = Math.floor(Date.now() / 1000);
    let code = generateTOTPClient(totp.secret, timestamp)

    let totpAccessControl = new AccessControlTotp(code)
    let encryptionClient = new EncryptionClient();
    let encryptedRecord = await encryptionClient.encrypt(
      record,
      new Encrypter(key, new AccessControl(totpAccessControl))
    );

    let decryptedRecord = await recordClient
      .fromRecord(encryptedRecord)
      .withDecrypter(new Encrypter(key, new AccessControl(totpAccessControl)))
      .build();

    let decryptedRecordHash = await decryptedRecord.getHash();

    expect(decryptedRecordHash).toBe(recordHash);
    expect(decryptedRecord.retrieve()).not.toBe(encryptedRecord.retrieve());
  });

  test("decrypt local rsa", async () => {
    initDevSdk();

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
    initDevSdk();

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
    initDevSdk();

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
