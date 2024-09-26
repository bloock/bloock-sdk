import { describe, expect, test } from "@jest/globals";
import {
  AccessControl,
  AccessControlSecret,
  AccessControlTotp,
  AuthenticityClient,
  KeyClient,
  KeyProtectionLevel,
  KeyType,
  Managed,
  ManagedKeyParams,
  RecordClient,
  Signature,
  Signer
} from "../../dist";
import { generateRandomString, initSdk } from "./util";
import { TOTP } from "totp-generator"

describe("Authenticity Tests", () => {
  test("generate ecdsa keys", async () => {
    initSdk();

    let authenticityClient = new AuthenticityClient();

    let keys = await authenticityClient.generateEcdsaKeyPair();

    expect(keys.privateKey).toBeTruthy();
    expect(keys.publicKey).toBeTruthy();
  });

  test("sign local ecdsa", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(record, new Signer(key));

    expect(signature.signature).toBeTruthy();
  });

  test("sign local bjj", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Bjj);

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(record, new Signer(key));

    expect(signature.signature).toBeTruthy();
  });

  test("sign local rsa", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Rsa2048);

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(record, new Signer(key));

    expect(signature.signature).toBeTruthy();
  });

  test("sign managed ecdsa", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k)
    );

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(record, new Signer(key));

    expect(signature.signature).toBeTruthy();
  });

  test("sign managed ecdsa with totp access control", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let authenticityClient = new AuthenticityClient();

    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k)
    );

    let totp = await keyClient.setupTotpAccessControl(new Managed(key));

    let signature: Signature;
    try {
      let code = TOTP.generate(totp.secret, {timestamp: Date.now()})

      let totpAccessControl = new AccessControlTotp(code.otp);
      signature = await authenticityClient.sign(
        record,
        new Signer(key, undefined, new AccessControl(totpAccessControl))
      );
    } catch (error) {
      let code = TOTP.generate(totp.secret, {timestamp: Date.now()})

      let totpAccessControl = new AccessControlTotp(code.otp);
      signature = await authenticityClient.sign(
        record,
        new Signer(key, undefined, new AccessControl(totpAccessControl))
      );
    }
    expect(signature.signature).toBeTruthy();

    const invalidCode = "123456";
    let invalidTotpAccessControl = new AccessControlTotp(invalidCode);

    try {
      await authenticityClient.sign(
        record,
        new Signer(key, undefined, new AccessControl(invalidTotpAccessControl))
      );
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test("sign managed bjj", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Bjj)
    );

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(record, new Signer(key));

    expect(signature.signature).toBeTruthy();
  });

  test("sign managed bjj with secret access control", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let authenticityClient = new AuthenticityClient();

    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Bjj)
    );

    let secret = "password";
    let email = generateRandomString(8) + "@bloock.com";
    await keyClient.setupSecretAccessControl(new Managed(key), secret, email);

    let secretAccessControl = new AccessControlSecret(secret);
    let signature = await authenticityClient.sign(
      record,
      new Signer(key, undefined, new AccessControl(secretAccessControl))
    );
    expect(signature.signature).toBeTruthy();

    let invalidSecret = "password1";
    let invalidSecretAccessControl = new AccessControlSecret(invalidSecret);

    try {
      await authenticityClient.sign(
        record,
        new Signer(
          key,
          undefined,
          new AccessControl(invalidSecretAccessControl)
        )
      );
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test("sign managed rsa", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Rsa2048)
    );

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(record, new Signer(key));

    expect(signature.signature).toBeTruthy();
  });

  test("verify local ecdsa", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("verify local bjj", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Bjj);

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("verify local rsa", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Rsa2048);

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("verify managed ecdsa", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k)
    );

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("verify managed bjj", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Bjj)
    );

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("verify managed rsa", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.Rsa2048)
    );

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("sign local ens", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(record, new Signer(key));

    expect(signature.signature).toBeTruthy();
  });

  test("sign managed ens", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k)
    );

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(record, new Signer(key));

    expect(signature.signature).toBeTruthy();
  });

  test("verify local ens", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("verify managed ens", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k)
    );

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let valid = await authenticityClient.verify(record);
    expect(valid).toBeTruthy();
  });

  test("get record signatures", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let signatures = await authenticityClient.getSignatures(record);
    expect(signatures.length).toBe(1);
    expect(signatures[0].alg).toBe("ES256K");
  });

  /*test("get empty signature common name", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
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

    let commonName = "common name";

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key, { commonName }))
      .build();

    let authenticityClient = new AuthenticityClient();
    let signatures = await authenticityClient.getSignatures(record);
    let name = await authenticityClient.getSignatureCommonName(signatures[0]);
    expect(name).toBe(commonName);
  });

  test("get ens signature common name", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    let recordClient = new RecordClient();
    let record = await recordClient
      .fromString("Hello world")
      .withSigner(new Signer(key))
      .build();

    let authenticityClient = new AuthenticityClient();
    let signatures = await authenticityClient.getSignatures(record);
    signatures[0].signature =
      "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601";
    signatures[0].messageHash =
      "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6";

    let name = await authenticityClient.getSignatureCommonName(signatures[0]);
    expect(name).toBe("vitalik.eth");
  });*/
});
