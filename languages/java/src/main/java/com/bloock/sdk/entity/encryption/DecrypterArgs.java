package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public class DecrypterArgs {
  String key;

  DecrypterArgs(String key) {
    this.key = key;
  }

  EncryptionEntities.DecrypterArgs toProto() {
    return EncryptionEntities.DecrypterArgs.newBuilder().setKey(this.key).build();
  }
}
