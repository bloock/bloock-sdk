import { BloockBridge } from "./bridge/bridge";

import { GetAnchorRequest, WaitAnchorRequest } from "./bridge/proto/anchor";
import { Network } from "./bridge/proto/config";
import {
  GetProofRequest,
  ValidateRootRequest,
  VerifyProofRequest,
  VerifyRecordsRequest
} from "./bridge/proto/proof";
import {
  GenerateEciesKeyPairRequest,
  GenerateKeysRequest,
  GenerateRsaKeyPairRequest,
  SendRecordsRequest
} from "./bridge/proto/record";
import { Proof } from "./entity/proof";
import { Anchor } from "./entity/anchor";
import {
  Record,
  EcdsaKeyPair,
  EciesKeyPair,
  KeyPair,
  RecordReceipt,
  RsaKeyPair
} from "./entity/record";
import { NewConfigData } from "./config/config";
import { VerifyWebhookSignatureRequest } from "./bridge/proto/webhook";

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
  public async sendRecords(records: Record[]): Promise<RecordReceipt[]> {
    const request = SendRecordsRequest.fromPartial({
      configData: NewConfigData(),
      records: records.map(x => x.toProto())
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
  public async getProof(records: Record[]): Promise<Proof> {
    const request = GetProofRequest.fromPartial({
      configData: NewConfigData(),
      records: records.map(x => x.toProto())
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
  public async validateRoot(root: string, network: Network): Promise<number> {
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
    records: Record[],
    network?: Network
  ): Promise<number> {
    const request = VerifyRecordsRequest.fromPartial({
      configData: NewConfigData(),
      records: records.map(x => x.toProto()),
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
   * @returns {Promise<KeyPair>} An object containing both the public and the private key
   */
  public async generateKeys(): Promise<KeyPair> {
    let request = GenerateKeysRequest.fromPartial({
      configData: NewConfigData()
    });

    return this.bridge
      .getRecord()
      .GenerateKeys(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return EcdsaKeyPair.fromProto(res);
      });
  }

  /**
   * It generates a public and a private key for RSA encryption
   * @returns {Promise<KeyPair>} An object containing both the public and the private key
   */
  public async generateRsaKeyPair(): Promise<KeyPair> {
    let request = GenerateRsaKeyPairRequest.fromPartial({
      configData: NewConfigData()
    });

    return this.bridge
      .getRecord()
      .GenerateRsaKeyPair(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return RsaKeyPair.fromProto(res);
      });
  }

  /**
   * It generates a public and a private key for ECIES encryption
   * @returns {Promise<KeyPair>} An object containing both the public and the private key
   */
  public async generateEciesKeyPair(): Promise<KeyPair> {
    let request = GenerateEciesKeyPairRequest.fromPartial({
      configData: NewConfigData()
    });

    return this.bridge
      .getRecord()
      .GenerateEciesKeyPair(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return EciesKeyPair.fromProto(res);
      });
  }

  /**
   * It retrieves a proof for the specified list of Anchor using getProof and verifies it using verifyProof.
   * @param  {Uint8Array} payload: The webhook JSON in bytes
   * @param  {string} header: The signature header
   * @param  {string} secretKey: The secret Key
   * @param  {boolean} enforceTolerance: Weather to check for expiration of the signature
   * @returns {Promise<boolean>} A boolean indicating weather the signature is valid or not
   */
  public async verifyWebhookSignature(
    payload: Uint8Array,
    header: string,
    secretKey: string,
    enforceTolerance: boolean
  ): Promise<boolean> {
    const request = VerifyWebhookSignatureRequest.fromPartial({
      configData: NewConfigData(),
      payload: payload,
      header: header,
      secretKey: secretKey,
      enforceTolerance: enforceTolerance
    });

    return this.bridge
      .getWebhook()
      .VerifyWebhookSignature(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.isValid;
      });
  }
}
