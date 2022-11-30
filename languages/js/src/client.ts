import { BloockBridge } from "./bridge/bridge";

import { GetAnchorRequest, WaitAnchorRequest } from "./bridge/proto/anchor";
import { Network } from "./bridge/proto/config";
import {
  GetProofRequest,
  ValidateRootRequest,
  VerifyProofRequest,
  VerifyRecordsRequest
} from "./bridge/proto/proof";
import { GenerateKeysRequest, GenerateRsaKeyPairRequest, SendRecordsRequest } from "./bridge/proto/record";
import { Proof } from "./entity/proof";
import { Anchor } from "./entity/anchor";
import { Keys, RecordReceipt, RsaKeyPair } from "./entity/record";
import { NewConfigData } from "./config/config";

export class BloockClient {
  private bridge: BloockBridge;

  constructor() {
    this.bridge = new BloockBridge();
  }

  /**
   * Sends a list of Record to Bloock.
   * @param  {Record[]} records List of Record to send.
   * @returns {Promise<RecordReceipt[]>} List of RecordReceipt of each Record sent or error.
   */
  public async sendRecords(records: string[]): Promise<RecordReceipt[]> {
    const request = SendRecordsRequest.fromPartial({
      configData: NewConfigData(),
      records: records
    });

    return this.bridge
      .getRecord()
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
      configData: NewConfigData(),
      anchorId: anchorId
    });

    return this.bridge
      .getAnchor()
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
      configData: NewConfigData(),
      anchorId: anchorId,
      timeout: timeout !== null ? timeout : 120000
    });

    return this.bridge
      .getAnchor()
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
  public async getProof(records: string[]): Promise<Proof> {
    const request = GetProofRequest.fromPartial({
      configData: NewConfigData(),
      records: records
    });

    return this.bridge
      .getProof()
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
  public async validateRoot(root: string, network?: Network): Promise<number> {
    const request = ValidateRootRequest.fromPartial({
      configData: NewConfigData(),
      root: root,
      network: network
    });

    return this.bridge
      .getProof()
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
      configData: NewConfigData(),
      proof: proof.toProto()
    });

    return this.bridge
      .getProof()
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
    records: string[],
    network?: Network
  ): Promise<number> {
    const request = VerifyRecordsRequest.fromPartial({
      configData: NewConfigData(),
      records: records,
      network: network
    });

    return this.bridge
      .getProof()
      .VerifyRecords(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.timestamp;
      });
  }

  /**
   * It generates a public and a private key
   * @returns {Promise<Keys>} An object containing both the public and the private key
   */
  public async generateKeys(): Promise<Keys> {
    let request = GenerateKeysRequest.fromPartial({});
    return this.bridge
      .getRecord()
      .GenerateKeys(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Keys.fromProto(res);
      });
  }

  /**
   * It generates a public and a private key for RSA encryption
   * @returns {Promise<RsaKeyPair>} An object containing both the public and the private key
   */
  public async generateRsaKeyPair(): Promise<RsaKeyPair> {
    let request = GenerateRsaKeyPairRequest.fromPartial({});
    return this.bridge
      .getRecord()
      .GenerateRsaKeyPair(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Keys.fromProto(res);
      });
  }
}
