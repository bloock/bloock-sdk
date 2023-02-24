<?php

namespace Bloock\Entity\Key;

class KeyProtectionLevel
{
    const SOFTWARE = "SOFTWARE";
    const HSM = "HSM";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function fromString(string $type): string {
        switch ($type) {
            case "SOFTWARE":
                return KeyProtectionLevel::SOFTWARE;
            case "HSM":
                return KeyProtectionLevel::HSM;
            default:
                return KeyProtectionLevel::UNRECOGNIZED;
        }
    }
    public static function fromProto(\Bloock\KeyProtectionLevel $alg): string {
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