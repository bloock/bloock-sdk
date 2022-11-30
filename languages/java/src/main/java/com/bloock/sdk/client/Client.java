package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.AnchorOuterClass.GetAnchorRequest;
import com.bloock.sdk.bridge.proto.AnchorOuterClass.GetAnchorResponse;
import com.bloock.sdk.bridge.proto.AnchorOuterClass.WaitAnchorRequest;
import com.bloock.sdk.bridge.proto.AnchorOuterClass.WaitAnchorResponse;
import com.bloock.sdk.bridge.proto.ProofOuterClass.GetProofRequest;
import com.bloock.sdk.bridge.proto.ProofOuterClass.GetProofResponse;
import com.bloock.sdk.bridge.proto.ProofOuterClass.ValidateRootRequest;
import com.bloock.sdk.bridge.proto.ProofOuterClass.ValidateRootResponse;
import com.bloock.sdk.bridge.proto.ProofOuterClass.VerifyProofRequest;
import com.bloock.sdk.bridge.proto.ProofOuterClass.VerifyProofResponse;
import com.bloock.sdk.bridge.proto.ProofOuterClass.VerifyRecordsRequest;
import com.bloock.sdk.bridge.proto.ProofOuterClass.VerifyRecordsResponse;
import com.bloock.sdk.bridge.proto.RecordOuterClass.GenerateKeysRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.GenerateKeysResponse;
import com.bloock.sdk.bridge.proto.RecordOuterClass.GenerateRsaKeyPairRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.GenerateRsaKeyPairResponse;
import com.bloock.sdk.bridge.proto.RecordOuterClass.SendRecordsRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.SendRecordsResponse;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.Anchor;
import com.bloock.sdk.entity.Keys;
import com.bloock.sdk.entity.Network;
import com.bloock.sdk.entity.Proof;
import com.bloock.sdk.entity.RecordReceipt;
import com.bloock.sdk.entity.RsaKeyPair;
import java.util.List;
import java.util.stream.Collectors;

public class Client {
  private Bridge bridge;

  public Client() {
    this.bridge = new Bridge();
  }

  public List<RecordReceipt> sendRecords(List<String> records) throws Exception {
    SendRecordsRequest request =
        SendRecordsRequest.newBuilder()
            .setConfigData(Config.newConfigData())
            .addAllRecords(records)
            .build();

    SendRecordsResponse response = bridge.getRecord().sendRecords(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getRecordsList().stream()
        .map(x -> RecordReceipt.fromProto(x))
        .collect(Collectors.toList());
  }

  public Anchor getAnchor(long id) throws Exception {
    GetAnchorRequest request =
        GetAnchorRequest.newBuilder().setConfigData(Config.newConfigData()).setAnchorId(id).build();

    GetAnchorResponse response = bridge.getAnchor().getAnchor(request);

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
            .setConfigData(Config.newConfigData())
            .setAnchorId(id)
            .setTimeout(timeout)
            .build();

    WaitAnchorResponse response = bridge.getAnchor().waitAnchor(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Anchor.fromProto(response.getAnchor());
  }

  public Proof getProof(List<String> records) throws Exception {
    GetProofRequest request =
        GetProofRequest.newBuilder()
            .setConfigData(Config.newConfigData())
            .addAllRecords(records)
            .build();

    GetProofResponse response = bridge.getProof().getProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Proof.fromProto(response.getProof());
  }

  public String verifyProof(Proof proof) throws Exception {
    VerifyProofRequest request =
        VerifyProofRequest.newBuilder()
            .setConfigData(Config.newConfigData())
            .setProof(proof.toProto())
            .build();

    VerifyProofResponse response = bridge.getProof().verifyProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getRecord();
  }

  public long verifyRecords(List<String> records) throws Exception {
    return verifyRecords(records, Network.ETHEREUM_MAINNET);
  }

  public long verifyRecords(List<String> records, Network network) throws Exception {
    VerifyRecordsRequest request =
        VerifyRecordsRequest.newBuilder()
            .setConfigData(Config.newConfigData())
            .addAllRecords(records)
            .setNetwork(network.toProto())
            .build();

    VerifyRecordsResponse response = bridge.getProof().verifyRecords(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getTimestamp();
  }

  public long validateRoot(String root) throws Exception {
    return validateRoot(root, Network.ETHEREUM_MAINNET);
  }

  public long validateRoot(String root, Network network) throws Exception {
    ValidateRootRequest request =
        ValidateRootRequest.newBuilder()
            .setConfigData(Config.newConfigData())
            .setRoot(root)
            .setNetwork(network.toProto())
            .build();

    ValidateRootResponse response = bridge.getProof().validateRoot(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getTimestamp();
  }

  public Keys generateKeys() throws Exception {
    GenerateKeysRequest request = GenerateKeysRequest.newBuilder().build();

    GenerateKeysResponse response = bridge.getRecord().generateKeys(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Keys.fromProto(response);
  }

  public RsaKeyPair generateRsaKeyPair() throws Exception {
    GenerateRsaKeyPairRequest request = GenerateRsaKeyPairRequest.newBuilder().build();

    GenerateRsaKeyPairResponse response = bridge.getRecord().generateRsaKeyPair(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return RsaKeyPair.fromProto(response);
  }
}
