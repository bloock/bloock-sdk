import * as keysEntitiesProto from "../../bridge/proto/bloock_keys_entities";

/**
 * Represents the access control type a cryptographic key.
 */
export enum AccessControlType {
  /**
   * Indicates that the key is not protected by access control.
   */
  NONE,
  /**
   * Indicates that the key is protected by a TOTP-based access control.
   */
  TOTP,
  /**
   * Indicates that the key is protected by a Secret-based access control.
   */
  SECRET
}

export namespace AccessControlType {
  export function toProto(
    type: AccessControlType
  ): keysEntitiesProto.AccessControlType {
    switch (type) {
      case AccessControlType.NONE:
        return keysEntitiesProto.AccessControlType.NO_ACCESS_CONTROL;
      case AccessControlType.TOTP:
        return keysEntitiesProto.AccessControlType.TOTP;
      case AccessControlType.SECRET:
        return keysEntitiesProto.AccessControlType.SECRET;
      default:
        return keysEntitiesProto.AccessControlType.NO_ACCESS_CONTROL;
    }
  }

  export function fromProto(
    type: keysEntitiesProto.AccessControlType | undefined
  ): AccessControlType {
    switch (type) {
      case keysEntitiesProto.AccessControlType.NO_ACCESS_CONTROL:
        return AccessControlType.NONE;
      case keysEntitiesProto.AccessControlType.TOTP:
        return AccessControlType.TOTP;
      case keysEntitiesProto.AccessControlType.SECRET:
        return AccessControlType.SECRET;
      default:
        return AccessControlType.NONE;
    }
  }
}
