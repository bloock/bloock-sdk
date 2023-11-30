package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

public class Signature {
  String signature;
  String alg;
  String kid;
  String messageHash;
  String subject;

  Signature(String signature, String alg, String kid, String messageHash, String subject) {
    this.signature = signature;
    this.alg = alg;
    this.kid = kid;
    this.messageHash = messageHash;
    this.subject = subject;
  }

  public static Signature fromProto(AuthenticityEntities.Signature signature) {
    return new Signature(
        signature.getSignature(),
        signature.getAlg(),
        signature.getKid(),
        signature.getMessageHash(),
        signature.getSubject());
  }

  public AuthenticityEntities.Signature toProto() {
    return AuthenticityEntities.Signature.newBuilder()
        .setSignature(this.signature)
        .setAlg(this.alg)
        .setKid(this.kid)
        .setMessageHash(this.messageHash)
        .setSubject(this.subject)
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

  public String getSubject() {
    return subject;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }
}
