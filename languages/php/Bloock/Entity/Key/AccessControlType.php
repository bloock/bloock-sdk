<?php

namespace Bloock\Entity\Key;

/**
 * Represents the access control type a cryptographic key.
 */
class AccessControlType
{
    /**
     * Indicates that the key is not protected by access control.
     */
    const NONE = "NONE";
    /**
     * Indicates that the key is protected by a TOTP-based access control.
     */
    const TOTP = "TOTP";
    /**
     * Indicates that the key is protected by a Secret-based access control.
     */
    const SECRET = "SECRET";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function toProto(string $type): int
    {
        switch ($type) {
            case AccessControlType::NONE:
                return \Bloock\AccessControlType::NO_ACCESS_CONTROL;
            case AccessControlType::TOTP:
                return \Bloock\AccessControlType::TOTP;
            case AccessControlType::SECRET:
                return \Bloock\AccessControlType::SECRET;
            default:
                return \Bloock\AccessControlType::NO_ACCESS_CONTROL;
        }
    }

    public static function fromProto(int $alg): string
    {
        switch ($alg) {
            case \Bloock\AccessControlType::NO_ACCESS_CONTROL:
                return AccessControlType::NONE;
            case \Bloock\AccessControlType::TOTP:
                return AccessControlType::TOTP;
            case \Bloock\AccessControlType::SECRET:
                return AccessControlType::SECRET;
            default:
                return AccessControlType::UNRECOGNIZED;
        }
    }
}
