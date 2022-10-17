import {
  RecordBuilder,
  Network,
  EcsdaSigner,
  BloockClient
} from "../dist/index";

function getSdk() {
  const apiKey = process.env["API_KEY"] || "";
  const apiHost = process.env["API_HOST"] || "";
  const client = new BloockClient(apiKey);
  if (apiHost) {
    client.setApiHost(apiHost);
  }
  return client;
}

describe("E2E Tests", () => {
  test("test_basic_e2e", async () => {
    const sdk = getSdk();

    const records = [];
    let record = await RecordBuilder.fromString("Hello world").build();
    let hash = await record.getHash();
    expect(hash).toEqual(
      "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"
    );
    records.push(hash);

    record = await RecordBuilder.fromBytes(
      Uint8Array.from([1, 2, 3, 4, 5])
    ).build();
    hash = await record.getHash();
    expect(hash).toEqual(
      "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4"
    );
    records.push(hash);

    record = await RecordBuilder.fromHex("1234567890abcdef").build();
    hash = await record.getHash();
    expect(hash).toEqual(
      "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f"
    );
    records.push(hash);

    record = await RecordBuilder.fromJson('{"hello":"world"}').build();
    hash = await record.getHash();
    expect(hash).toEqual(
      "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312"
    );
    records.push(hash);

    record = await RecordBuilder.fromString("Hello world 2").build();
    record = await RecordBuilder.fromRecord(record).build();
    hash = await record.getHash();
    expect(hash).toEqual(
      "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6"
    );
    records.push(hash);

    record = await RecordBuilder.fromFile(
      Uint8Array.from([2, 3, 4, 5, 6])
    ).build();
    hash = await record.getHash();
    expect(hash).toEqual(
      "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446"
    );
    records.push(hash);

    record = await RecordBuilder.fromRaw(
      "eyJ0eSI6InN0cmluZyJ9.U29tZSBzdHJpbmc.W3siaGVhZGVyIjp7ImFsZyI6IkVDU0RBIiwia2lkIjoiMTIzNDU2Nzg5MGFiY2RlZiJ9LCJwcm90ZWN0ZWQiOiJlMCIsInNpZ25hdHVyZSI6IjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmIn1d.eyJoZWFkZXIiOnsiYWxnIjoiRUNTREEifSwicHJvdGVjdGVkIjoiZTAifQ.eyJhbmNob3IiOnsiYW5jaG9yX2lkIjoxLCJuZXR3b3JrcyI6W10sInJvb3QiOiIiLCJzdGF0dXMiOiJwZW5kaW5nIn0sImJpdG1hcCI6IjZkODAiLCJkZXB0aCI6IjAwMDUwMDA1MDAwNDAwMDQwMDA0MDAwNDAwMDQwMDAzMDAwMSIsImxlYXZlcyI6WyIxY2EwZTlkOWEyMDZmMDhkMzhhNGUyY2Y0ODUzNTE2NzRmZmM5YjBmMzE3NWUwY2I2ZGJkOGUwZTE5ODI5Yjk3Il0sIm5vZGVzIjpbIjFjYTBlOWQ5YTIwNmYwOGQzOGE0ZTJjZjQ4NTM1MTY3NGZmYzliMGYzMTc1ZTBjYjZkYmQ4ZTBlMTk4MjliOTciXX0"
    ).build();
    hash = await record.getHash();
    expect(hash).toEqual(
      "fc7eed1db0c14d70f875460a53c315d0df86a087ba9e921e9fe2923577c327f9"
    );
    records.push(hash);

    let keys = await sdk.generateKeys();

    record = await RecordBuilder.fromString("Hello world 3")
      .withSigner(new EcsdaSigner(keys.privateKey))
      .build();

    keys = await sdk.generateKeys();

    const recordWithMultipleSignatures = await RecordBuilder.fromRecord(record)
      .withSigner(new EcsdaSigner(keys.privateKey))
      .build();

    hash = await recordWithMultipleSignatures.getHash();
    expect(hash).toEqual(
      "79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f"
    );
    records.push(hash);

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
