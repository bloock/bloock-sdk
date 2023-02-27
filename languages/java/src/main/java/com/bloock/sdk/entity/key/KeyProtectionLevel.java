package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public enum KeyProtectionLevel {
  SOFTWARE,
  HSM,
  UNRECOGNIZED;

  public KeysEntities.KeyProtectionLevel toProto() {
    switch (this) {
      case SOFTWARE:
        return KeysEntities.KeyProtectionLevel.SOFTWARE;
      case HSM:
        return KeysEntities.KeyProtectionLevel.HSM;
      default:
        return KeysEntities.KeyProtectionLevel.UNRECOGNIZED;
    }
  }

  public static KeyProtectionLevel fromProto(KeysEntities.KeyProtectionLevel protection) {
    switch (protection) {
      case SOFTWARE:
        return KeyProtectionLevel.SOFTWARE;
      case HSM:
        return KeyProtectionLevel.HSM;
      default:
        return KeyProtectionLevel.UNRECOGNIZED;
    }
  }
}
