package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.BloockRecordEntities;
import com.bloock.sdk.entity.authenticity.Signature;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Represents details related to the authenticity of a record, including
 * signatures.
 */
public class AuthenticityDetails {
  List<Signature> signatures;

  /**
   * Constructs a AuthenticityDetails object with the specified parameters.
   * 
   * @param signatures
   */
  AuthenticityDetails(List<Signature> signatures) {
    this.signatures = signatures;
  }

  /**
   * Gets the signatures of the record.
   * 
   * @return
   */
  public List<Signature> getSignatures() {
    return signatures;
  }

  public static AuthenticityDetails fromProto(BloockRecordEntities.AuthenticityDetails details) {
    List<Signature> signatures = details.getSignaturesList().stream().map(Signature::fromProto)
        .collect(Collectors.toList());
    return new AuthenticityDetails(signatures);
  }

  public BloockRecordEntities.AuthenticityDetails toProto() {
    return BloockRecordEntities.AuthenticityDetails.newBuilder()
        .addAllSignatures(signatures.stream().map(Signature::toProto).collect(Collectors.toList()))
        .build();
  }
}
