import { BloockBridge } from "../../bridge/bridge";
import * as proto from "../../bridge/proto/record_entities";
import {
  GetHashRequest,
  GetPayloadRequest,
  SetProofRequest
} from "../../bridge/proto/record";
import { ConfigData } from "../../bridge/proto/config";
import { Proof } from "../integrity";

export class Record {
  payload: Uint8Array;
  hash: string;
  configData: ConfigData;

  constructor(payload: Uint8Array, hash: string, configData: ConfigData) {
    this.payload = payload;
    this.hash = hash;
    this.configData = configData;
  }

  static fromProto(r: proto.Record, configData: ConfigData) {
    return new Record(r.payload, r.hash, configData);
  }

  toProto(): proto.Record {
    return proto.Record.fromPartial({
      configData: this.configData,
      payload: this.payload,
      hash: this.hash
    });
  }

  async getHash(): Promise<string> {
    const bridge = new BloockBridge();
    return bridge
      .getRecord()
      .GetHash(
        GetHashRequest.fromPartial({
          configData: this.configData,
          record: this.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.hash;
      });
  }

  async getPayload(): Promise<Uint8Array> {
    const bridge = new BloockBridge();
    return bridge
      .getRecord()
      .GetPayload(
        GetPayloadRequest.fromPartial({
          configData: this.configData,
          record: this.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.payload;
      });
  }

  public retrieve(): Uint8Array {
    return this.payload;
  }

  async setProof(proof: Proof) {
    const bridge = new BloockBridge();

    const req = SetProofRequest.fromPartial({
      configData: this.configData,
      record: this.toProto(),
      proof: proof.toProto()
    });

    return bridge
      .getRecord()
      .SetProof(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        this.payload = res.record?.payload!;
      });
  }
}

export class RecordHeader {
  ty: string;
  constructor(ty: string) {
    this.ty = ty;
  }

  static fromProto(recordHeader: proto.RecordHeader): RecordHeader {
    return new RecordHeader(recordHeader.ty);
  }

  toProto(): proto.RecordHeader {
    return proto.RecordHeader.fromPartial({ ty: this.ty });
  }
}
