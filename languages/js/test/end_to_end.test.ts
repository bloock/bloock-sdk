import {RecordBuilder, Network} from '../dist/index';
import * as util from './util';

describe('E2E Tests', () => {
  test('test_basic_e2e', async () => {
    const sdk = util.getSdk();

    const records = [await RecordBuilder.fromString(util.randHex(64)).build()];
    console.log('~~> ~~> ', records[0]);
    const hashes = [];
    for (const record of records) {
      hashes.push(await record.getHash());
    }
    console.log('==>==>==>==>==>==>==>', hashes);

    const sendReceipt = await sdk.sendRecords(hashes);
    if (!sendReceipt) {
      expect(false);
      return;
    }

    console.log('Waiting for anchor...');
    await new Promise(r => setTimeout(r, 110000));

    const proof = await sdk.getProof(hashes);
    console.log('PROOF: ', proof);
    console.log('PROTO PROOF: ', proof.toProto());
    const root = await sdk.verifyProof(proof);

    const timestamp = await sdk.validateRoot(root, Network.BLOOCK_CHAIN);
    console.log('----->', timestamp);
    expect(timestamp).toBeGreaterThan(0);

    // timestamp = await sdk.verifyRecords(hashes, Network.BLOOCK_CHAIN);
    // console.log("----->", timestamp);
    // expect(timestamp).toBeGreaterThan(0);
  }, 120000);
});
