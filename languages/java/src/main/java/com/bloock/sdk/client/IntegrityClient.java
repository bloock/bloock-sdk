package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Integrity.GetAnchorRequest;
import com.bloock.sdk.bridge.proto.Integrity.GetAnchorResponse;
import com.bloock.sdk.bridge.proto.Integrity.GetProofRequest;
import com.bloock.sdk.bridge.proto.Integrity.GetProofResponse;
import com.bloock.sdk.bridge.proto.Integrity.SendRecordsRequest;
import com.bloock.sdk.bridge.proto.Integrity.SendRecordsResponse;
import com.bloock.sdk.bridge.proto.Integrity.ValidateRootRequest;
import com.bloock.sdk.bridge.proto.Integrity.ValidateRootResponse;
import com.bloock.sdk.bridge.proto.Integrity.VerifyProofRequest;
import com.bloock.sdk.bridge.proto.Integrity.VerifyProofResponse;
import com.bloock.sdk.bridge.proto.Integrity.VerifyRecordsRequest;
import com.bloock.sdk.bridge.proto.Integrity.VerifyRecordsResponse;
import com.bloock.sdk.bridge.proto.Integrity.WaitAnchorRequest;
import com.bloock.sdk.bridge.proto.Integrity.WaitAnchorResponse;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.Anchor;
import com.bloock.sdk.entity.Network;
import com.bloock.sdk.entity.Proof;
import com.bloock.sdk.entity.Record;
import com.bloock.sdk.entity.RecordReceipt;
import java.util.List;
import java.util.stream.Collectors;

public class IntegrityClient {
  private Bridge bridge;
  private ConfigData configData;

  public IntegrityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  public IntegrityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  public List<RecordReceipt> sendRecords(List<Record> records) throws Exception {
    SendRecordsRequest request =
        SendRecordsRequest.newBuilder()
            .setConfigData(this.configData)
            .addAllRecords(records.stream().map(x -> x.toProto()).collect(Collectors.toList()))
            .build();

    SendRecordsResponse response = bridge.getIntegrity().sendRecords(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getRecordsList().stream()
        .map(x -> RecordReceipt.fromProto(x))
        .collect(Collectors.toList());
  }

  public Anchor getAnchor(long id) throws Exception {
    GetAnchorRequest request =
        GetAnchorRequest.newBuilder().setConfigData(this.configData).setAnchorId(id).build();

    GetAnchorResponse response = bridge.getIntegrity().getAnchor(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Anchor.fromProto(response.getAnchor());
  }

  public Anchor waitAnchor(long id) throws Exception {
    return waitAnchor(id, 120000);
  }

  public Anchor waitAnchor(long id, long timeout) throws Exception {
    WaitAnchorRequest request =
        WaitAnchorRequest.newBuilder()
            .setConfigData(this.configData)
            .setAnchorId(id)
            .setTimeout(timeout)
            .build();

    WaitAnchorResponse response = bridge.getIntegrity().waitAnchor(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Anchor.fromProto(response.getAnchor());
  }

  public Proof getProof(List<Record> records) throws Exception {
    GetProofRequest request =
        GetProofRequest.newBuilder()
            .setConfigData(this.configData)
            .addAllRecords(records.stream().map(x -> x.toProto()).collect(Collectors.toList()))
            .build();

    GetProofResponse response = bridge.getIntegrity().getProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Proof.fromProto(response.getProof());
  }

  public String verifyProof(Proof proof) throws Exception {
    VerifyProofRequest request =
        VerifyProofRequest.newBuilder()
            .setConfigData(this.configData)
            .setProof(proof.toProto())
            .build();

    VerifyProofResponse response = bridge.getIntegrity().verifyProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getRecord();
  }

  public long verifyRecords(List<Record> records) throws Exception {
    return verifyRecords(records, null);
  }

  public long verifyRecords(List<Record> records, Network network) throws Exception {
    VerifyRecordsRequest.Builder builder =
        VerifyRecordsRequest.newBuilder()
            .setConfigData(this.configData)
            .addAllRecords(records.stream().map(x -> x.toProto()).collect(Collectors.toList()));

    if (network != null) {
      builder.setNetwork(network.toProto());
    }

    VerifyRecordsRequest request = builder.build();
    VerifyRecordsResponse response = bridge.getIntegrity().verifyRecords(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getTimestamp();
  }

  public long validateRoot(String root, Network network) throws Exception {
    ValidateRootRequest request =
        ValidateRootRequest.newBuilder()
            .setConfigData(this.configData)
            .setRoot(root)
            .setNetwork(network.toProto())
            .build();

    ValidateRootResponse response = bridge.getIntegrity().validateRoot(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getTimestamp();
  }
}
