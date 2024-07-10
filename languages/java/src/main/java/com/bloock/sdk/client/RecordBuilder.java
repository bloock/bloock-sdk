package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.BloockAuthenticityEntities;
import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;
import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockEncryptionEntities;
import com.bloock.sdk.bridge.proto.BloockRecord.*;
import com.bloock.sdk.bridge.proto.BloockRecordEntities;
import com.bloock.sdk.bridge.proto.BloockRecordEntities.RecordTypes;
import com.bloock.sdk.bridge.proto.BloockShared.Error;
import com.bloock.sdk.entity.authenticity.Signer;
import com.bloock.sdk.entity.encryption.Encrypter;
import com.bloock.sdk.entity.record.Record;
import com.bloock.sdk.entity.record.RecordDetails;
import com.google.protobuf.ByteString;

/**
 * Assists in constructing records with various configurations.
 */
public class RecordBuilder {
  Object payload;
  RecordTypes type;
  ConfigData configData;
  BloockAuthenticityEntities.Signer signer;
  BloockEncryptionEntities.Encrypter encrypter;
  BloockEncryptionEntities.Encrypter decrypter;

  /**
   * Creates a new RecordBuilder with default configuration.
   * 
   * @param payload
   * @param type
   * @param configData
   */
  RecordBuilder(Object payload, RecordTypes type, ConfigData configData) {
    this.payload = payload;
    this.type = type;
    this.configData = configData;
  }

  /**
   * Sets the signer for the RecordBuilder.
   * 
   * @param signer
   * @return
   */
  public RecordBuilder withSigner(Signer signer) {
    this.signer = signer.toProto();
    return this;
  }

  /**
   * Sets the encrypter for the RecordBuilder.
   * 
   * @param encrypter
   * @return
   */
  public RecordBuilder withEncrypter(Encrypter encrypter) {
    this.encrypter = encrypter.toProto();
    return this;
  }

  /**
   * Sets the decrypter for the RecordBuilder.
   * 
   * @param decrypter
   * @return
   */
  public RecordBuilder withDecrypter(Encrypter decrypter) {
    this.decrypter = decrypter.toProto();
    return this;
  }

  /**
   * Constructs a record based on the RecordBuilder's configuration.
   * 
   * @return
   * @throws Exception
   */
  public Record build() throws Exception {
    Bridge bridge = new Bridge();

    RecordBuilderResponse response;

    switch (this.type) {
      case BYTES: {
        RecordBuilderFromBytesRequest.Builder builder = RecordBuilderFromBytesRequest.newBuilder()
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
      case FILE: {
        RecordBuilderFromFileRequest.Builder builder = RecordBuilderFromFileRequest.newBuilder()
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
      case HEX: {
        RecordBuilderFromHexRequest.Builder builder = RecordBuilderFromHexRequest.newBuilder()
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
      case JSON: {
        RecordBuilderFromJSONRequest.Builder builder = RecordBuilderFromJSONRequest.newBuilder()
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
      case RECORD: {
        RecordBuilderFromRecordRequest.Builder builder = RecordBuilderFromRecordRequest.newBuilder()
            .setConfigData(this.configData)
            .setPayload((BloockRecordEntities.Record) this.payload);

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
      case STRING: {
        RecordBuilderFromStringRequest.Builder builder = RecordBuilderFromStringRequest.newBuilder()
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
      case LOADER: {
        RecordBuilderFromLoaderRequest.Builder builder = RecordBuilderFromLoaderRequest.newBuilder()
            .setConfigData(this.configData)
            .setLoader((BloockAvailabilityEntities.Loader) this.payload);

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

  /**
   * Gets details about other Bloock services (Integrity, Authenticity,
   * Encryption, Availability) configured in the RecordBuilder.
   * 
   * @return
   * @throws Exception
   */
  public RecordDetails getDetails() throws Exception {
    Bridge bridge = new Bridge();

    GetDetailsRequest.Builder builder = GetDetailsRequest.newBuilder()
        .setConfigData(this.configData)
        .setPayload(ByteString.copyFrom((byte[]) this.payload));

    GetDetailsResponse response = bridge.getRecord().getDetails(builder.build());

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return RecordDetails.fromProto(response.getDetails());
  }
}
