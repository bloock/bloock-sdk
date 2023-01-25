package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.ProofOuterClass.SetProofRequest;
import com.bloock.sdk.bridge.proto.ProofOuterClass.SetProofResponse;
import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.PublishRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.PublishResponse;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordHash;
import com.bloock.sdk.bridge.proto.RecordOuterClass.RecordSignatures;
import com.bloock.sdk.bridge.proto.RecordOuterClass.EncryptionAlgResponse;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.google.protobuf.ByteString;
import java.util.List;
import java.util.stream.Collectors;

public class Record {
  byte[] payload;
  String hash;

  Record(byte[] payload, String hash) {
    this.payload = payload;
    this.hash = hash;
  }

  public static Record fromProto(RecordOuterClass.Record record) {
    return new Record(record.getPayload().toByteArray(), record.getHash());
  }

  public RecordOuterClass.Record toProto() {
    return RecordOuterClass.Record.newBuilder()
        .setConfigData(Config.newConfigData())
        .setPayload(ByteString.copyFrom(payload))
        .setHash(hash)
        .build();
  }

  public String getHash() throws Exception {
    Bridge bridge = new Bridge();
    RecordHash recordHash = bridge.getRecord().getHash(this.toProto());

    if (recordHash.getError() != Error.getDefaultInstance()) {
      throw new Exception(recordHash.getError().getMessage());
    }

    return recordHash.getHash();
  }

  public List<Signature> getSignatures() throws Exception {
    Bridge bridge = new Bridge();
    RecordSignatures recordSignatures = bridge.getRecord().getSignatures(this.toProto());

    if (recordSignatures.getError() != Error.getDefaultInstance()) {
      throw new Exception(recordSignatures.getError().getMessage());
    }

    return recordSignatures.getSignaturesList().stream()
        .map(x -> Signature.fromProto(x))
        .collect(Collectors.toList());
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
            .setPublisher(publisher.toProto())
            .build();

    PublishResponse response = bridge.getRecord().publish(req);
    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getHash();
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
            .setConfigData(Config.newConfigData())
            .build();

    SetProofResponse response = bridge.getProof().setProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    this.payload = response.getRecord().getPayload().toByteArray();
  }

  public EncryptionAlg getEncryptionAlg() throws Exception {
    Bridge bridge = new Bridge();
    EncryptionAlgResponse res = bridge.getRecord().getEncryptionAlg(this.toProto());

    if (res.getError() != Error.getDefaultInstance()) {
      throw new Exception(res.getError().getMessage());
    }

    return EncryptionAlg.fromProto(res.getAlg());
  }
}
