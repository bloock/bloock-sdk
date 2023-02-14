package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.bridge.proto.AvailabilityEntities;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.Record.RecordBuilderFromBytesRequest;
import com.bloock.sdk.bridge.proto.Record.RecordBuilderFromFileRequest;
import com.bloock.sdk.bridge.proto.Record.RecordBuilderFromHexRequest;
import com.bloock.sdk.bridge.proto.Record.RecordBuilderFromJSONRequest;
import com.bloock.sdk.bridge.proto.Record.RecordBuilderFromLoaderRequest;
import com.bloock.sdk.bridge.proto.Record.RecordBuilderFromRecordRequest;
import com.bloock.sdk.bridge.proto.Record.RecordBuilderFromStringRequest;
import com.bloock.sdk.bridge.proto.Record.RecordBuilderResponse;
import com.bloock.sdk.bridge.proto.RecordEntities;
import com.bloock.sdk.bridge.proto.RecordEntities.RecordTypes;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.entity.Decrypter;
import com.bloock.sdk.entity.Encrypter;
import com.bloock.sdk.entity.Record;
import com.bloock.sdk.entity.Signer;
import com.google.protobuf.ByteString;

public class RecordBuilder {
  Object payload;
  RecordTypes type;
  ConfigData configData;
  AuthenticityEntities.Signer signer;
  EncryptionEntities.Encrypter encrypter;
  EncryptionEntities.Decrypter decrypter;

  RecordBuilder(Object payload, RecordTypes type, ConfigData configData) {
    this.payload = payload;
    this.type = type;
    this.configData = configData;
  }

  public RecordBuilder withSigner(Signer signer) {
    this.signer = signer.toProto();
    return this;
  }

  public RecordBuilder withEncrypter(Encrypter encrypter) {
    this.encrypter = encrypter.toProto();
    return this;
  }

  public RecordBuilder withDecrypter(Decrypter decrypter) {
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
                  .setConfigData(this.configData)
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
                  .setConfigData(this.configData)
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
                  .setConfigData(this.configData)
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
                  .setConfigData(this.configData)
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
                  .setConfigData(this.configData)
                  .setPayload((RecordEntities.Record) this.payload);

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
                  .setConfigData(this.configData)
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
                  .setConfigData(this.configData)
                  .setLoader((AvailabilityEntities.Loader) this.payload);

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

    return Record.fromProto(response.getRecord(), this.configData);
  }
}
