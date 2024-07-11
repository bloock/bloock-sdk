package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.BloockRecordEntities;

/**
 * Represents all details related to a record, including integrity,
 * authenticity, encryption, and availability details.
 */
public class RecordDetails {
  IntegrityDetails integrity;
  AuthenticityDetails authenticity;
  EncryptionDetails encryption;
  AvailabilityDetails availability;

  /**
   * Constructs a RecordDetails object with the specified parameters.
   * 
   * @param integrity
   * @param authenticity
   * @param encryption
   * @param availability
   */
  RecordDetails(
      IntegrityDetails integrity,
      AuthenticityDetails authenticity,
      EncryptionDetails encryption,
      AvailabilityDetails availability) {
    this.integrity = integrity;
    this.authenticity = authenticity;
    this.encryption = encryption;
    this.availability = availability;
  }

  /**
   * Gets the integrity details of the record.
   * 
   * @return
   */
  public IntegrityDetails getIntegrity() {
    return integrity;
  }

  /**
   * Gets the authenticity details of the record.
   * 
   * @return
   */
  public AuthenticityDetails getAuthenticity() {
    return authenticity;
  }

  /**
   * Gets the encryption details of the record.
   * 
   * @return
   */
  public EncryptionDetails getEncryption() {
    return encryption;
  }

  /**
   * Gets the availability details of the record.
   * 
   * @return
   */
  public AvailabilityDetails getAvailability() {
    return availability;
  }

  public static RecordDetails fromProto(BloockRecordEntities.RecordDetails details) {
    IntegrityDetails integrityDetails = null;
    if (details.hasIntegrity()) {
      integrityDetails = IntegrityDetails.fromProto(details.getIntegrity());
    }

    AuthenticityDetails authenticityDetails = null;
    if (details.hasAuthenticity()) {
      authenticityDetails = AuthenticityDetails.fromProto(details.getAuthenticity());
    }

    EncryptionDetails encryptionDetails = null;
    if (details.hasEncryption()) {
      encryptionDetails = EncryptionDetails.fromProto(details.getEncryption());
    }

    AvailabilityDetails availabilityDetails = null;
    if (details.hasAvailability()) {
      availabilityDetails = AvailabilityDetails.fromProto(details.getAvailability());
    }

    return new RecordDetails(
        integrityDetails, authenticityDetails, encryptionDetails, availabilityDetails);
  }

  public BloockRecordEntities.RecordDetails toProto() {
    return BloockRecordEntities.RecordDetails.newBuilder()
        .setIntegrity(integrity.toProto())
        .setAuthenticity(authenticity.toProto())
        .setEncryption(encryption.toProto())
        .setAvailability(availability.toProto())
        .build();
  }
}
