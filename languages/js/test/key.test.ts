import { describe, test, expect } from "@jest/globals";
import { initSdk } from "./util";
import {
  KeyClient,
  KeyProtectionLevel,
  KeyType,
  ManagedKeyParams
} from "../dist";

describe("Key Tests", () => {
  test("generate local ecdsa", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.EcP256k);

    expect(key.key).toBeDefined();
    expect(key.privateKey).toBeDefined();
  });

  test("generate local rsa", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Rsa2048);

    expect(key.key).toBeDefined();
    expect(key.privateKey).toBeDefined();
  });

  test("generate local aes", async () => {
    initSdk();

    let keyClient = new KeyClient();
    let key = await keyClient.newLocalKey(KeyType.Aes128);

    expect(key.key).toBeDefined();
    expect(key.privateKey).toBeUndefined();
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
  });
});
