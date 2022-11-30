package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

public class DecrypterArgs {
  String key;

  DecrypterArgs(String key) {
    this.key = key;
  }

  RecordOuterClass.DecrypterArgs toProto() {
    return RecordOuterClass.DecrypterArgs.newBuilder().setKey(this.key).build();
  }
}
