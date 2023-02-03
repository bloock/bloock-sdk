import {
  Record,
  RecordBuilder,
  BloockClient,
  HostedPublisher,
  HostedLoader,
  AesEncrypter,
  AesDecrypter,
  EcdsaSigner,
  Network,
  RsaEncrypter,
  RsaDecrypter,
  EciesEncrypter,
  EciesDecrypter,
  Proof,
  ProofAnchor,
  AnchorNetwork,
  IpfsPublisher,
  IpfsLoader,
  EnsSigner,
  EncryptionAlg,
  SignatureAlg
} from "../dist/index";
import { describe, test, expect } from "@jest/globals";
import { getSdk } from "./util";

describe("E2E Tests", () => {
  test("test_basic_e2e", async () => {
    let sdk = getSdk();

    const records: Record[] = [];
    records.push(await testFromString());
    records.push(await testFromBytes());
    records.push(await testFromHex());
    records.push(await testFromJson());
    records.push(await testFromFile());
    records.push(await testEcdsaSignature(sdk));
    records.push(await testEnsSignature(sdk));

    await testFromHostedLoader();
    await testFromIpfsLoader();

    await testAesEncryption();
    await testAesEncryptionHosted();
    await testAesEncryptionIpfs();

    await testRsaEncryption(sdk);
    await testRsaEncryptionHosted(sdk);
    await testRsaEncryptionIpfs(sdk);

    await testEciesEncryption(sdk);
    await testEciesEncryptionHosted(sdk);
    await testEciesEncryptionIpfs(sdk);

    await testSetProof(sdk);

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

async function testEcdsaSignature(sdk: BloockClient): Promise<Record> {
  let keys = await sdk.generateKeys();
  let name = "Some name";

  let record = await RecordBuilder.fromString("Hello world 3")
    .withSigner(new EcdsaSigner(keys.privateKey, { commonName: name }))
    .build();

  keys = await sdk.generateKeys();

  const recordWithMultipleSignatures = await RecordBuilder.fromRecord(record)
    .withSigner(new EcdsaSigner(keys.privateKey))
    .build();

  let signatures = await recordWithMultipleSignatures.getSignatures();
  expect(signatures.length).toEqual(2);

  expect(await signatures[0].getCommonName()).toEqual(name);
  expect(signatures[0].getAlg()).toEqual(SignatureAlg.ECDSA);

  return recordWithMultipleSignatures;
}

async function testEnsSignature(sdk: BloockClient): Promise<Record> {
  let keys = await sdk.generateKeys();

  let record = await RecordBuilder.fromString("Hello world 4")
    .withSigner(new EnsSigner(keys.privateKey))
    .build();

  let signatures = await record.getSignatures();
  expect(signatures.length).toEqual(1);

  signatures[0].signature =
    "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601";
  signatures[0].messageHash =
    "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6";
  expect(await signatures[0].getCommonName()).toEqual("vitalik.eth");
  expect(signatures[0].getAlg()).toEqual(SignatureAlg.ENS);

  return record;
}

async function testFromHostedLoader() {
  let record = await RecordBuilder.fromString("Hello world").build();

  let hash = await record.getHash();

  let result = await record.publish(new HostedPublisher());
  expect(result).toEqual(hash);

  record = await RecordBuilder.fromLoader(new HostedLoader(result)).build();

  hash = await record.getHash();

  expect(hash).toEqual(result);
}

async function testFromIpfsLoader() {
  let payload = "Hello world";
  let record = await RecordBuilder.fromString(payload).build();

  let hash = await record.getHash();

  let result = await record.publish(new IpfsPublisher());
  expect(result).toEqual(hash);

  record = await RecordBuilder.fromLoader(new IpfsLoader(result)).build();

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

  expect(await encrypted_record.getEncryptionAlg()).toEqual(
    EncryptionAlg.AES256GCM
  );

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

async function testAesEncryptionHosted() {
  let payload = "Hello world 2";
  let password = "some_password";
  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new AesEncrypter(password))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new HostedPublisher());

  let loaded_record = await RecordBuilder.fromLoader(new HostedLoader(result))
    .withDecrypter(new AesDecrypter(password))
    .build();

  expect(String.fromCharCode(...loaded_record.payload)).toEqual(payload);

  let hash = await loaded_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );

  return hash;
}

async function testAesEncryptionIpfs() {
  let payload = "Hello world 2";
  let password = "some_password";
  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new AesEncrypter(password))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new IpfsPublisher());

  let loaded_record = await RecordBuilder.fromLoader(new IpfsLoader(result))
    .withDecrypter(new AesDecrypter(password))
    .build();

  expect(String.fromCharCode(...loaded_record.payload)).toEqual(payload);

  let hash = await loaded_record.getHash();
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

  expect(await encrypted_record.getEncryptionAlg()).toEqual(EncryptionAlg.RSA);

  let decrypted_record = await RecordBuilder.fromRecord(encrypted_record)
    .withDecrypter(new RsaDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  let hash = await decrypted_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}

async function testRsaEncryptionHosted(sdk: BloockClient) {
  let payload = "Hello world 2";
  let keypair = await sdk.generateRsaKeyPair();

  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new RsaEncrypter(keypair.publicKey))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new HostedPublisher());

  let loaded_record = await RecordBuilder.fromLoader(new HostedLoader(result))
    .withDecrypter(new RsaDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...loaded_record.payload)).toEqual(payload);

  let hash = await loaded_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}

async function testRsaEncryptionIpfs(sdk: BloockClient) {
  let payload = "Hello world 2";
  let keypair = await sdk.generateRsaKeyPair();

  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new RsaEncrypter(keypair.publicKey))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new IpfsPublisher());

  let loaded_record = await RecordBuilder.fromLoader(new IpfsLoader(result))
    .withDecrypter(new RsaDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...loaded_record.payload)).toEqual(payload);

  let hash = await loaded_record.getHash();
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

  expect(await encrypted_record.getEncryptionAlg()).toEqual(
    EncryptionAlg.ECIES
  );

  let decrypted_record = await RecordBuilder.fromRecord(encrypted_record)
    .withDecrypter(new EciesDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

  let hash = await decrypted_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}

async function testEciesEncryptionHosted(sdk: BloockClient) {
  let payload = "Hello world 2";
  let keypair = await sdk.generateEciesKeyPair();

  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new EciesEncrypter(keypair.publicKey))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new HostedPublisher());

  let loaded_record = await RecordBuilder.fromLoader(new HostedLoader(result))
    .withDecrypter(new EciesDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...loaded_record.payload)).toEqual(payload);

  let hash = await loaded_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}

async function testEciesEncryptionIpfs(sdk: BloockClient) {
  let payload = "Hello world 2";
  let keypair = await sdk.generateEciesKeyPair();

  let encrypted_record = await RecordBuilder.fromString(payload)
    .withEncrypter(new EciesEncrypter(keypair.publicKey))
    .build();

  expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(payload);

  let result = await encrypted_record.publish(new IpfsPublisher());

  let loaded_record = await RecordBuilder.fromLoader(new IpfsLoader(result))
    .withDecrypter(new EciesDecrypter(keypair.privateKey))
    .build();

  expect(String.fromCharCode(...loaded_record.payload)).toEqual(payload);

  let hash = await loaded_record.getHash();
  expect(hash).toEqual(
    "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
  );
}

async function testSetProof(sdk: BloockClient) {
  let record = await RecordBuilder.fromString("Hello world").build();

  let original_proof = new Proof(
    ["ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"],
    ["ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"],
    "1010101",
    "0101010",
    new ProofAnchor(
      42,
      [
        new AnchorNetwork(
          "Ethereum",
          "state",
          "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
        )
      ],
      "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
      "success"
    )
  );

  await record.setProof(original_proof);

  let finalProof = await sdk.getProof([record]);

  expect(finalProof).toEqual(original_proof);
}
