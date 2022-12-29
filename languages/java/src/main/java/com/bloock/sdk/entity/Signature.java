package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.RecordOuterClass;
import com.bloock.sdk.bridge.proto.RecordOuterClass.SignatureCommonNameRequest;
import com.bloock.sdk.bridge.proto.RecordOuterClass.SignatureCommonNameResponse;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;

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

  public String getCommonName() throws Exception {
    Bridge bridge = new Bridge();
    SignatureCommonNameResponse res =
        bridge
            .getRecord()
            .getSignatureCommonName(
                SignatureCommonNameRequest.newBuilder()
                    .setConfigData(Config.newConfigData())
                    .setSignature(this.toProto())
                    .build());

    if (res.getError() != Error.getDefaultInstance()) {
      throw new Exception(res.getError().getMessage());
    }

    return res.getCommonName();
  }
}
