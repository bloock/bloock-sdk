import { Network } from '.';
import { WasmClient } from './bloock_wasm_api';
import { Record } from './record';
import { Anchor } from './types/anchor';
import { NetworkConfiguration } from './types/configuration';
import { Proof } from './types/proof';
import { RecordList } from './types/record-list';
import { RecordReceipt } from './types/record-receipt';

/**
 * Entrypoint to the Bloock SDK:
 *    This SDK offers all the features available in the Bloock Toolset:
 *      * Write records
 *      * Get records proof
 *      * Validate proof
 *      * Get records details
 */
export class BloockClient {
  private ffi: WasmClient;

  /**
   * Constructor with API Key that enables accessing to Bloock's functionalities.
   * @param  {string} apiKey Client API Key.
   */
  constructor(apiKey: string) {
    this.ffi = new WasmClient(apiKey);
  }

  /**
   * Overrides the API host.
   * @param  {string} host The API host to apply
   * @returns {void}
   */
  public setApiHost(host: string): void {
    return this.ffi.setAPIHost(host);
  }
  /**
   * Overrides the Network configuration.
   * @param  {string} host The API host to apply
   * @returns {void}
   */
  public setNetworkConfiguration(
    network: Network,
    configuration: NetworkConfiguration
  ): void {
    return this.ffi.setNetworkConfiguration(network, configuration.toWasm());
  }
  /**
   * Sends a list of Record to Bloock.
   * @param  {Record[]} records List of Record to send.
   * @returns {Promise<RecordReceipt[]>} List of RecordReceipt of each Record sent.
   * @throws {InvalidRecordException} At least one of the records sent was not well formed.
   * @throws {HttpRequestException} Error return by Bloock's API.
   */
  public async sendRecords(records: Record[]): Promise<RecordReceipt[]> {
    return this.ffi.sendRecords(RecordList.toWasm(records));
  }
  // /**
  //  * Retrieves all RecordReceipt for the specified Anchor.
  //  * @param  {Record[]} records List of Record to fetch.
  //  * @returns {Promise<RecordReceipt[]>} List with the RecordReceipt of each record requested.
  //  * @throws {InvalidRecordException} At least one of the records sent was not well formed.
  //  * @throws {HttpRequestException} Error return by Bloock's API.
  //  */
  // public async getRecords(records: Record[]): Promise<RecordReceipt[]> {
  //   return this.ffi.getRecords(RecordList.toWasm(records));
  // }
  /**
   * Gets an specific anchor id details.
   * @param  {number} anchor Id of the Anchor to look for.
   * @returns {Promise<Anchor>} Anchor object matching the id.
   * @throws {InvalidArgumentException} Informs that the input is not a number.
   * @throws {HttpRequestException} Error return by Bloock's API.
   */
  public async getAnchor(anchor: number): Promise<Anchor> {
    return this.ffi.getAnchor(BigInt(anchor));
  }
  /**
   * Waits until the anchor specified is confirmed in Bloock.
   * @param  {number} anchor Id of the Anchor to wait for.
   * @param  {number} [timeout=120000] Timeout time in miliseconds. After exceeding this time returns an exception.
   * @returns {Promise<Anchor>} Anchor object matching the id.
   * @throws {InvalidArgumentException} Informs that the input is not a number.
   * @throws {AnchorNotFoundException} The anchor provided could not be found.
   * @throws {WaitAnchorTimeoutException} Returned when the function has exceeded the timeout.
   * @throws {HttpRequestException} Error return by Bloock's API.
   */
  public async waitAnchor(anchor: number, timeout?: number): Promise<Anchor> {
    return this.ffi.waitAnchor(
      BigInt(anchor),
      timeout ? BigInt(timeout) : BigInt(0)
    );
  }
  // /**
  //  * Retrieves an integrity Proof for the specified list of Record.
  //  * @param  {Record[]} records List of records to validate.
  //  * @returns {Promise<Proof>} The Proof object containing the elements necessary to verify
  //  *          the integrity of the records in the input list. If no record was requested, then returns None.
  //  * @throws {InvalidRecordException} At least one of the records sent was not well formed.
  //  * @throws {HttpRequestException} Error return by Bloock's API.
  //  */
  // public async getProof(records: Record[]): Promise<Proof> {
  //   return this.ffi.getProof(RecordList.toWasm(records));
  // }

  // /**
  //  * Validates if the root it's currently included in the blockchain.
  //  * @param {Record} root root to validate
  //  * @param {Network} network blockchain network where the record will be validated
  //  * @returns {Promise<number>} A number representing the timestamp in milliseconds when the anchor was registered in Blockchain
  //  * @throws {Web3Exception} Error connecting to blockchain.
  //  */
  // public async validateRoot(root: Record, network: Network): Promise<number> {
  //   return this.ffi.verifyRoot(root.toWasm(), network);
  // }

  // /**
  //  * Verifies if the specified integrity Proof is valid.
  //  * @param  {Proof} proof Proof to validate.
  //  * @returns {Promise<Record>} Record prepared to validate in Blockchain
  //  * @throws {ProofException} Error when verifying the proof
  //  */
  // public async verifyProof(proof: Proof): Promise<Record> {
  //   return this.ffi.verifyProof(proof.toWasm());
  // }
  // /**
  //  * It retrieves a proof for the specified list of Anchor using getProof and verifies it using verifyProof.
  //  * @param  {Record[]} records list of records to validate
  //  * @param  {Network} network OPTIONAL. Blockchain network where the records will be validated
  //  * @returns {Promise<number>} A number representing the timestamp in milliseconds when the anchor was registered in Blockchain
  //  * @throws {InvalidArgumentException} Informs that the input is not a number.
  //  * @throws {HttpRequestException} Error return by Bloock's API.
  //  * @throws {Web3Exception} Error connecting to blockchain.
  //  */
  // public async verifyRecords(records: Record[]): Promise<number> {
  //   return this.ffi.verifyRecords(RecordList.toWasm(records));
  // }

  // /**
  //  * Verifies if the specified integrity Proof is valid.
  //  *
  //  * @param  {Proof} Proof to validate.
  //  * @return {Record} Integrity proof's root record.
  //  * @throws {ProofNotFoundException} Proof not found.
  //  */
  // public async verifySignatures(records: Record[]): Promise<boolean> {
  //   return this.ffi.verifySignatures(RecordList.toWasm(records));
  // }
}
