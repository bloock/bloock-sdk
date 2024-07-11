package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockIntegrity.*;
import com.bloock.sdk.bridge.proto.BloockShared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.integrity.Anchor;
import com.bloock.sdk.entity.integrity.Network;
import com.bloock.sdk.entity.integrity.Proof;
import com.bloock.sdk.entity.integrity.RecordReceipt;
import com.bloock.sdk.entity.record.Record;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Provides functionality to interact with the
 * <a href="https://dashboard.bloock.com/login">Bloock Integrity service</a>.
 */
public class IntegrityClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * Creates a new IntegrityClient with default configuration.
   */
  public IntegrityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new IntegrityClient with the given configuration.
   * 
   * @param configData
   */
  public IntegrityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * Sends records to the Bloock Integrity service for certification.
   * 
   * @param records
   * @return
   * @throws Exception
   */
  public List<RecordReceipt> sendRecords(List<Record> records) throws Exception {
    SendRecordsRequest request = SendRecordsRequest.newBuilder()
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

  /**
   * Gets an anchor by its ID from the Bloock Integrity service.
   * 
   * @param id
   * @return
   * @throws Exception
   */
  public Anchor getAnchor(long id) throws Exception {
    GetAnchorRequest request = GetAnchorRequest.newBuilder().setConfigData(this.configData).setAnchorId(id).build();

    GetAnchorResponse response = bridge.getIntegrity().getAnchor(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Anchor.fromProto(response.getAnchor());
  }

  /**
   * Waits for the completion of an anchor on the Bloock Integrity service.
   * 
   * @param id
   * @return
   * @throws Exception
   */
  public Anchor waitAnchor(long id) throws Exception {
    return waitAnchor(id, 120000);
  }

  /**
   * Waits for the completion of an anchor on the Bloock Integrity service.
   * 
   * @param id
   * @param timeout
   * @return
   * @throws Exception
   */
  public Anchor waitAnchor(long id, long timeout) throws Exception {
    WaitAnchorRequest request = WaitAnchorRequest.newBuilder()
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

  /**
   * Gets a proof for a set of records from the Bloock Integrity service.
   * 
   * @param records
   * @return
   * @throws Exception
   */
  public Proof getProof(List<Record> records) throws Exception {
    GetProofRequest request = GetProofRequest.newBuilder()
        .setConfigData(this.configData)
        .addAllRecords(records.stream().map(x -> x.toProto()).collect(Collectors.toList()))
        .build();

    GetProofResponse response = bridge.getIntegrity().getProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Proof.fromProto(response.getProof());
  }

  /**
   * Verifies the integrity of a proof.
   * 
   * @param proof
   * @return
   * @throws Exception
   */
  public String verifyProof(Proof proof) throws Exception {
    VerifyProofRequest request = VerifyProofRequest.newBuilder()
        .setConfigData(this.configData)
        .setProof(proof.toProto())
        .build();

    VerifyProofResponse response = bridge.getIntegrity().verifyProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getRecord();
  }

  /**
   * Verifies the integrity of a set of records.
   * 
   * @param records
   * @return
   * @throws Exception
   */
  public long verifyRecords(List<Record> records) throws Exception {
    return verifyRecords(records, null);
  }

  /**
   * Verifies the integrity of a set of records for a given network.
   * 
   * @param records
   * @param network
   * @return
   * @throws Exception
   */
  public long verifyRecords(List<Record> records, Network network) throws Exception {
    VerifyRecordsRequest.Builder builder = VerifyRecordsRequest.newBuilder()
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

  /**
   * Validates the integrity of a merkle root proof on blockchain.
   * 
   * @param root
   * @param network
   * @return
   * @throws Exception
   */
  public long validateRoot(String root, Network network) throws Exception {
    ValidateRootRequest request = ValidateRootRequest.newBuilder()
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
