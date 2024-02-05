import * as keysEntitiesProto from "../../bridge/proto/keys_entities";

/**
 * Represents the protection level of a cryptographic key.
 */
export enum KeyProtectionLevel {
  /**
   * Indicates that the key is protected by software.
   */
  SOFTWARE,
  /**
   * Indicates that the key is protected by a Hardware Security Module (HSM).
   */
  HSM
}

export namespace KeyProtectionLevel {
  export function toProto(
    type: KeyProtectionLevel
  ): keysEntitiesProto.KeyProtectionLevel {
    switch (type) {
      case KeyProtectionLevel.SOFTWARE:
        return keysEntitiesProto.KeyProtectionLevel.SOFTWARE;
      case KeyProtectionLevel.HSM:
        return keysEntitiesProto.KeyProtectionLevel.HSM;
    }
  }

  export function fromProto(
    type: keysEntitiesProto.KeyProtectionLevel | undefined
  ): KeyProtectionLevel {
    switch (type) {
      case keysEntitiesProto.KeyProtectionLevel.SOFTWARE:
        return KeyProtectionLevel.SOFTWARE;
      case keysEntitiesProto.KeyProtectionLevel.HSM:
        return KeyProtectionLevel.HSM;
      default:
        return KeyProtectionLevel.SOFTWARE;
    }
  }
}
