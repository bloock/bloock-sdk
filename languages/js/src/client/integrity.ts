import { BloockBridge } from "../bridge/bridge";
import { ConfigData, Network } from "../bridge/proto/config";
import { Proof } from "../entity/proof";
import { Anchor } from "../entity/anchor";
import { Record } from "../entity/record";
import { RecordReceipt } from "../entity/record_receipt";
import { NewConfigData } from "../config/config";
import {
  SendRecordsRequest,
  GetAnchorRequest,
  WaitAnchorRequest,
  GetProofRequest,
  ValidateRootRequest,
  VerifyProofRequest,
  VerifyRecordsRequest
} from "../bridge/proto/integrity";

export class IntegrityClient {
  private bridge: BloockBridge;
  private configData: ConfigData | undefined;

  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * Sends a list of Record to Bloock.
   * @param  {Record[]} records List of Record to send.
   * @returns {Promise<RecordReceipt[]>} List of RecordReceipt of each Record sent or error.
   */
  public async sendRecords(records: Record[]): Promise<RecordReceipt[]> {
    const request = SendRecordsRequest.fromPartial({
      configData: this.configData,
      records: records.map(x => x.toProto())
    });

    return this.bridge
      .getIntegrity()
      .SendRecords(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.records.map(r => RecordReceipt.fromProto(r));
      });
  }

  /**
   * Gets an specific anchor id details.
   * @param  {number} anchorId Id of the Anchor to look for.
   * @returns {Promise<Anchor>} Anchor object matching the id or error
   */
  public async getAnchor(anchorId: number): Promise<Anchor> {
    const request = GetAnchorRequest.fromPartial({
      configData: this.configData,
      anchorId: anchorId
    });

    return this.bridge
      .getIntegrity()
      .GetAnchor(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Anchor.fromProto(res.anchor!);
      });
  }

  /**
   * Waits until the anchor specified is confirmed in Bloock.
   * @param  {number} anchorId Id of the Anchor to wait for.
   * @param  {number} [timeout=120000] Timeout time in miliseconds. After exceeding this time returns an exception.
   * @returns {Promise<Anchor>} Anchor object matching the id.
   */
  public async waitAnchor(anchorId: number, timeout?: number): Promise<Anchor> {
    const request = WaitAnchorRequest.fromPartial({
      configData: this.configData,
      anchorId: anchorId,
      timeout: timeout !== null ? timeout : 120000
    });

    return this.bridge
      .getIntegrity()
      .WaitAnchor(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Anchor.fromProto(res.anchor!);
      });
  }

  /**
   * Retrieves an integrity Proof for the specified list of Record.
   * @param  {Record[]} records List of records to validate.
   * @returns {Promise<Proof>} The Proof object containing the elements necessary to verify
   * the integrity of the records in the input list. If no record was requested, then returns None.
   */
  public async getProof(records: Record[]): Promise<Proof> {
    const request = GetProofRequest.fromPartial({
      configData: this.configData,
      records: records.map(x => x.toProto())
    });

    return this.bridge
      .getIntegrity()
      .GetProof(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Proof.fromProto(res.proof!);
      });
  }

  /**
   * Validates if the root it's currently included in the blockchain.
   * @param {Record} root root to validate
   * @param {Network} network blockchain network where the record will be validated
   * @returns {Promise<number>} A number representing the timestamp in milliseconds when the anchor was registered in Blockchain
   */
  public async validateRoot(root: string, network: Network): Promise<number> {
    const request = ValidateRootRequest.fromPartial({
      configData: this.configData,
      root: root,
      network: network
    });

    return this.bridge
      .getIntegrity()
      .ValidateRoot(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.timestamp;
      });
  }

  /**
   * Verifies if the specified integrity Proof is valid.
   * @param  {Proof} proof Proof to validate.
   * @returns {Promise<Record>} Record prepared to validate in Blockchain
   * @throws {ProofException} Error when verifying the proof
   */
  public async verifyProof(proof: Proof): Promise<string> {
    const request = VerifyProofRequest.fromPartial({
      configData: this.configData,
      proof: proof.toProto()
    });

    return this.bridge
      .getIntegrity()
      .VerifyProof(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.record!;
      });
  }

  /**
   * It retrieves a proof for the specified list of Anchor using getProof and verifies it using verifyProof.
   * @param  {Record[]} records list of records to validate
   * @param  {Network} network OPTIONAL. Blockchain network where the records will be validated
   * @returns {Promise<number>} A number representing the timestamp in milliseconds when the anchor was registered in Blockchain
   */
  public async verifyRecords(
    records: Record[],
    network?: Network
  ): Promise<number> {
    const request = VerifyRecordsRequest.fromPartial({
      configData: this.configData,
      records: records.map(x => x.toProto()),
      network: network
    });

    return this.bridge
      .getIntegrity()
      .VerifyRecords(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.timestamp;
      });
  }
}