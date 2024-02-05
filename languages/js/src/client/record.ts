import { BloockBridge } from "../bridge/bridge";
import {
  RecordBuilderFromStringRequest,
  RecordBuilderFromJSONRequest,
  RecordBuilderFromHexRequest,
  RecordBuilderFromBytesRequest,
  RecordBuilderFromFileRequest,
  RecordBuilderFromRecordRequest,
  RecordBuilderFromLoaderRequest,
  GetDetailsRequest
} from "../bridge/proto/record";
import { Record } from "../entity/record";
import { Signer } from "../entity/authenticity";
import { Encrypter } from "../entity/encryption";
import { Loader } from "../entity/availability";
import { NewConfigData } from "../config/config";
import { ConfigData } from "../bridge/proto/config";
import { RecordTypes } from "../bridge/proto/record_entities";
import { Signer as SignerProto } from "../bridge/proto/authenticity_entities";
import { Encrypter as EncrypterProto } from "../bridge/proto/encryption_entities";
import { RecordDetails } from "../entity/record/record-details";

/**
 * Provides functionality for creating records using various data sources and to interact with the [Bloock Record service](https://dashboard.bloock.com/login).
 */
export class RecordClient {
  private configData: ConfigData;

  /**
   * Creates a new RecordClient with default configuration.
   * @param configData 
   */
  constructor(configData?: ConfigData) {
    this.configData = NewConfigData(configData);
  }

  /**
   * Creates a RecordBuilder from a string payload.
   * @param str 
   * @returns 
   */
  public fromString(str: string): RecordBuilder {
    return new RecordBuilder(str, RecordTypes.STRING, this.configData);
  }

  /**
   * Creates a RecordBuilder from a JSON string payload.
   * @param json 
   * @returns 
   */
  public fromJson(json: any): RecordBuilder {
    return new RecordBuilder(
      JSON.stringify(json),
      RecordTypes.JSON,
      this.configData
    );
  }

  /**
   * Creates a RecordBuilder from a hexadecimal string payload.
   * @param hex 
   * @returns 
   */
  public fromHex(hex: string): RecordBuilder {
    return new RecordBuilder(hex, RecordTypes.HEX, this.configData);
  }

  /**
   * Creates a RecordBuilder from a byte slice payload.
   * @param bytes 
   * @returns 
   */
  public fromBytes(bytes: Uint8Array): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.BYTES, this.configData);
  }

  /**
   * Creates a RecordBuilder from a byte slice representing a file.
   * @param bytes 
   * @returns 
   */
  public fromFile(bytes: Uint8Array): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.FILE, this.configData);
  }

  /**
   * Creates a RecordBuilder from an existing record.
   * @param bytes 
   * @returns 
   */
  public fromRecord(bytes: Record): RecordBuilder {
    return new RecordBuilder(bytes, RecordTypes.RECORD, this.configData);
  }

  /**
   * Creates a RecordBuilder from a data loader.
   * @param loader 
   * @returns 
   */
  public fromLoader(loader: Loader): RecordBuilder {
    return new RecordBuilder(loader, RecordTypes.LOADER, this.configData);
  }
}

/**
 * Assists in constructing records with various configurations.
 */
export class RecordBuilder {
  payload: any;
  payloadType!: RecordTypes;
  signer: SignerProto | undefined;
  encrypter: EncrypterProto | undefined;
  decrypter: EncrypterProto | undefined;

  configData: ConfigData;

  /**
   * Creates a new RecordBuilder with default configuration.
   * @param payload 
   * @param payloadType 
   * @param configData 
   */
  constructor(payload: any, payloadType: RecordTypes, configData: ConfigData) {
    this.payload = payload;
    this.payloadType = payloadType;
    this.configData = configData;
  }

  /**
   * Sets the signer for the RecordBuilder.
   * @param signer 
   * @returns 
   */
  public withSigner(signer: Signer): RecordBuilder {
    this.signer = signer.toProto();
    return this;
  }

  /**
   * Sets the encrypter for the RecordBuilder.
   * @param encrypter 
   * @returns 
   */
  public withEncrypter(encrypter: Encrypter): RecordBuilder {
    this.encrypter = encrypter.toProto();
    return this;
  }

  /**
   * Sets the decrypter for the RecordBuilder.
   * @param decrypter 
   * @returns 
   */
  public withDecrypter(decrypter: Encrypter): RecordBuilder {
    this.decrypter = decrypter.toProto();
    return this;
  }

  /**
   * Constructs a record based on the RecordBuilder's configuration.
   * @returns 
   */
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

  /**
   * Gets details about other Bloock services (Integrity, Authenticity, Encryption, Availability) configured in the RecordBuilder.
   * @returns 
   */
  async getDetails(): Promise<RecordDetails> {
    const bridge = new BloockBridge();
    const req = GetDetailsRequest.fromPartial({
      configData: this.configData,
      payload: this.payload
    });

    return bridge
      .getRecord()
      .GetDetails(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return RecordDetails.fromProto(res.details!);
      });
  }
}
