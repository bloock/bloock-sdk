import { BloockBridge } from "./bridge/bridge";
import {
  RecordTypes,
  RecordBuilderFromStringRequest,
  RecordBuilderFromJSONRequest,
  RecordBuilderFromHexRequest,
  RecordBuilderFromBytesRequest,
  RecordBuilderFromFileRequest,
  RecordBuilderFromRecordRequest,
  RecordBuilderFromRawRequest,
  Signer as SignerProto,
  Encrypter as EncrypterProto,
  Decrypter as DecrypterProto
} from "./bridge/proto/record";

import { Record } from "./entity/record";
import { Signer } from "./entity/signer";
import { Encrypter } from "./entity/encrypter";
import { Decrypter } from "./entity/decrypter";

export class RecordBuilder {
  payload: any;
  payloadType!: RecordTypes;
  signer: SignerProto | undefined;
  encrypter: EncrypterProto | undefined;
  decrypter: DecrypterProto | undefined;

  private constructor(payload: any, payloadType: RecordTypes) {
    this.payload = payload;
    this.payloadType = payloadType;
  }

  public static fromString(str: string): RecordBuilder {
    return new RecordBuilder(str, RecordTypes.STRING);
  }

  public static fromJson(json: string): RecordBuilder {
    return new RecordBuilder(json, RecordTypes.JSON);
  }

  public static fromHex(hex: string): RecordBuilder {
    return new RecordBuilder(hex, RecordTypes.HEX);
  }

  public static fromBytes(bytes: Uint8Array): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.BYTES);
  }

  public static fromFile(bytes: Uint8Array): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.FILE);
  }

  public static fromRecord(bytes: Record): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.RECORD);
  }

  public static fromRaw(raw: string): RecordBuilder {
    return new RecordBuilder(raw, RecordTypes.RAW);
  }

  public withSigner(signer: Signer): RecordBuilder {
    this.signer = signer.toProto();
    return this;
  }

  public withEncrypter(encrypter: Encrypter): RecordBuilder {
    this.encrypter = encrypter.toProto();
    return this;
  }

  public withDecrypter(decrypter: Decrypter): RecordBuilder {
    this.decrypter = decrypter.toProto();
    return this;
  }

  async build(): Promise<Record> {
    const bridge = new BloockBridge();
    switch (this.payloadType) {
      case RecordTypes.STRING: {
        const req = RecordBuilderFromStringRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
          decrypter: this.decrypter
        });

        return bridge
          .getRecord()
          .BuildRecordFromString(req)
          .then(res => {
            if (res.error) {
              throw res.error;
            }
            return Record.fromProto(res.record!);
          });
      }
      case RecordTypes.JSON: {
        const req = RecordBuilderFromJSONRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
          decrypter: this.decrypter
        });

        return bridge
          .getRecord()
          .BuildRecordFromJson(req)
          .then(res => {
            if (res.error) {
              throw res.error;
            }
            return Record.fromProto(res.record!);
          });
      }
      case RecordTypes.HEX: {
        const req = RecordBuilderFromHexRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
          decrypter: this.decrypter
        });

        return bridge
          .getRecord()
          .BuildRecordFromHex(req)
          .then(res => {
            if (res.error) {
              throw res.error;
            }
            return Record.fromProto(res.record!);
          });
      }
      case RecordTypes.BYTES: {
        const req = RecordBuilderFromBytesRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
          decrypter: this.decrypter
        });

        return bridge
          .getRecord()
          .BuildRecordFromBytes(req)
          .then(res => {
            if (res.error) {
              throw res.error;
            }
            return Record.fromProto(res.record!);
          });
      }
      case RecordTypes.FILE: {
        const req = RecordBuilderFromFileRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
          decrypter: this.decrypter
        });

        return bridge
          .getRecord()
          .BuildRecordFromFile(req)
          .then(res => {
            if (res.error) {
              throw res.error;
            }
            return Record.fromProto(res.record!);
          });
      }
      case RecordTypes.RECORD: {
        const req = RecordBuilderFromRecordRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
          decrypter: this.decrypter
        });

        return bridge
          .getRecord()
          .BuildRecordFromRecord(req)
          .then(res => {
            if (res.error) {
              throw res.error;
            }
            return Record.fromProto(res.record!);
          });
      }
      case RecordTypes.RAW: {
        const req = RecordBuilderFromRawRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
          decrypter: this.decrypter
        });

        return bridge
          .getRecord()
          .BuildRecordFromRaw(req)
          .then(res => {
            if (res.error) {
              throw res.error;
            }
            return Record.fromProto(res.record!);
          });
      }
    }
    return Promise.reject(new Error("Unexpected record type"));
  }
}
