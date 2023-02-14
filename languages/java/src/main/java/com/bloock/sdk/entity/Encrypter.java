package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public interface Encrypter {
  EncryptionEntities.Encrypter toProto();
}
