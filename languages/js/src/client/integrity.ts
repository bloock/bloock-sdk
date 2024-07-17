import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/bloock_config";
import {
  GetAnchorRequest,
  GetProofRequest,
  SendRecordsRequest,
  ValidateRootRequest,
  VerifyProofRequest,
  VerifyRecordsRequest,
  WaitAnchorRequest
} from "../bridge/proto/bloock_integrity";
import { NewConfigData } from "../config/config";
import { Network, Proof, RecordReceipt } from "../entity/integrity";
import { Anchor } from "../entity/integrity/anchor";
import { Record } from "../entity/record";

/**
 * Provides functionality to interact with the [Bloock Integrity service](https://dashboard.bloock.com/login).
 */
export class IntegrityClient {
  private bridge: BloockBridge;
  private configData: ConfigData | undefined;

  /**
   * Creates a new IntegrityClient with default configuration.
   * @param configData
   */
  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * Sends records to the Bloock Integrity service for certification.
   * @param records
   * @returns
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
   * Gets an anchor by its ID from the Bloock Integrity service.
   * @param anchorId
   * @returns
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
   * Waits for the completion of an anchor on the Bloock Integrity service.
   * @param anchorId
   * @param timeout
   * @returns
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
   * Gets a proof for a set of records from the Bloock Integrity service.
   * @param records
   * @returns
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
   * Validates the integrity of a merkle root proof on blockchain.
   * @param root
   * @param network
   * @returns
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
   * Verifies the integrity of a proof.
   * @param proof
   * @returns
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
   * Verifies the integrity of a set of records.
   * @param records
   * @param network
   * @returns
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
