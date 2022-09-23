import { RecordBuilder, Network } from "../dist/index"
import * as util from "./util"

describe('E2E Tests', () => {
    test('test_basic_e2e', async () => {
        jest.setTimeout(120000);

        const sdk = util.getSdk();

        const records = [await RecordBuilder.fromString(util.randHex(64)).build()];
        let hashes = [];
        for (let record of records) {
            hashes.push(await record.getHash());
        }

        const sendReceipt = await sdk.sendRecords(hashes);
        if (!sendReceipt) {
            expect(false);
            return;
        }

        await sdk.waitAnchor(sendReceipt[0].anchor);

        const proof = await sdk.getProof(hashes);
        const root = await sdk.verifyProof(proof);
        const timestamp = await sdk.validateRoot(root, Network.BLOOCK_CHAIN);

        expect(timestamp).toBeGreaterThan(0);
    })
});
