import {RecordBuilder, Network, EcsdaSigner} from '../dist/index';
import * as util from './util';

describe('E2E Tests', () => {
  test('test_basic_e2e', async () => {
    const sdk = util.getSdk();

    const records = [];
    let record = await RecordBuilder.fromString('Hello world').build();
    let hash = await record.getHash();
    expect(hash).toEqual(
      'ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd'
    );
    records.push(hash);

    record = await RecordBuilder.fromBytes(
      Uint8Array.from([1, 2, 3, 4, 5])
    ).build();
    hash = await record.getHash();
    expect(hash).toEqual(
      '7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4'
    );
    records.push(hash);

    record = await RecordBuilder.fromHex('1234567890abcdef').build();
    hash = await record.getHash();
    expect(hash).toEqual(
      'ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f'
    );
    records.push(hash);

    record = await RecordBuilder.fromJson('{"hello":"world"}').build();
    hash = await record.getHash();
    expect(hash).toEqual(
      '586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312'
    );
    records.push(hash);

    record = await RecordBuilder.fromString('Hello world 2').build();
    record = await RecordBuilder.fromRecord(record).build();
    hash = await record.getHash();
    expect(hash).toEqual(
      '96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6'
    );
    records.push(hash);

    record = await RecordBuilder.fromFile(
      Uint8Array.from([2, 3, 4, 5, 6])
    ).build();
    hash = await record.getHash();
    expect(hash).toEqual(
      '507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446'
    );
    records.push(hash);

    let keys = await sdk.generateKeys();

    record = await RecordBuilder.fromString('Hello world 3')
      .withSigner(new EcsdaSigner(keys.privateKey))
      .build();

    keys = await sdk.generateKeys();

    const recordWithMultipleSignatures = await RecordBuilder.fromRecord(record)
      .withSigner(new EcsdaSigner(keys.privateKey))
      .build();

    hash = await recordWithMultipleSignatures.getHash();
    expect(hash).toEqual(
      '79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f'
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
