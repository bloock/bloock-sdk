<?php

namespace Bloock\Entity\Key;

/**
 * Represents the protection level of a cryptographic key.
 */
class KeyProtectionLevel
{
    /**
     * Indicates that the key is protected by software.
     */
    const SOFTWARE = "SOFTWARE";
    /**
     * Indicates that the key is protected by a Hardware Security Module (HSM).
     */
    const HSM = "HSM";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function toProto(string $type): int
    {
        switch ($type) {
            case KeyProtectionLevel::SOFTWARE:
                return \Bloock\KeyProtectionLevel::SOFTWARE;
            case KeyProtectionLevel::HSM:
                return \Bloock\KeyProtectionLevel::HSM;
            default:
                return \Bloock\KeyProtectionLevel::SOFTWARE;
        }
    }

    public static function fromProto(int $alg): string
    {
        switch ($alg) {
            case \Bloock\KeyProtectionLevel::SOFTWARE:
                return KeyProtectionLevel::SOFTWARE;
            case \Bloock\KeyProtectionLevel::HSM:
                return KeyProtectionLevel::HSM;
            default:
                return KeyProtectionLevel::UNRECOGNIZED;
        }
    }
}