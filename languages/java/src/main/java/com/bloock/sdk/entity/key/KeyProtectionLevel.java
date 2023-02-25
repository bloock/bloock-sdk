package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public enum KeyProtectionLevel {
  SOFTWARE,
  HSM,
  UNRECOGNIZED;

  public KeysEntities.KeyProtectionLevel toProto() {
    return switch (this) {
      case SOFTWARE -> KeysEntities.KeyProtectionLevel.SOFTWARE;
      case HSM -> KeysEntities.KeyProtectionLevel.HSM;
      default -> KeysEntities.KeyProtectionLevel.UNRECOGNIZED;
    };
  }

  public static KeyProtectionLevel fromProto(KeysEntities.KeyProtectionLevel protection) {
    return switch (protection) {
      case SOFTWARE -> KeyProtectionLevel.SOFTWARE;
      case HSM -> KeyProtectionLevel.HSM;
      default -> KeyProtectionLevel.UNRECOGNIZED;
    };
  }
}
