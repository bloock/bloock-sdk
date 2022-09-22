test.skip("Skip for the moment", () => {});
// import { BloockClient, Anchor, Network, RecordReceipt, Record } from "../dist/index"
//
// function getSdk(): BloockClient {
//     const apiKey = process.env['API_KEY'] || ''
//     const apiHost = process.env['API_HOST'] || 'https://api.bloock.dev'
//     let client = new BloockClient(apiKey, apiHost)
//     client.setApiHost(apiHost)
//     return client
// }
//
// describe('Functional Tests', () => {
//
//     test('testSendRecord', async () => {
//         jest.setTimeout(120000)
//
//         const sdk = getSdk()
//
//         const records = [
//             await Record.FromString('Example Data 1'),
//             await Record.FromString('Example Data 2'),
//             await Record.FromString('Example Data 3')
//         ]
//
//         const sendReceipt = await sdk.sendRecords(records)
//         expect(Array.isArray(sendReceipt)).toBeTruthy()
//         expect(sendReceipt[0]).toBeInstanceOf(RecordReceipt)
//         expect(sendReceipt[0].anchor).toBeGreaterThan(0)
//         expect(sendReceipt[0].client.length).toBeGreaterThan(0)
//         expect(sendReceipt[0].record).toEqual(records[0].hash)
//         expect(sendReceipt[0].status).toEqual('Pending')
//     })
//
//     test('testWaitAnchor', async () => {
//         jest.setTimeout(120000)
//
//         const sdk = getSdk()
//
//         const records = [
//             await Record.FromString('Example Data 4'),
//             await Record.FromString('Example Data 5'),
//             await Record.FromString('Example Data 6')
//         ]
//
//         const sendReceipt = await sdk.sendRecords(records)
//         expect(sendReceipt).toBeDefined()
//         expect(Array.isArray(sendReceipt)).toBeTruthy()
//         expect(sendReceipt[0]).toBeInstanceOf(RecordReceipt)
//
//         let receipt = await sdk.waitAnchor(sendReceipt[0].anchor)
//         expect(receipt).toBeDefined()
//         expect(receipt).toBeInstanceOf(Anchor)
//         expect(receipt.id).toBeGreaterThan(0)
//         expect(receipt.blockRoots.length).toBeGreaterThan(0)
//         expect(receipt.networks.length).toBeGreaterThan(0)
//         expect(receipt.root.length).toBeGreaterThan(0)
//         expect(receipt.status.length).toBeGreaterThan(0)
//     })
//
//     test('testGetAnchor', async () => {
//         jest.setTimeout(120000)
//
//         const sdk = getSdk()
//
//         const records = [
//             await Record.FromString('Example Data 7'),
//             await Record.FromString('Example Data 8'),
//             await Record.FromString('Example Data 9')
//         ]
//
//         const sendReceipt = await sdk.sendRecords(records)
//
//         if (!sendReceipt) {
//             expect(false)
//             return
//         }
//
//         const anchor = await sdk.waitAnchor(sendReceipt[0].anchor)
//
//         let anchorResp = await sdk.getAnchor(anchor.id)
//         expect(anchorResp.status).toBe("Success")
//     })
//
//     test('testGetProof', async () => {
//         jest.setTimeout(120000)
//
//         const sdk = getSdk()
//
//         const records = [
//             await Record.FromString('Example Data 4'),
//             await Record.FromString('Example Data 5'),
//             await Record.FromString('Example Data 6')
//         ]
//
//         let proof = await sdk.getProof(records)
//         expect(proof).toBeDefined()
//     })
//
//     test('testVerifyProof & testValidateProof', async () => {
//         jest.setTimeout(120000)
//
//         const sdk = getSdk()
//
//         const records = [
//             await Record.FromString('Example Data 4'),
//             await Record.FromString('Example Data 5'),
//             await Record.FromString('Example Data 6')
//         ]
//
//         let proof = await sdk.getProof(records)
//         expect(proof).toBeDefined()
//
//         let root = await sdk.verifyProof(proof)
//         expect(root).toBeDefined()
//
//         let timestamp = await sdk.validateRoot(root, Network.BLOOCK_CHAIN)
//         expect(timestamp).toBeGreaterThan(0)
//     })
// })
