package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Record.GetHashRequest;
import com.bloock.sdk.bridge.proto.Record.GetHashResponse;
import com.bloock.sdk.bridge.proto.Record.SetProofRequest;
import com.bloock.sdk.bridge.proto.Record.SetProofResponse;
import com.bloock.sdk.bridge.proto.RecordEntities;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.entity.integrity.Proof;
import com.google.protobuf.ByteString;

public class RecordDetails {
  IntegrityDetails integrity;
  AuthenticityDetails authenticity;
  EncryptionDetails encryption;
  AvailabilityDetails availability;

  RecordDetails(  IntegrityDetails integrity, AuthenticityDetails authenticity, EncryptionDetails encryption, AvailabilityDetails availability) {
    this.integrity = integrity;
    this.authenticity = authenticity;
    this.encryption = encryption;
    this.availability = availability;
  }

  public IntegrityDetails getIntegrity() {
    return integrity;
  }

  public AuthenticityDetails getAuthenticity() {
    return authenticity;
  }

  public EncryptionDetails getEncryption() {
    return encryption;
  }

  public AvailabilityDetails getAvailability() {
    return availability;
  }

  public static RecordDetails fromProto(RecordEntities.RecordDetails details) {
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

    return new RecordDetails(integrityDetails, authenticityDetails, encryptionDetails, availabilityDetails);
  }

  public RecordEntities.RecordDetails toProto() {
    return RecordEntities.RecordDetails.newBuilder()
      .setIntegrity(integrity.toProto())
      .setAuthenticity(authenticity.toProto())
      .setEncryption(encryption.toProto())
      .setAvailability(availability.toProto())
      .build();
  }
}