package com.bloock.sdk.builder;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordBuilderFromBytesRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordBuilderFromFileRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordBuilderFromHexRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordBuilderFromJSONRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordBuilderFromLoaderRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordBuilderFromRecordRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordBuilderFromStringRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordBuilderResponse;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordTypes;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.Decrypter;
import com.bloock.sdk.entity.Encrypter;
import com.bloock.sdk.entity.Loader;
import com.bloock.sdk.entity.Record;
import com.bloock.sdk.entity.Signer;
import com.google.protobuf.ByteString;

public class Builder {
  Object payload;
  RecordTypes type;
  RecordOuterClass.Signer signer;
  RecordOuterClass.Encrypter encrypter;
  RecordOuterClass.Decrypter decrypter;

  Builder(Object payload, RecordTypes type) {
    this.payload = payload;
    this.type = type;
  }

  public static Builder fromRecord(Record record) {
    return new Builder(record.toProto(), RecordTypes.RECORD);
  }

  public static Builder fromString(String str) {
    return new Builder(str, RecordTypes.STRING);
  }

  public static Builder fromHex(String str) {
    return new Builder(str, RecordTypes.HEX);
  }

  public static Builder fromJson(String json) {
    return new Builder(json, RecordTypes.JSON);
  }

  public static Builder fromFile(byte[] file) {
    return new Builder(file, RecordTypes.FILE);
  }

  public static Builder fromBytes(byte[] bytes) {
    return new Builder(bytes, RecordTypes.BYTES);
  }

  public static Builder fromLoader(Loader loader) {
    return new Builder(loader.toProto(), RecordTypes.LOADER);
  }

  public Builder withSigner(Signer signer) {
    this.signer = signer.toProto();
    return this;
  }

  public Builder withEncrypter(Encrypter encrypter) {
    this.encrypter = encrypter.toProto();
    return this;
  }

  public Builder withDecrypter(Decrypter decrypter) {
    this.decrypter = decrypter.toProto();
    return this;
  }

  public Record build() throws Exception {
    Bridge bridge = new Bridge();

    RecordBuilderResponse response;

    switch (this.type) {
      case BYTES:
        {
          RecordBuilderFromBytesRequest.Builder builder =
              RecordBuilderFromBytesRequest.newBuilder()
                  .setConfigData(Config.newConfigData())
                  .setPayload(ByteString.copyFrom((byte[]) this.payload));

          if (this.signer != null) {
            builder.setSigner(this.signer);
          }
          if (this.encrypter != null) {
            builder.setEncrypter(this.encrypter);
          }
          if (this.decrypter != null) {
            builder.setDecrypter(this.decrypter);
          }

          response = bridge.getRecord().buildRecordFromBytes(builder.build());
          break;
        }
      case FILE:
        {
          RecordBuilderFromFileRequest.Builder builder =
              RecordBuilderFromFileRequest.newBuilder()
                  .setConfigData(Config.newConfigData())
                  .setPayload(ByteString.copyFrom((byte[]) this.payload));

          if (this.signer != null) {
            builder.setSigner(this.signer);
          }
          if (this.encrypter != null) {
            builder.setEncrypter(this.encrypter);
          }
          if (this.decrypter != null) {
            builder.setDecrypter(this.decrypter);
          }

          response = bridge.getRecord().buildRecordFromFile(builder.build());
          break;
        }
      case HEX:
        {
          RecordBuilderFromHexRequest.Builder builder =
              RecordBuilderFromHexRequest.newBuilder()
                  .setConfigData(Config.newConfigData())
                  .setPayload((String) this.payload);

          if (this.signer != null) {
            builder.setSigner(this.signer);
          }
          if (this.encrypter != null) {
            builder.setEncrypter(this.encrypter);
          }
          if (this.decrypter != null) {
            builder.setDecrypter(this.decrypter);
          }

          response = bridge.getRecord().buildRecordFromHex(builder.build());
          break;
        }
      case JSON:
        {
          RecordBuilderFromJSONRequest.Builder builder =
              RecordBuilderFromJSONRequest.newBuilder()
                  .setConfigData(Config.newConfigData())
                  .setPayload((String) this.payload);

          if (this.signer != null) {
            builder.setSigner(this.signer);
          }
          if (this.encrypter != null) {
            builder.setEncrypter(this.encrypter);
          }
          if (this.decrypter != null) {
            builder.setDecrypter(this.decrypter);
          }

          response = bridge.getRecord().buildRecordFromJson(builder.build());
          break;
        }
      case RECORD:
        {
          RecordBuilderFromRecordRequest.Builder builder =
              RecordBuilderFromRecordRequest.newBuilder()
                  .setConfigData(Config.newConfigData())
                  .setPayload((RecordOuterClass.Record) this.payload);

          if (this.signer != null) {
            builder.setSigner(this.signer);
          }
          if (this.encrypter != null) {
            builder.setEncrypter(this.encrypter);
          }
          if (this.decrypter != null) {
            builder.setDecrypter(this.decrypter);
          }

          response = bridge.getRecord().buildRecordFromRecord(builder.build());
          break;
        }
      case STRING:
        {
          RecordBuilderFromStringRequest.Builder builder =
              RecordBuilderFromStringRequest.newBuilder()
                  .setConfigData(Config.newConfigData())
                  .setPayload((String) this.payload);

          if (this.signer != null) {
            builder.setSigner(this.signer);
          }
          if (this.encrypter != null) {
            builder.setEncrypter(this.encrypter);
          }
          if (this.decrypter != null) {
            builder.setDecrypter(this.decrypter);
          }

          response = bridge.getRecord().buildRecordFromString(builder.build());
          break;
        }
      case LOADER:
        {
          RecordBuilderFromLoaderRequest.Builder builder =
              RecordBuilderFromLoaderRequest.newBuilder()
                  .setConfigData(Config.newConfigData())
                  .setLoader((RecordOuterClass.Loader) this.payload);

          if (this.signer != null) {
            builder.setSigner(this.signer);
          }
          if (this.encrypter != null) {
            builder.setEncrypter(this.encrypter);
          }
          if (this.decrypter != null) {
            builder.setDecrypter(this.decrypter);
          }

          response = bridge.getRecord().buildRecordFromLoader(builder.build());
          break;
        }
      default:
        throw new Exception("Invalid type");
    }

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Record.fromProto(response.getRecord());
  }
}
