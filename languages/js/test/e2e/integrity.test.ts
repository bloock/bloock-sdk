import { describe, expect, test } from "@jest/globals";
import {
  IntegrityClient,
  Network,
  Record,
  RecordClient
} from "../../dist/index";
import { initSdk } from "./util";

describe("Integrity Tests", () => {
  test("integrity end to end", async () => {
    initSdk();

    let recordClient = new RecordClient();
    let record = await recordClient.fromString("Hello world").build();
    const records: Record[] = [record];

    const integrityClient = new IntegrityClient();
    const sendReceipt = await integrityClient.sendRecords(records);
    expect(sendReceipt.length).toBeGreaterThan(0);

    const anchor = await integrityClient.waitAnchor(sendReceipt[0].anchor);
    expect(anchor.id).toEqual(sendReceipt[0].anchor);

    const proof = await integrityClient.getProof(records);
    const root = await integrityClient.verifyProof(proof);

    const timestampValidateRoot = await integrityClient.validateRoot(
      root,
      Network.GNOSIS_CHAIN
    );
    expect(timestampValidateRoot).toBeGreaterThan(0);

    const timestampVerifyRecords = await integrityClient.verifyRecords(
      records,
      Network.GNOSIS_CHAIN
    );
    expect(timestampVerifyRecords).toBeGreaterThan(0);

    expect(timestampValidateRoot).toEqual(timestampVerifyRecords);
  }, 120000);
});
