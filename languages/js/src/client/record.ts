import { BloockBridge } from "../bridge/bridge";
import {
  RecordBuilderFromStringRequest,
  RecordBuilderFromJSONRequest,
  RecordBuilderFromHexRequest,
  RecordBuilderFromBytesRequest,
  RecordBuilderFromFileRequest,
  RecordBuilderFromRecordRequest,
  RecordBuilderFromLoaderRequest
} from "../bridge/proto/record";

import { Record } from "../entity/record";
import { Signer } from "../entity/authenticity";
import { Encrypter } from "../entity/encryption";
import { Decrypter } from "../entity/encryption";
import { Loader } from "../entity/availability";
import { NewConfigData } from "../config/config";
import { ConfigData } from "../bridge/proto/config";
import { RecordTypes } from "../bridge/proto/record_entities";
import { Signer as SignerProto } from "../bridge/proto/authenticity_entities";
import {
  Encrypter as EncrypterProto,
  Decrypter as DecrypterProto
} from "../bridge/proto/encryption_entities";

export class RecordClient {
  private configData: ConfigData;

  constructor(configData?: ConfigData) {
    this.configData = NewConfigData(configData);
  }

  public fromString(str: string): RecordBuilder {
    return new RecordBuilder(str, RecordTypes.STRING, this.configData);
  }

  public fromJson(json: any): RecordBuilder {
    return new RecordBuilder(
      JSON.stringify(json),
      RecordTypes.JSON,
      this.configData
    );
  }

  public fromHex(hex: string): RecordBuilder {
    return new RecordBuilder(hex, RecordTypes.HEX, this.configData);
  }

  public fromBytes(bytes: Uint8Array): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.BYTES, this.configData);
  }

  public fromFile(bytes: Uint8Array): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.FILE, this.configData);
  }

  public fromRecord(bytes: Record): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.RECORD, this.configData);
  }

  public fromLoader(loader: Loader): RecordBuilder {
    return new RecordBuilder(loader, RecordTypes.LOADER, this.configData);
  }
}

export class RecordBuilder {
  payload: any;
  payloadType!: RecordTypes;
  signer: SignerProto | undefined;
  encrypter: EncrypterProto | undefined;
  decrypter: DecrypterProto | undefined;

  configData: ConfigData;

  constructor(payload: any, payloadType: RecordTypes, configData: ConfigData) {
    this.payload = payload;
    this.payloadType = payloadType;
    this.configData = configData;
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
          configData: this.configData,
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
            return Record.fromProto(res.record!, this.configData);
          });
      }
      case RecordTypes.JSON: {
        const req = RecordBuilderFromJSONRequest.fromPartial({
          configData: this.configData,
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
            return Record.fromProto(res.record!, this.configData);
          });
      }
      case RecordTypes.HEX: {
        const req = RecordBuilderFromHexRequest.fromPartial({
          configData: this.configData,
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
            return Record.fromProto(res.record!, this.configData);
          });
      }
      case RecordTypes.BYTES: {
        const req = RecordBuilderFromBytesRequest.fromPartial({
          configData: this.configData,
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
            return Record.fromProto(res.record!, this.configData);
          });
      }
      case RecordTypes.FILE: {
        const req = RecordBuilderFromFileRequest.fromPartial({
          configData: this.configData,
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
            return Record.fromProto(res.record!, this.configData);
          });
      }
      case RecordTypes.RECORD: {
        const req = RecordBuilderFromRecordRequest.fromPartial({
          configData: this.configData,
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
            return Record.fromProto(res.record!, this.configData);
          });
      }
      case RecordTypes.LOADER: {
        const req = RecordBuilderFromLoaderRequest.fromPartial({
          configData: this.configData,
          loader: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
          decrypter: this.decrypter
        });

        return bridge
          .getRecord()
          .BuildRecordFromLoader(req)
          .then(res => {
            if (res.error) {
              throw res.error;
            }
            return Record.fromProto(res.record!, this.configData);
          });
      }
    }
    return Promise.reject(new Error("Unexpected record type"));
  }
}
