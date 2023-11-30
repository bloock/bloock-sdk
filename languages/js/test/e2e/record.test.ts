import {
  RecordClient,
  IntegrityClient,
  AnchorNetwork,
  EncryptionAlg,
  EncryptionClient,
  HostedLoader,
  HostedPublisher,
  IpfsLoader,
  IpfsPublisher,
  Proof,
  ProofAnchor,
  AvailabilityClient,
  KeyClient,
  KeyType,
  Signer,
  LocalCertificateParams,
  SubjectCertificateParams,
  Encrypter
} from "../../dist/index";
import { describe, test, expect } from "@jest/globals";
import { initSdk } from "./util";

describe("Record Tests", () => {
  test("record from string", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let hash = await record.getHash();
    expect(hash).toEqual(
      "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
    );
  });

  test("record from bytes", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromBytes(Uint8Array.from([1, 2, 3, 4, 5]))
      .build();

    let hash = await record.getHash();
    expect(hash).toEqual(
      "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4"
    );
  });

  test("record from hex", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromHex("1234567890abcdef").build();

    let hash = await record.getHash();
    expect(hash).toEqual(
      "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f"
    );
  });

  test("record from json", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromJson({ hello: "world" }).build();

    let hash = await record.getHash();
    expect(hash).toEqual(
      "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312"
    );
  });

  test("record from file", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromFile(Uint8Array.from([2, 3, 4, 5, 6]))
      .build();

    let hash = await record.getHash();
    expect(hash).toEqual(
      "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446"
    );
  });

  test("record from hosted loader", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();
    let payload = await record.retrieve();

    let availabilityClient = new AvailabilityClient();
    let id = await availabilityClient.publish(record, new HostedPublisher());

    record = await recordClient.fromLoader(new HostedLoader(id)).build();
    let result = await record.retrieve();
    expect(payload).toEqual(result);
  });

  test("record from ipfs loader", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let payload = await record.retrieve();

    let availabilityClient = new AvailabilityClient();
    let id = await availabilityClient.publish(record, new IpfsPublisher());

    record = await recordClient.fromLoader(new IpfsLoader(id)).build();

    let result = await record.retrieve();

    expect(payload).toEqual(result);
  });

  /*test("record with ecdsa signer", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();
    let name = "Some name";

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world 3")
      .withSigner(new Signer(keys.privateKey, { commonName: name }))
      .build();

    keys = await authenticityClient.generateEcdsaKeyPair();

    const recordWithMultipleSignatures = await recordClient
      .fromRecord(record)
      .withSigner(new Signer(keys.privateKey))
      .build();

    let signatures = await authenticityClient.getSignatures(
      recordWithMultipleSignatures
    );
    expect(signatures.length).toEqual(2);

    expect(
      await authenticityClient.getSignatureCommonName(signatures[0])
    ).toEqual(name);
    expect(signatures[0].getAlg()).toEqual(SignatureAlg.ECDSA);
  });

  test("record with ens signer", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world 4")
      .withSigner(new Signer(keys.privateKey))
      .build();

    let signatures = await authenticityClient.getSignatures(record);
    expect(signatures.length).toEqual(1);

    signatures[0].signature =
      "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601";
    signatures[0].messageHash =
      "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6";
    expect(
      await authenticityClient.getSignatureCommonName(signatures[0])
    ).toEqual("vitalik.eth");
    expect(signatures[0].getAlg()).toEqual(SignatureAlg.ENS);
  });*/

  test("record with aes encrypter", async () => {
    initSdk();

    let payload = "Hello world 2";
    let password = "some_password";
    let recordClient = new RecordClient();
    let encrypted_record = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(password))
      .build();

    expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(
      payload
    );

    let encryptionClient = new EncryptionClient();
    expect(await encryptionClient.getEncryptionAlg(encrypted_record)).toEqual(
      EncryptionAlg.AES256GCM
    );

    await expect(
      recordClient
        .fromRecord(encrypted_record)
        .withDecrypter(new Encrypter("incorrect_password")).build
    ).rejects.toThrow();

    let decrypted_record = await recordClient
      .fromRecord(encrypted_record)
      .withDecrypter(new Encrypter(password))
      .build();

    expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

    let hash = await decrypted_record.getHash();
    expect(hash).toEqual(
      "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
    );
  });

  test("record with rsa encrypter", async () => {
    initSdk();

    let payload = "Hello world 2";
    let encryptionClient = new EncryptionClient();
    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Rsa2048);

    let recordClient = new RecordClient();
    let encrypted_record = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(key))
      .build();

    expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(
      payload
    );

    expect(await encryptionClient.getEncryptionAlg(encrypted_record)).toEqual(
      EncryptionAlg.RSA
    );

    let decrypted_record = await recordClient
      .fromRecord(encrypted_record)
      .withDecrypter(new Encrypter(key))
      .build();

    expect(String.fromCharCode(...decrypted_record.payload)).toEqual(payload);

    let hash = await decrypted_record.getHash();
    expect(hash).toEqual(
      "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
    );
  });

  test("record with encrypter and hosted loader", async () => {
    initSdk();

    let payload = "Hello world 2";
    let password = "some_password";
    let recordClient = new RecordClient();
    let encrypted_record = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(password))
      .build();

    expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(
      payload
    );

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(
      encrypted_record,
      new HostedPublisher()
    );

    let loaded_record = await recordClient
      .fromLoader(new HostedLoader(result))
      .withDecrypter(new Encrypter(password))
      .build();

    expect(String.fromCharCode(...loaded_record.payload)).toEqual(payload);

    let hash = await loaded_record.getHash();
    expect(hash).toEqual(
      "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
    );
  });

  test("record with encrypter and ipfs loader", async () => {
    initSdk();

    let payload = "Hello world 2";
    let password = "some_password";
    let recordClient = new RecordClient();
    let encrypted_record = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(password))
      .build();

    expect(String.fromCharCode(...encrypted_record.payload)).not.toEqual(
      payload
    );

    let availabilityClient = new AvailabilityClient();
    let result = await availabilityClient.publish(
      encrypted_record,
      new IpfsPublisher()
    );

    let loaded_record = await recordClient
      .fromLoader(new IpfsLoader(result))
      .withDecrypter(new Encrypter(password))
      .build();

    expect(String.fromCharCode(...loaded_record.payload)).toEqual(payload);

    let hash = await loaded_record.getHash();
    expect(hash).toEqual(
      "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
    );
  });

  test("record details encrypted", async () => {
    initSdk();

    let payload = "Hello world 2";
    let recordClient = new RecordClient();
    let keyClient = new KeyClient();

    let key = await keyClient.newLocalKey(KeyType.Rsa2048);
    let record = await recordClient
      .fromString(payload)
      .withEncrypter(new Encrypter(key))
      .build();

    let recordPayload = record.retrieve();
    let details = await recordClient.fromFile(recordPayload).getDetails();

    expect(details.integrity).toBeUndefined();
    expect(details.authenticity).toBeUndefined();

    expect(details.encryption?.alg).toEqual(EncryptionAlg.RSA);
    expect(details.encryption?.key).toBeTruthy();
    expect(details.encryption?.subject).toBeDefined();

    expect(details.availability?.contentType).toBeUndefined();
    expect(details.availability?.size).toEqual(recordPayload.length);
  });

  test("record details signed", async () => {
    initSdk();

    let payload = "Hello world 2";
    let recordClient = new RecordClient();
    let keyClient = new KeyClient();

    let cert = await keyClient.newLocalCertificate(
      new LocalCertificateParams(
        KeyType.Rsa2048,
        new SubjectCertificateParams("Bloock"),
        "password",
        0
      )
    );
    let record = await recordClient
      .fromString(payload)
      .withSigner(new Signer(cert))
      .build();

    let recordPayload = record.retrieve();
    let details = await recordClient.fromFile(recordPayload).getDetails();

    expect(details.integrity?.hash).toBeTruthy();
    expect(details.integrity?.proof).not.toBeTruthy();

    expect(details.authenticity?.signatures).toBeTruthy();

    expect(details.encryption).toBeUndefined();

    expect(details.availability?.size).toEqual(recordPayload.length);
  });

  test("record set proof", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

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

    let integrityClient = new IntegrityClient();
    let finalProof = await integrityClient.getProof([record]);

    expect(finalProof).toEqual(original_proof);
  });
});
