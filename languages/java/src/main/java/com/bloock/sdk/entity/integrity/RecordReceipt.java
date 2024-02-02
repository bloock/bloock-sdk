package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.IntegrityEntities;

/**
 * Represents a receipt for a record, including anchor ID, client, record, and status information.
 */
public class RecordReceipt {
  long anchor;
  String client;
  String record;
  String status;

  /**
   * Constructs a RecordReceipt object with the specified parameters.
   * @param anchor
   * @param client
   * @param record
   * @param status
   */
  RecordReceipt(long anchor, String client, String record, String status) {
    this.anchor = anchor;
    this.client = client;
    this.record = record;
    this.status = status;
  }

  public static RecordReceipt fromProto(IntegrityEntities.RecordReceipt receipt) {
    return new RecordReceipt(
        receipt.getAnchor(), receipt.getClient(), receipt.getRecord(), receipt.getStatus());
  }

  IntegrityEntities.RecordReceipt toProto() {
    return IntegrityEntities.RecordReceipt.newBuilder()
        .setAnchor(anchor)
        .setClient(client)
        .setRecord(record)
        .setStatus(status)
        .build();
  }

  /**
   * Gets the anchor of the record receipt.
   * @return
   */
  public long getAnchor() {
    return anchor;
  }

  /**
   * Gets the client of the record receipt.
   * @return
   */
  public String getClient() {
    return client;
  }

  /**
   * Gets the record of the record receipt.
   * @return
   */
  public String getRecord() {
    return record;
  }

  /**
   * Gets the status of the record receipt.
   * @return
   */
  public String getStatus() {
    return status;
  }
}
