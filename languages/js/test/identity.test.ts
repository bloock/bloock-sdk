import { describe, test, expect } from "@jest/globals";
import { Credential, CredentialOffer, IdentityClient } from "../dist";

describe("Identity Tests", () => {
  test("test create identity", async () => {
    const identityClient = new IdentityClient();

    await identityClient.createIdentity();
  });

  test("test load identity", async () => {
    const identityClient = new IdentityClient();

    await identityClient.loadIdentity("mnemonic");
  });

  test("test build schema", async () => {
    const identityClient = new IdentityClient();

    await identityClient
      .buildSchema("", "")
      .addBooleanAttribute("", "", "")
      .addDateAttribute("", "", "")
      .addDateTimeAttribute("", "", "")
      .addMultichoiceAttribute("", "", ["a", "b", "c"], "")
      .addNumberAttribute("", "", "")
      .build();
  });

  test("test get schema", async () => {
    const identityClient = new IdentityClient();

    await identityClient.getSchema("");
  });

  test("test create credential offer", async () => {
    const identityClient = new IdentityClient();

    await identityClient
      .buildOffer("", "")
      .withBoleanAttribute("", true)
      .withDateAttribute("", new Date())
      .withDateTimeAttribute("", new Date())
      .withMultichoiceAttribute("", "a")
      .withNumberAttribute("", 123)
      .build();
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

    let offer = CredentialOffer.fromJSON("");
    await identityClient.redeemOffer(offer, "");
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

    let credential = Credential.fromJSON("");
    await identityClient.verifyCredential(credential);
  });

  test("test revoke credential", async () => {
    const identityClient = new IdentityClient();

    let credential = Credential.fromJSON("");
    await identityClient.revokeCredential(credential);
  });
});
