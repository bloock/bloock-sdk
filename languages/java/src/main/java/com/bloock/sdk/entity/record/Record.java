package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Record.GetHashRequest;
import com.bloock.sdk.bridge.proto.Record.GetHashResponse;
import com.bloock.sdk.bridge.proto.Record.GetPayloadRequest;
import com.bloock.sdk.bridge.proto.Record.GetPayloadResponse;
import com.bloock.sdk.bridge.proto.Record.SetProofRequest;
import com.bloock.sdk.bridge.proto.Record.SetProofResponse;
import com.bloock.sdk.bridge.proto.RecordEntities;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.entity.integrity.Proof;
import com.google.protobuf.ByteString;

public class Record {
  byte[] payload;
  String hash;
  ConfigData configData;

  Record(byte[] payload, String hash, ConfigData configData) {
    this.payload = payload;
    this.hash = hash;
    this.configData = configData;
  }

  public static Record fromProto(RecordEntities.Record record, ConfigData configData) {
    return new Record(record.getPayload().toByteArray(), record.getHash(), configData);
  }

  public RecordEntities.Record toProto() {
    return RecordEntities.Record.newBuilder()
        .setConfigData(this.configData)
        .setPayload(ByteString.copyFrom(payload))
        .setHash(hash)
        .build();
  }

  public String getHash() throws Exception {
    Bridge bridge = new Bridge();
    GetHashRequest request =
        GetHashRequest.newBuilder()
            .setConfigData(this.configData)
            .setRecord(this.toProto())
            .build();
    GetHashResponse recordHash = bridge.getRecord().getHash(request);

    if (recordHash.getError() != Error.getDefaultInstance()) {
      throw new Exception(recordHash.getError().getMessage());
    }

    return recordHash.getHash();
  }

  public byte[] getPayload() throws Exception {
    Bridge bridge = new Bridge();
    GetPayloadRequest request =
        com.bloock.sdk.bridge.proto.Record.GetPayloadRequest.newBuilder()
            .setConfigData(this.configData)
            .setRecord(this.toProto())
            .build();
    GetPayloadResponse res = bridge.getRecord().getPayload(request);

    if (res.getError() != Error.getDefaultInstance()) {
      throw new Exception(res.getError().getMessage());
    }

    return res.getPayload().toByteArray();
  }

  public byte[] retrieve() {
    return this.payload;
  }

  public void setProof(Proof proof) throws Exception {
    Bridge bridge = new Bridge();
    SetProofRequest request =
        SetProofRequest.newBuilder()
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
