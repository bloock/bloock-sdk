package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

/**
 * Represents the protection level of a cryptographic key.
 */
public enum KeyProtectionLevel {
  /**
   * Indicates that the key is protected by software.
   */
  SOFTWARE,
  /**
   * Indicates that the key is protected by a Hardware Security Module (HSM).
   */
  HSM,
  UNRECOGNIZED;

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
}
