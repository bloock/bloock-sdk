package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

public class Signature {
  String signature;
  String alg;
  String kid;
  String messageHash;

  Signature(String signature, String alg, String kid, String messageHash) {
    this.signature = signature;
    this.alg = alg;
    this.kid = kid;
    this.messageHash = messageHash;
  }

  public static Signature fromProto(AuthenticityEntities.Signature signature) {
    return new Signature(
        signature.getSignature(),
        signature.getAlg(),
        signature.getKid(),
        signature.getMessageHash());
  }

  public AuthenticityEntities.Signature toProto() {
    return AuthenticityEntities.Signature.newBuilder()
        .setSignature(this.signature)
        .setAlg(this.alg)
        .setKid(this.kid)
        .setMessageHash(this.messageHash)
        .build();
  }

  public String getSignature() {
    return signature;
  }

  public void setSignature(String signature) {
    this.signature = signature;
  }

  public SignatureAlg getAlg() {
    return SignatureAlg.fromString(this.alg);
  }

  public String getKid() {
    return kid;
  }

  public void setMessageHash(String hash) {
    this.messageHash = hash;
  }
}
