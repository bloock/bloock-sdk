package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class SignatureHeaderJws {
  String alg;
  String kid;

  SignatureHeaderJws(String alg, String kid) {
    this.alg = alg;
    this.kid = kid;
  }

  public static SignatureHeaderJws fromProto(IdentityEntities.SignatureHeaderJWS header) {
    return new SignatureHeaderJws(header.getAlg(), header.getKid());
  }

  public String getAlg() {
    return alg;
  }

  public String getKid() {
    return kid;
  }

  public IdentityEntities.SignatureHeaderJWS toProto() {
    return IdentityEntities.SignatureHeaderJWS.newBuilder()
        .setAlg(this.alg)
        .setKid(this.kid)
        .build();
  }
}
