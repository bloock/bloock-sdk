import {
  Record,
  RecordBuilder,
  BloockClient,
  Bloock,
  HostedPublisher,
  HostedLoader,
  AesEncrypter,
  AesDecrypter,
  EcsdaSigner,
  Network,
  RsaEncrypter,
  RsaDecrypter,
  EciesEncrypter,
  EciesDecrypter
} from "../dist/index";
import { describe, test, expect } from "@jest/globals";

function getSdk() {
  const apiKey = process.env["API_KEY"] || "";
  const apiHost = process.env["API_HOST"] || "";
  Bloock.setApiKey(apiKey);
  const client = new BloockClient();
  if (apiHost) {
    Bloock.setApiHost(apiHost);
  }
  Bloock.setDisableAnalytics(true);
  return client;
}

describe("E2E Tests", () => {
  test("test_basic_e2e", async () => {
    let sdk = getSdk();

    const records: Record[] = [];
    records.push(await testFromString());
    records.push(await testFromBytes());
    records.push(await testFromHex());
    records.push(await testFromJson());
    records.push(await testFromFile());
    records.push(await testEcsdaSignature(sdk));

    await testFromLoader();

    await testAesEncryption();
    await testAesEncryptionDataAvailability();

    await testRsaEncryption(sdk);
    await testRsaEncryptionDataAvailability(sdk);

    await testEciesEncryption(sdk);
    await testEciesEncryptionDataAvailability(sdk);

    const sendReceipt = await sdk.sendRecords(records);
    expect(sendReceipt.length).toBeGreaterThan(0);

    const anchor = await sdk.waitAnchor(sendReceipt[0].anchor);
    expect(anchor.id).toEqual(sendReceipt[0].anchor);

    const proof = await sdk.getProof(records);
    const root = await sdk.verifyProof(proof);

    const timestampValidateRoot = await sdk.validateRoot(
      root,
      Network.BLOOCK_CHAIN
    );
    expect(timestampValidateRoot).toBeGreaterThan(0);

    const timestampVerifyRecords = await sdk.verifyRecords(
      records,
      Network.BLOOCK_CHAIN
    );
    expect(timestampVerifyRecords).toBeGreaterThan(0);

    expect(timestampValidateRoot).toEqual(timestampVerifyRecords);
  }, 120000);
});

async function testFromString(): Promise<Record> {
  let record = await RecordBuilder.fromString("Hello world").build();

  let hash = await record.getHash();
  expect(hash).toEqual(
    "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
  );

  return record;
}

async function testFromBytes(): Promise<Record> {
  let record = await RecordBuilder.fromBytes(
    Uint8Array.from([1, 2, 3, 4, 5])
  ).build();

  let hash = await record.getHash();
  expect(hash).toEqual(
    "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4"
  );

  return record;
}

async function testFromHex(): Promise<Record> {
  let record = await RecordBuilder.fromHex("1234567890abcdef").build();

  let hash = await record.getHash();
  expect(hash).toEqual(
    "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f"
  );

  return record;
}

async function testFromJson(): Promise<Record> {
  let record = await RecordBuilder.fromJson({ hello: "world" }).build();

  let hash = await record.getHash();
  expect(hash).toEqual(
    "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312"
  );

  return record;
}

async function testFromFile(): Promise<Record> {
  let record = await RecordBuilder.fromFile(
    Uint8Array.from([2, 3, 4, 5, 6])
  ).build();

  let hash = await record.getHash();
  expect(hash).toEqual(
    "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446"
  );

  return record;
}

async function testEcsdaSignature(sdk: BloockClient): Promise<Record> {
  let keys = await sdk.generateKeys();

  let record = await RecordBuilder.fromString("Hello world 3")
    .withSigner(new EcsdaSigner(keys.privateKey))
    .build();

  keys = await sdk.generateKeys();

  const recordWithMultipleSignatures = await RecordBuilder.fromRecord(record)
    .withSigner(new EcsdaSigner(keys.privateKey))
    .build();

  let hash = await recordWithMultipleSignatures.getHash();
  expect(hash).toEqual(
    "79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f"
  );

  let signatures = await recordWithMultipleSignatures.getSignatures();
  expect(signatures.length).toEqual(2);

  return record;
}

async function testFromLoader() {
  let record = await RecordBuilder.fromString("Hello world").build();

  let hash = await record.getHash();

  let result = await record.publish(new HostedPublisher());
  expect(result).toEqual(hash);

  record = await RecordBuilder.fromLoader(new HostedLoader(result)).build();

  hash = await record.getHash();

  expect(hash).toEqual(result);
}

async function testAesEncryption() {
  let payload = "Hello world 2";
  let password = "some_password";
  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new AesEncrypter(password))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  await expect(
    RecordBuilder.fromRecord(encrypted_record).withDecrypter(
      new AesDecrypter("incorrect_password")
    ).build
  ).rejects.toThrow();

  let decrypted_record = await RecordBuilder.fromRecord(encrypted_record)
    .withDecrypter(new AesDecrypter(password))
    .build();

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  let hash = await decrypted_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );

  return hash;
}

async function testAesEncryptionDataAvailability() {
  let payload = "Hello world 2";
  let password = "some_password";
  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new AesEncrypter(password))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new HostedPublisher());

  let loaded_record = await RecordBuilder.fromLoader(
    new HostedLoader(result)
  ).build();

  let decrypted_record = await RecordBuilder.fromRecord(loaded_record)
    .withDecrypter(new AesDecrypter(password))
    .build();

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  let hash = await decrypted_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );

  return hash;
}

async function testRsaEncryption(sdk: BloockClient) {
  let payload = "Hello world 2";
  let keypair = await sdk.generateRsaKeyPair();

  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new RsaEncrypter(keypair.publicKey))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let decrypted_record = await RecordBuilder.fromRecord(encrypted_record)
    .withDecrypter(new RsaDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  let hash = await decrypted_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}

async function testRsaEncryptionDataAvailability(sdk: BloockClient) {
  let payload = "Hello world 2";
  let keypair = await sdk.generateRsaKeyPair();

  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new RsaEncrypter(keypair.publicKey))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new HostedPublisher());

  let loaded_record = await RecordBuilder.fromLoader(
    new HostedLoader(result)
  ).build();

  let decrypted_record = await RecordBuilder.fromRecord(loaded_record)
    .withDecrypter(new RsaDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  let hash = await decrypted_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}

async function testEciesEncryption(sdk: BloockClient) {
  let payload = "Hello world 2";
  let keypair = await sdk.generateEciesKeyPair();

  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new EciesEncrypter(keypair.publicKey))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let decrypted_record = await RecordBuilder.fromRecord(encrypted_record)
    .withDecrypter(new EciesDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  let hash = await decrypted_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}

async function testEciesEncryptionDataAvailability(sdk: BloockClient) {
  let payload = "Hello world 2";
  let keypair = await sdk.generateEciesKeyPair();

  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new EciesEncrypter(keypair.publicKey))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new HostedPublisher());

  let loaded_record = await RecordBuilder.fromLoader(
    new HostedLoader(result)
  ).build();

  let decrypted_record = await RecordBuilder.fromRecord(loaded_record)
    .withDecrypter(new EciesDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  let hash = await decrypted_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}
