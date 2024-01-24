import { describe, test, expect } from "@jest/globals";
import { generateRandomString, initDevSdk, initSdk } from "./util";
import {
  AuthenticityClient,
  CertificateType,
  Signer,
  ImportCertificateParams,
  KeyClient,
  KeyProtectionLevel,
  KeyType,
  ManagedCertificateParams,
  ManagedKeyParams,
  RecordClient,
  SubjectCertificateParams,
  LocalCertificateParams,
  Managed
} from "../../dist";
import { readFileSync } from "fs";
import path from "path";

describe("Key Tests", () => {
  test("generate local ecdsa", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    expect(key.key).toBeDefined();
    expect(key.privateKey).toBeDefined();

    let loadedKey = await keyClient.loadLocalKey(
      KeyType.EcP256k,
      key.privateKey!
    );

    expect(key.key).toEqual(loadedKey.key);
    expect(key.privateKey).toEqual(loadedKey.privateKey);
  });

  test("generate local bjj", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Bjj);

    expect(key.key).toBeDefined();
    expect(key.privateKey).toBeDefined();

    let loadedKey = await keyClient.loadLocalKey(KeyType.Bjj, key.privateKey!);

    expect(key.key).toEqual(loadedKey.key);
    expect(key.privateKey).toEqual(loadedKey.privateKey);
  });

  test("generate local rsa", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Rsa2048);

    expect(key.key).toBeDefined();
    expect(key.privateKey).toBeDefined();

    let loadedKey = await keyClient.loadLocalKey(
      KeyType.Rsa2048,
      key.privateKey!
    );

    expect(key.key).toEqual(loadedKey.key);
    expect(key.privateKey).toEqual(loadedKey.privateKey);
  });

  test("generate local aes", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Aes128);

    expect(key.key).toBeDefined();
    expect(key.privateKey).toBeUndefined();

    let loadedKey = await keyClient.loadLocalKey(KeyType.Aes128, key.key!);

    expect(key.key).toEqual(loadedKey.key);
    expect(key.privateKey).toEqual(loadedKey.privateKey);
  });

  test("generate managed ecdsa", async () => {
    initSdk();

    let keyName = "key_name";
    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.EcP256k;
    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType, keyName)
    );

    expect(key.name).toBe(keyName);
    expect(key.key).toBeDefined();
    expect(key.keyType).toBe(keyType);
    expect(key.protection).toBe(keyProtection);

    let loadedKey = await keyClient.loadManagedKey(key.id);

    expect(key.id).toEqual(loadedKey.id);
    expect(key.name).toEqual(loadedKey.name);
    expect(key.key).toEqual(loadedKey.key);
    expect(key.keyType).toEqual(loadedKey.keyType);
    expect(key.protection).toEqual(loadedKey.protection);
  });

  test("generate managed bjj", async () => {
    initSdk();

    let keyName = "key_name";
    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.Bjj;
    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType, keyName)
    );

    expect(key.name).toBe(keyName);
    expect(key.key).toBeDefined();
    expect(key.keyType).toBe(keyType);
    expect(key.protection).toBe(keyProtection);

    let loadedKey = await keyClient.loadManagedKey(key.id);

    expect(key.id).toEqual(loadedKey.id);
    expect(key.name).toEqual(loadedKey.name);
    expect(key.key).toEqual(loadedKey.key);
    expect(key.keyType).toEqual(loadedKey.keyType);
    expect(key.protection).toEqual(loadedKey.protection);
  });

  test("generate managed rsa", async () => {
    initSdk();

    let keyName = "key_name";
    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.Rsa2048;
    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType, keyName)
    );

    expect(key.name).toBe(keyName);
    expect(key.key).toBeDefined();
    expect(key.keyType).toBe(keyType);
    expect(key.protection).toBe(keyProtection);

    let loadedKey = await keyClient.loadManagedKey(key.id);

    expect(key.id).toEqual(loadedKey.id);
    expect(key.name).toEqual(loadedKey.name);
    expect(key.key).toEqual(loadedKey.key);
    expect(key.keyType).toEqual(loadedKey.keyType);
    expect(key.protection).toEqual(loadedKey.protection);
  });

  test("generate managed without name", async () => {
    initSdk();

    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.Rsa2048;
    let keyClient = new KeyClient();
    let key = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType)
    );

    expect(key.name).toBe("");
    expect(key.key).toBeDefined();
    expect(key.keyType).toBe(keyType);
    expect(key.protection).toBe(keyProtection);

    let loadedKey = await keyClient.loadManagedKey(key.id);

    expect(key.id).toEqual(loadedKey.id);
    expect(key.name).toEqual(loadedKey.name);
    expect(key.key).toEqual(loadedKey.key);
    expect(key.keyType).toEqual(loadedKey.keyType);
    expect(key.protection).toEqual(loadedKey.protection);
  });

  test("generate local certificate and sign", async () => {
    initDevSdk();

    let keyType = KeyType.Rsa2048;
    let subjectParams = new SubjectCertificateParams(
      "Google, internet, Authority G2",
      "Google, Inc",
      "IT + Department",
      undefined,
      undefined,
      "US"
    );
    let keyClient = new KeyClient();
    let certificate = await keyClient.newLocalCertificate(
      new LocalCertificateParams(keyType, subjectParams, "password", 2)
    );

    expect(certificate.pkcs12).toBeDefined();

    let loadedCertificate = await keyClient.loadLocalCertificate(
      certificate.pkcs12,
      certificate.password
    );

    expect([...loadedCertificate.pkcs12]).toEqual([...certificate.pkcs12]);

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(
      record,
      new Signer(loadedCertificate)
    );

    expect(signature.signature).toBeTruthy();
  });

  test("import local p12 certificate", async () => {
    initDevSdk();

    const dirPath = path.join(__dirname, "/test_utils/test.p12");
    let buffer = readFileSync(dirPath);

    let keyClient = new KeyClient();
    let certificate = await keyClient.loadLocalCertificate(buffer, "bloock");

    expect([...certificate.pkcs12]).toEqual([...buffer]);
  });

  test("generate managed certificate", async () => {
    initDevSdk();

    let keyType = KeyType.EcP256k;
    let subjectParams = new SubjectCertificateParams(
      "Google, internet, Authority G2",
      "Google, Inc",
      "IT + Department",
      undefined,
      undefined,
      "US"
    );
    let keyClient = new KeyClient();
    let certificate = await keyClient.newManagedCertificate(
      new ManagedCertificateParams(keyType, subjectParams, 5)
    );

    expect(certificate.key).toBeDefined();
    expect(certificate.keyType).toBe(keyType);
    expect(certificate.protection).toBe(KeyProtectionLevel.SOFTWARE);

    let loadedCertificate = await keyClient.loadManagedCertificate(
      certificate.id
    );

    expect(certificate.id).toEqual(loadedCertificate.id);
    expect(certificate.key).toEqual(loadedCertificate.key);
    expect(certificate.keyType).toEqual(loadedCertificate.keyType);
    expect(certificate.protection).toEqual(loadedCertificate.protection);
  });

  test("import pem managed certificate", async () => {
    initDevSdk();

    const dirPath = path.join(__dirname, "/test_utils/test.pem");
    let buffer = readFileSync(dirPath);

    let keyClient = new KeyClient();
    let certificate = await keyClient.importManagedCertificate(
      CertificateType.PEM,
      buffer,
      new ImportCertificateParams()
    );

    expect(certificate.key).toBeDefined();
    expect(certificate.keyType).toBe(KeyType.Rsa2048);
    expect(certificate.protection).toBe(KeyProtectionLevel.SOFTWARE);

    let loadedCertificate = await keyClient.loadManagedCertificate(
      certificate.id
    );

    expect(certificate.id).toEqual(loadedCertificate.id);
    expect(certificate.key).toEqual(loadedCertificate.key);
    expect(certificate.keyType).toEqual(loadedCertificate.keyType);
    expect(certificate.protection).toEqual(loadedCertificate.protection);
  });

  test("import pfx managed certificate", async () => {
    initDevSdk();

    const dirPath = path.join(__dirname, "/test_utils/test2.pfx");
    let buffer = readFileSync(dirPath);
    let password = "bloock";

    let keyClient = new KeyClient();
    let certificate = await keyClient.importManagedCertificate(
      CertificateType.PFX,
      buffer,
      new ImportCertificateParams(password)
    );

    expect(certificate.key).toBeDefined();
    expect(certificate.keyType).toBe(KeyType.EcP256k);
    expect(certificate.protection).toBe(KeyProtectionLevel.SOFTWARE);

    let loadedCertificate = await keyClient.loadManagedCertificate(
      certificate.id
    );

    expect(certificate.id).toEqual(loadedCertificate.id);
    expect(certificate.key).toEqual(loadedCertificate.key);
    expect(certificate.keyType).toEqual(loadedCertificate.keyType);
    expect(certificate.protection).toEqual(loadedCertificate.protection);

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();

    let authenticityClient = new AuthenticityClient();
    let signature = await authenticityClient.sign(
      record,
      new Signer(loadedCertificate)
    );

    expect(signature.signature).toBeTruthy();
  });

  test("setup & recover totp access control", async () => {
    initDevSdk();

    let keyClient = new KeyClient();
    let recordClient = new RecordClient();
    let authenticityClient = new AuthenticityClient();

    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.EcP256k;
    let managedKey = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType)
    );

    let record = await recordClient.fromString("Hello world").build();

    await authenticityClient.sign(record, new Signer(managedKey));

    let totp = await keyClient.setupTotpAccessControl(new Managed(managedKey));
    expect(totp.secret).toBeTruthy();
    expect(totp.secretQr).toBeTruthy();
    expect(totp.recoveryCodes).toBeTruthy();

    try {
      await authenticityClient.sign(record, new Signer(managedKey));
    } catch (error) {
      expect(error).toBeTruthy();
    }

    let totpRecovered = await keyClient.recoverTotpAccessControl(
      new Managed(managedKey),
      totp.recoveryCodes[0]
    );
    expect(totpRecovered.secret).toBeTruthy();
    expect(totpRecovered.secretQr).toBeTruthy();
    expect(totpRecovered.recoveryCodes).toBeTruthy();
  });

  test("setup secret access control", async () => {
    initDevSdk();

    let keyClient = new KeyClient();
    let recordClient = new RecordClient();
    let authenticityClient = new AuthenticityClient();

    let keyProtection = KeyProtectionLevel.SOFTWARE;
    let keyType = KeyType.EcP256k;
    let managedKey = await keyClient.newManagedKey(
      new ManagedKeyParams(keyProtection, keyType)
    );

    let record = await recordClient.fromString("Hello world").build();

    await authenticityClient.sign(record, new Signer(managedKey));

    let email = generateRandomString(8) + "@bloock.com";
    await keyClient.setupSecretAccessControl(
      new Managed(managedKey),
      "password",
      email
    );

    try {
      await authenticityClient.sign(record, new Signer(managedKey));
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
