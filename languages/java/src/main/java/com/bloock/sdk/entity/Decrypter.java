package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public interface Decrypter {
  EncryptionEntities.Decrypter toProto();
}
