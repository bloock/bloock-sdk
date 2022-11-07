package bloock.sdk.java.client;

import bloock.sdk.java.bridge.Bridge;
import bloock.sdk.java.bridge.proto.AnchorOuterClass.GetAnchorRequest;
import bloock.sdk.java.bridge.proto.AnchorOuterClass.GetAnchorResponse;
import bloock.sdk.java.bridge.proto.AnchorOuterClass.WaitAnchorRequest;
import bloock.sdk.java.bridge.proto.AnchorOuterClass.WaitAnchorResponse;
import bloock.sdk.java.bridge.proto.ProofOuterClass.GetProofRequest;
import bloock.sdk.java.bridge.proto.ProofOuterClass.GetProofResponse;
import bloock.sdk.java.bridge.proto.ProofOuterClass.ValidateRootRequest;
import bloock.sdk.java.bridge.proto.ProofOuterClass.ValidateRootResponse;
import bloock.sdk.java.bridge.proto.ProofOuterClass.VerifyProofRequest;
import bloock.sdk.java.bridge.proto.ProofOuterClass.VerifyProofResponse;
import bloock.sdk.java.bridge.proto.ProofOuterClass.VerifyRecordsRequest;
import bloock.sdk.java.bridge.proto.ProofOuterClass.VerifyRecordsResponse;
import bloock.sdk.java.bridge.proto.RecordOuterClass.GenerateKeysRequest;
import bloock.sdk.java.bridge.proto.RecordOuterClass.GenerateKeysResponse;
import bloock.sdk.java.bridge.proto.RecordOuterClass.SendRecordsRequest;
import bloock.sdk.java.bridge.proto.RecordOuterClass.SendRecordsResponse;
import bloock.sdk.java.bridge.proto.Shared.Error;
import bloock.sdk.java.config.Config;
import bloock.sdk.java.entity.Anchor;
import bloock.sdk.java.entity.Keys;
import bloock.sdk.java.entity.Network;
import bloock.sdk.java.entity.Proof;
import bloock.sdk.java.entity.RecordReceipt;
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
    return verifyRecords(records, Network.BLOOCK_CHAIN);
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
}
