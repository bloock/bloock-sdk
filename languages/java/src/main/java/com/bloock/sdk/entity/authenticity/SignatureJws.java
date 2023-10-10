package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class SignatureJws {
  String signature;
  String protected_;
  SignatureHeaderJws header;
  String messageHash;

  SignatureJws(String signature, String protected_, SignatureHeaderJws header, String messageHash) {
    this.signature = signature;
    this.protected_ = protected_;
    this.header = header;
    this.messageHash = messageHash;
  }

  public static SignatureJws fromProto(IdentityEntities.SignatureJWS signature) {
    return new SignatureJws(
        signature.getSignature(),
        signature.getProtected(),
        SignatureHeaderJws.fromProto(signature.getHeader()),
        signature.getMessageHash());
  }

  public IdentityEntities.SignatureJWS toProto() {
    return IdentityEntities.SignatureJWS.newBuilder()
        .setSignature(this.signature)
        .setProtected(this.protected_)
        .setHeader(this.header.toProto())
        .setMessageHash(this.messageHash)
        .build();
  }

  public String getSignature() {
    return signature;
  }

  public void setSignature(String signature) {
    this.signature = signature;
  }

  public String getProtected_() {
    return protected_;
  }

  public SignatureHeaderJws getHeader() {
    return header;
  }

  public void setMessageHash(String hash) {
    this.messageHash = hash;
  }

  public SignatureAlg getAlg() {
    return SignatureAlg.fromString(this.header.alg);
  }
}
