import { BloockClient, Network } from "../dist/index"
import { InvalidNumberOfRecords, InvalidRecordError, RecordNotFoundError } from "../src/errors"


function getSdk(): BloockClient {
    const apiKey = process.env['API_KEY'] || ''
    const apiHost = process.env['API_HOST'] || ''
    let client = new BloockClient(apiKey, apiHost)
    client.setApiHost(apiHost)
    return client
}

function randHex(len: number): string {
    const maxlen = 8
    const min = Math.pow(16, Math.min(len, maxlen) - 1)
    const max = Math.pow(16, Math.min(len, maxlen)) - 1
    const n = Math.floor(Math.random() * (max - min + 1)) + min
    let r = n.toString(16)
    while (r.length < len) {
        r = r + randHex(len - maxlen)
    }
    return r
}

describe('Acceptance Tests', () => {
    test('test_basic_e2e', async () => {
        jest.setTimeout(120000)

        const sdk = getSdk()

        const records = [await sdk.newRecordFromString(randHex(64))]

        const sendReceipt = await sdk.sendRecords(records)
        if (!sendReceipt) {
            expect(false)
            return
        }

        await sdk.waitAnchor(sendReceipt[0].anchor)

        // Retrieving record proof
        const proof = await sdk.getProof(records)
        const root = await sdk.verifyProof(proof)
        const timestamp = await sdk.validateRoot(root, Network.BLOOCK_CHAIN)
        const isValid = await sdk.verifyRecords(records)

        expect(timestamp).toBeGreaterThan(0)
        expect(isValid).toBeGreaterThan(0)
    })

    test('test_send_records_invalid_record_input_wrong_char', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aG')
        ]

        await expect(sdk.sendRecords(records)).rejects.toEqual(InvalidRecordError)
    })

    test('test_send_records_invalid_record_input_missing_chars', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa'),
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994')
        ]

        await expect(sdk.sendRecords(records)).rejects.toEqual(InvalidRecordError)
    })

    test('test_send_records_invalid_record_input_wrong_start', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa'),
            await sdk.newRecordFromHash('0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994bb')
        ]

        await expect(sdk.sendRecords(records)).rejects.toEqual(InvalidRecordError)
    })

    // test('test_send_records_invalid_record_input_string', async () => {
    //     const sdk = getSdk()
    //     const records = 'e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa'

    //     await expect(sdk.sendRecords(records as any)).rejects.toEqual(InvalidArgumentError)
    // })

    test('test_send_records_empty_record_input', async () => {
        const sdk = getSdk()

        const result = await sdk.sendRecords([])

        expect(result).toEqual([])
    })

    // test('test_get_anchor_invalid_input', async () => {
    //     const sdk = getSdk()

    //     await expect(sdk.getAnchor('anchor' as any)).rejects.toContain("TypeError")
    // })

    // test('test_wait_anchor_non_existant_anchor', async () => {
    //     const sdk = getSdk()

    //     await expect(sdk.waitAnchor(666666666666666666, 3000)).rejects.toEqual(WaitAnchorTimeoutError)
    // })

    // test('test_wait_anchor_invalid_input', async () => {
    //     const sdk = getSdk()

    //     await expect(sdk.waitAnchor('anchor' as any)).rejects.toEqual(InvalidArgumentError)
    // })

    test('test_get_proof_invalid_record_input_wrong_char', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aG')
        ]

        await expect(sdk.getProof(records)).rejects.toEqual(InvalidRecordError)
    })

    test('test_get_proof_invalid_record_input_missing_chars', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa'),
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994')
        ]

        await expect(sdk.getProof(records)).rejects.toEqual(InvalidRecordError)
    })

    test('test_get_proof_invalid_record_input_wrong_start', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa'),
            await sdk.newRecordFromHash('0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994bb')
        ]

        await expect(sdk.getProof(records)).rejects.toEqual(InvalidRecordError)
    })

    test('test_get_proof_empty_record_input', async () => {
        const sdk = getSdk()

        await expect(sdk.getProof([])).rejects.toEqual(InvalidNumberOfRecords)
    })

    test('test_get_proof_non_existant_leaf', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef')
        ]

        await expect(sdk.getProof(records)).rejects.toEqual(RecordNotFoundError)
    })

    test('test_verify_records_invalid_record_input_wrong_char', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aG')
        ]

        await expect(sdk.verifyRecords(records, Network.BLOOCK_CHAIN)).rejects.toEqual(InvalidRecordError)
    })

    test('test_verify_records_invalid_record_input_missing_chars', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa'),
            await sdk.newRecordFromHash('e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994')
        ]

        await expect(sdk.verifyRecords(records, Network.BLOOCK_CHAIN)).rejects.toEqual(InvalidRecordError)
    })

    test('test_verify_records_invalid_record_input_wrong_start', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa'),
            await sdk.newRecordFromHash('0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994bb')
        ]

        await expect(sdk.verifyRecords(records, Network.BLOOCK_CHAIN)).rejects.toEqual(InvalidRecordError)
    })

    test('test_verify_records_empty_record_input', async () => {
        const sdk = getSdk()
        await expect(sdk.verifyRecords([], Network.BLOOCK_CHAIN)).rejects.toEqual(InvalidNumberOfRecords)
    })

    test('test_verify_records_non_existant_leaf', async () => {
        const sdk = getSdk()
        const records = [
            await sdk.newRecordFromHash('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef')
        ]

        await expect(sdk.verifyRecords(records, Network.BLOOCK_CHAIN)).rejects.toEqual(RecordNotFoundError)
    })
})
