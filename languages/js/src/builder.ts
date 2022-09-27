import {BloockBridge} from './bridge/bridge';
import {
  Encrypter,
  RecordTypes,
  RecordBuilderFromStringRequest,
  RecordBuilderFromJSONRequest,
  RecordBuilderFromHexRequest,
  RecordBuilderFromBytesRequest,
  RecordBuilderFromFileRequest,
  RecordBuilderFromRecordRequest,
} from './bridge/proto/record';

import {Record} from './entity/record';
import {Signer} from './entity/signer';

export class RecordBuilder {
  payload: any;
  payloadType!: RecordTypes;
  signer: Signer | undefined;
  encrypter: Encrypter | undefined;

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

  public withSigner(signer: Signer): RecordBuilder {
    this.signer = signer;
    return this;
  }

  public withEncrypter(encrypter: Encrypter): RecordBuilder {
    this.encrypter = encrypter;
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
        });

        return new Promise((resolve, reject) => {
          bridge.getRecord().buildRecordFromString(req, (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (res.error) {
              reject(res.error.message);
              return;
            }

            resolve(Record.fromProto(res.record!));
          });
        });
      }
      case RecordTypes.JSON: {
        const req = RecordBuilderFromJSONRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
        });

        return new Promise((resolve, reject) => {
          bridge.getRecord().buildRecordFromJson(req, (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (res.error) {
              reject(res.error.message);
              return;
            }

            resolve(Record.fromProto(res.record!));
          });
        });
      }
      case RecordTypes.HEX: {
        const req = RecordBuilderFromHexRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
        });

        return new Promise((resolve, reject) => {
          bridge.getRecord().buildRecordFromHex(req, (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (res.error) {
              reject(res.error.message);
              return;
            }

            resolve(Record.fromProto(res.record!));
          });
        });
      }
      case RecordTypes.BYTES: {
        const req = RecordBuilderFromBytesRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
        });

        return new Promise((resolve, reject) => {
          bridge.getRecord().buildRecordFromBytes(req, (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (res.error) {
              reject(res.error.message);
              return;
            }

            resolve(Record.fromProto(res.record!));
          });
        });
      }
      case RecordTypes.FILE: {
        const req = RecordBuilderFromFileRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
        });

        return new Promise((resolve, reject) => {
          bridge.getRecord().buildRecordFromFile(req, (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (res.error) {
              reject(res.error.message);
              return;
            }

            resolve(Record.fromProto(res.record!));
          });
        });
      }
      case RecordTypes.RECORD: {
        const req = RecordBuilderFromRecordRequest.fromPartial({
          payload: this.payload,
          signer: this.signer,
          encrypter: this.encrypter,
        });

        return new Promise((resolve, reject) => {
          bridge.getRecord().buildRecordFromRecord(req, (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (res.error) {
              reject(res.error.message);
              return;
            }

            resolve(Record.fromProto(res.record!));
          });
        });
      }
    }
    return Promise.reject(new Error('Unexpected record type'));
  }
}
