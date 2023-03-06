package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public interface Decrypter {
    EncryptionEntities.Decrypter toProto();
}
