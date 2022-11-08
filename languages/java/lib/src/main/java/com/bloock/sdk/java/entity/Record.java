package com.bloock.sdk.java.entity;

import com.bloock.sdk.java.bridge.Bridge;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass.PublishRequest;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass.PublishResponse;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass.RecordHash;
import com.bloock.sdk.java.bridge.proto.Shared.Error;
import com.bloock.sdk.java.config.Config;
import com.google.protobuf.ByteString;

public class Record {
  byte[] payload;

  Record(byte[] payload) {
    this.payload = payload;
  }

  public static Record fromProto(RecordOuterClass.Record record) {
    return new Record(record.getPayload().toByteArray());
  }

  public RecordOuterClass.Record toProto() {
    return RecordOuterClass.Record.newBuilder().setPayload(ByteString.copyFrom(payload)).build();
  }

  public String getHash() throws Exception {
    Bridge bridge = new Bridge();
    RecordHash recordHash = bridge.getRecord().getHash(this.toProto());

    if (recordHash.getError() != Error.getDefaultInstance()) {
      throw new Exception(recordHash.getError().toString());
    }

    return recordHash.getHash();
  }

  public byte[] getPayload() {
    return payload;
  }

  public String publish(Publisher publisher) throws Exception {
    Bridge bridge = new Bridge();
    PublishRequest req =
        PublishRequest.newBuilder()
            .setConfigData(Config.newConfigData())
            .setRecord(this.toProto())
            .build();

    PublishResponse response = bridge.getRecord().publish(req);
    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().toString());
    }

    return response.getHash();
  }
}
