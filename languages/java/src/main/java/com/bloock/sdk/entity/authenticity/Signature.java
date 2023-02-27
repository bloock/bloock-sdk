package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

public class Signature {
  String signature;
  String protected_;
  SignatureHeader header;
  String messageHash;

  Signature(String signature, String protected_, SignatureHeader header, String messageHash) {
    this.signature = signature;
    this.protected_ = protected_;
    this.header = header;
    this.messageHash = messageHash;
  }

  public static Signature fromProto(AuthenticityEntities.Signature signature) {
    return new Signature(
        signature.getSignature(),
        signature.getProtected(),
        SignatureHeader.fromProto(signature.getHeader()),
        signature.getMessageHash());
  }

  public AuthenticityEntities.Signature toProto() {
    return AuthenticityEntities.Signature.newBuilder()
        .setSignature(this.signature)
        .setProtected(this.protected_)
        .setHeader(this.header.toProto())
        .setMessageHash(this.messageHash)
        .build();
  }

  public String getSignature() {
    return signature;
  }

  public String getProtected_() {
    return protected_;
  }

  public SignatureHeader getHeader() {
    return header;
  }

  public void setSignature(String signature) {
    this.signature = signature;
  }

  public void setMessageHash(String hash) {
    this.messageHash = hash;
  }

  public SignatureAlg getAlg() {
    return SignatureAlg.fromString(this.header.alg);
  }
}
