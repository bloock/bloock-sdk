package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

public class SignatureHeader {
  String alg;
  String kid;

  SignatureHeader(String alg, String kid) {
    this.alg = alg;
    this.kid = kid;
  }

  public static SignatureHeader fromProto(AuthenticityEntities.SignatureHeader header) {
    return new SignatureHeader(header.getAlg(), header.getKid());
  }

  public String getAlg() {
    return alg;
  }

  public String getKid() {
    return kid;
  }

  public AuthenticityEntities.SignatureHeader toProto() {
    return AuthenticityEntities.SignatureHeader.newBuilder()
        .setAlg(this.alg)
        .setKid(this.kid)
        .build();
  }
}
