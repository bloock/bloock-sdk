package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockRecord.GetHashRequest;
import com.bloock.sdk.bridge.proto.BloockRecord.GetHashResponse;
import com.bloock.sdk.bridge.proto.BloockRecord.GetPayloadRequest;
import com.bloock.sdk.bridge.proto.BloockRecord.GetPayloadResponse;
import com.bloock.sdk.bridge.proto.BloockRecord.SetProofRequest;
import com.bloock.sdk.bridge.proto.BloockRecord.SetProofResponse;
import com.bloock.sdk.bridge.proto.BloockRecordEntities;
import com.bloock.sdk.bridge.proto.BloockShared.Error;
import com.bloock.sdk.entity.integrity.Proof;
import com.google.protobuf.ByteString;

/**
 * Represents a record with payload, hash, and configuration data.
 */
public class Record {
  byte[] payload;
  String hash;
  ConfigData configData;

  /**
   * Constructs a Record object with the specified parameters.
   * 
   * @param payload
   * @param hash
   * @param configData
   */
  Record(byte[] payload, String hash, ConfigData configData) {
    this.payload = payload;
    this.hash = hash;
    this.configData = configData;
  }

  public static Record fromProto(BloockRecordEntities.Record record, ConfigData configData) {
    return new Record(record.getPayload().toByteArray(), record.getHash(), configData);
  }

  public BloockRecordEntities.Record toProto() {
    return BloockRecordEntities.Record.newBuilder()
        .setConfigData(this.configData)
        .setPayload(ByteString.copyFrom(payload))
        .setHash(hash)
        .build();
  }

  /**
   * Retrieves the hash of the record.
   * 
   * @return
   * @throws Exception
   */
  public String getHash() throws Exception {
    Bridge bridge = new Bridge();
    GetHashRequest request = GetHashRequest.newBuilder()
        .setConfigData(this.configData)
        .setRecord(this.toProto())
        .build();
    GetHashResponse recordHash = bridge.getRecord().getHash(request);

    if (recordHash.getError() != Error.getDefaultInstance()) {
      throw new Exception(recordHash.getError().getMessage());
    }

    return recordHash.getHash();
  }

  /**
   * Retrieves the payload of the record.
   * 
   * @return
   * @throws Exception
   */
  public byte[] getPayload() throws Exception {
    Bridge bridge = new Bridge();
    GetPayloadRequest request = com.bloock.sdk.bridge.proto.BloockRecord.GetPayloadRequest.newBuilder()
        .setConfigData(this.configData)
        .setRecord(this.toProto())
        .build();
    GetPayloadResponse res = bridge.getRecord().getPayload(request);

    if (res.getError() != Error.getDefaultInstance()) {
      throw new Exception(res.getError().getMessage());
    }

    return res.getPayload().toByteArray();
  }

  /**
   * Returns the payload of the record.
   * 
   * @return
   */
  public byte[] retrieve() {
    return this.payload;
  }

  /**
   * Sets the proof for a record.
   * 
   * @param proof
   * @throws Exception
   */
  public void setProof(Proof proof) throws Exception {
    Bridge bridge = new Bridge();
    SetProofRequest request = SetProofRequest.newBuilder()
        .setProof(proof.toProto())
        .setRecord(this.toProto())
        .setConfigData(this.configData)
        .build();

    SetProofResponse response = bridge.getRecord().setProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    this.payload = response.getRecord().getPayload().toByteArray();
  }
}
