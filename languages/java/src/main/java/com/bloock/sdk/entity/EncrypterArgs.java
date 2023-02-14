package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

class EncrypterArgs {
  String key;

  EncrypterArgs(String key) {
    this.key = key;
  }

  EncryptionEntities.EncrypterArgs toProto() {
    return EncryptionEntities.EncrypterArgs.newBuilder().setKey(this.key).build();
  }
}
