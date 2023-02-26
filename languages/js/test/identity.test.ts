import { describe, test, expect } from "@jest/globals";
import { Credential, CredentialOffer, IdentityClient } from "../dist";

describe("Identity Tests", () => {
  test("test create identity", async () => {
    const identityClient = new IdentityClient();

    expect.assertions(1);
    try {
      await identityClient.createIdentity();
    } catch (e) {
      expect((e as any).message).toBe("not implemented");
    }
  });

  test("test load identity", async () => {
    const identityClient = new IdentityClient();

    expect.assertions(1);
    try {
      await identityClient.loadIdentity("mnemonic");
    } catch (e) {
      expect((e as any).message).toBe("not implemented");
    }
  });

  test("test build schema", async () => {
    const identityClient = new IdentityClient();

    expect.assertions(1);
    try {
      await identityClient
        .buildSchema("", "")
        .addBooleanAttribute("", "", "")
        .addDateAttribute("", "", "")
        .addDateTimeAttribute("", "", "")
        .addMultichoiceAttribute("", "", ["a", "b", "c"], "")
        .addNumberAttribute("", "", "")
        .build();
    } catch (e) {
      expect((e as any).message).toBe("not implemented");
    }
  });

  test("test get schema", async () => {
    const identityClient = new IdentityClient();

    expect.assertions(1);
    try {
      await identityClient.getSchema("");
    } catch (e) {
      expect((e as any).message).toBe("not implemented");
    }
  });

  test("test create credential offer", async () => {
    const identityClient = new IdentityClient();

    expect.assertions(1);
    try {
      await identityClient
        .buildOffer("", "")
        .withBoleanAttribute("", true)
        .withDateAttribute("", new Date())
        .withDateTimeAttribute("", new Date())
        .withMultichoiceAttribute("", "a")
        .withNumberAttribute("", 123)
        .build();
    } catch (e) {
      expect((e as any).message).toBe("not implemented");
    }
  });

  test("test credential offer from json", async () => {
    let offer = CredentialOffer.fromJSON("");
    expect(offer.toJSON()).toBe("");
  });

  test("test credential offer to json", async () => {
    let offerJson = CredentialOffer.fromJSON("").toJSON();
    expect(offerJson).toBe("");
  });

  test("test credential offer redeem", async () => {
    const identityClient = new IdentityClient();

    expect.assertions(1);
    try {
      let offer = CredentialOffer.fromJSON("");
      await identityClient.redeemOffer(offer, "");
    } catch (e) {
      expect((e as any).message).toBe("not implemented");
    }
  });

  test("test credential from json", async () => {
    let credential = Credential.fromJSON("");
    expect(credential.toJSON()).toBe("");
  });

  test("test credential to json", async () => {
    let credentialJson = Credential.fromJSON("").toJSON();
    expect(credentialJson).toBe("");
  });

  test("test verify credential", async () => {
    const identityClient = new IdentityClient();

    expect.assertions(1);
    try {
      let credential = Credential.fromJSON("");
      await identityClient.verifyCredential(credential);
    } catch (e) {
      expect((e as any).message).toBe("not implemented");
    }
  });

  test("test revoke credential", async () => {
    const identityClient = new IdentityClient();

    expect.assertions(1);
    try {
      let credential = Credential.fromJSON("");
      await identityClient.revokeCredential(credential);
    } catch (e) {
      expect((e as any).message).toBe("not implemented");
    }
  });
});
