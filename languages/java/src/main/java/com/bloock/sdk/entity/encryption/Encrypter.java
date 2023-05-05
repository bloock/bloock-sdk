package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public interface Encrypter {
  EncryptionEntities.Encrypter toProto();
}
