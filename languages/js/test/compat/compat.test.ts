import { describe, test, expect } from "@jest/globals";
import { RecordClient } from "../../dist";

describe("Compat Test", () => {
  test("compat test", async () => {
    let recordClient = new RecordClient();

    let record = await recordClient.fromString("Hello world").build();
    let hash = await record.getHash();

    expect(hash).toBe(
      "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
    );
  });
});
