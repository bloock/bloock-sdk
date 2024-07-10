package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

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

  public static KeyProtectionLevel fromProto(BloockKeysEntities.KeyProtectionLevel protection) {
    switch (protection) {
      case SOFTWARE:
        return KeyProtectionLevel.SOFTWARE;
      case HSM:
        return KeyProtectionLevel.HSM;
      default:
        return KeyProtectionLevel.UNRECOGNIZED;
    }
  }

  public BloockKeysEntities.KeyProtectionLevel toProto() {
    switch (this) {
      case SOFTWARE:
        return BloockKeysEntities.KeyProtectionLevel.SOFTWARE;
      case HSM:
        return BloockKeysEntities.KeyProtectionLevel.HSM;
      default:
        return BloockKeysEntities.KeyProtectionLevel.UNRECOGNIZED;
    }
  }
}
