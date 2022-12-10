package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

class EncrypterArgs {
  String key;

  EncrypterArgs(String key) {
    this.key = key;
  }

  RecordOuterClass.EncrypterArgs toProto() {
    return RecordOuterClass.EncrypterArgs.newBuilder().setKey(this.key).build();
  }
}
