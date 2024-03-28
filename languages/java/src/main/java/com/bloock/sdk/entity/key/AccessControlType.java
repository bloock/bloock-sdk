package com.bloock.sdk.entity.key;
import com.bloock.sdk.bridge.proto.KeysEntities;

/**
 * Represents the access control type a cryptographic key.
 */
public enum AccessControlType {
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
    SECRET,
    UNRECOGNIZED;

    public static AccessControlType fromProto(KeysEntities.AccessControlType type) {
        switch (type) {
            case NO_ACCESS_CONTROL:
                return AccessControlType.NONE;
            case TOTP:
                return AccessControlType.TOTP;
            case SECRET:
                return AccessControlType.SECRET;
            default:
                return AccessControlType.UNRECOGNIZED;
        }
    }

    public KeysEntities.AccessControlType toProto() {
        switch (this) {
            case NONE:
                return KeysEntities.AccessControlType.NO_ACCESS_CONTROL;
            case TOTP:
                return KeysEntities.AccessControlType.TOTP;
            case SECRET:
                return KeysEntities.AccessControlType.SECRET;
            default:
                return KeysEntities.AccessControlType.UNRECOGNIZED;
        }
    }
}
