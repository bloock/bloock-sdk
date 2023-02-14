import { describe, test, expect } from "@jest/globals";
import { initSdk } from "./util";
import {
  AuthenticityClient,
  EcdsaSigner,
  EnsSigner,
  RecordClient
} from "../dist";

describe("Authenticity Tests", () => {
  test("generate ecdsa keys", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();

    let keys = await authenticityClient.generateEcdsaKeyPair();

    expect(keys.privateKey).toBeTruthy();
    expect(keys.publicKey).toBeTruthy();
  });

  test("sign ecdsa", async () => {
    initSdk();

    let recordClient = new RecordClient();

    let record = await recordClient.fromString("Hello world").build();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let signature = await authenticityClient.sign(
      record,
      new EcdsaSigner(keys.privateKey)
    );

    expect(signature.signature).toBeTruthy();
  });

  test("verify ecdsa", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new EcdsaSigner(keys.privateKey))
      .build();

    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("sign ens", async () => {
    initSdk();

    let recordClient = new RecordClient();

    let record = await recordClient.fromString("Hello world").build();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let signature = await authenticityClient.sign(
      record,
      new EnsSigner(keys.privateKey)
    );

    expect(signature.signature).toBeTruthy();
  });

  test("verify ens", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new EcdsaSigner(keys.privateKey))
      .build();

    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("get record signatures", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new EcdsaSigner(keys.privateKey))
      .build();

    let signatures = await authenticityClient.getSignatures(record);
    expect(signatures.length).toBe(1);
    expect(signatures[0].header.alg).toBe("ES256K");
  });

  test("get empty signature common name", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new EcdsaSigner(keys.privateKey))
      .build();

    let signatures = await authenticityClient.getSignatures(record);

    expect.assertions(1);
    try {
      await authenticityClient.getSignatureCommonName(signatures[0]);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  test("get ecdsa signature common name", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let commonName = "common name";
    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new EcdsaSigner(keys.privateKey, { commonName }))
      .build();

    let signatures = await authenticityClient.getSignatures(record);
    let name = await authenticityClient.getSignatureCommonName(signatures[0]);
    expect(name).toBe(commonName);
  });

  test("get ens signature common name", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();
    let keys = await authenticityClient.generateEcdsaKeyPair();

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new EnsSigner(keys.privateKey))
      .build();

    let signatures = await authenticityClient.getSignatures(record);
    signatures[0].signature =
      "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601";
    signatures[0].messageHash =
      "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6";

    let name = await authenticityClient.getSignatureCommonName(signatures[0]);
    expect(name).toBe("vitalik.eth");
  });
});
