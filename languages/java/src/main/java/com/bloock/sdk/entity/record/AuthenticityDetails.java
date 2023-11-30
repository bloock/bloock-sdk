package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.RecordEntities;
import com.bloock.sdk.entity.authenticity.Signature;
import com.bloock.sdk.entity.integrity.Proof;

import java.util.List;
import java.util.stream.Collectors;

public class AuthenticityDetails {
  List<Signature> signatures;

  AuthenticityDetails(List<Signature> signatures) {
    this.signatures = signatures;
  }

  public List<Signature> getSignatures() {
    return signatures;
  }

  public static AuthenticityDetails fromProto(RecordEntities.AuthenticityDetails details) {
    List<Signature> signatures = details.getSignaturesList().stream().map(Signature::fromProto)
            .collect(Collectors.toList());
    return new AuthenticityDetails(signatures);
  }

  public RecordEntities.AuthenticityDetails toProto() {
    return RecordEntities.AuthenticityDetails.newBuilder()
        .addAllSignatures(signatures.stream().map(Signature::toProto)
                .collect(Collectors.toList()))
        .build();
  }
}
