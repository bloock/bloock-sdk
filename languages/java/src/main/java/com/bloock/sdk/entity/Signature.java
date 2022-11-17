package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

public class Signature {
  String signature;
  String protected_;
  SignatureHeader header;

  Signature(String signature, String protected_, SignatureHeader header) {
    this.signature = signature;
    this.protected_ = protected_;
    this.header = header;
  }

  public static Signature fromProto(RecordOuterClass.Signature signature) {
    return new Signature(
        signature.getSignature(),
        signature.getProtected(),
        SignatureHeader.fromProto(signature.getHeader()));
  }

  public RecordOuterClass.Signature toProto() {
    return RecordOuterClass.Signature.newBuilder()
        .setSignature(this.signature)
        .setProtected(this.protected_)
        .setHeader(this.header.toProto())
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
}
