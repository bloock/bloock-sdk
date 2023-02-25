<?php

namespace Bloock\Entity\Key;

class KeyType
{
    const EcP256k = "EcP256k";
    const Rsa2048 = "Rsa2048";
    const Rsa3072 = "Rsa3072";
    const Rsa4096 = "Rsa4096";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function toProto(string $type): int {
        return \Bloock\KeyType::value($type);
    }

    public static function fromProto(\Bloock\KeyType $alg): string {
        switch ($alg) {
            case \Bloock\KeyType::EcP256k:
                return KeyType::EcP256k;
            case \Bloock\KeyType::Rsa2048:
                return KeyType::Rsa2048;
            case \Bloock\KeyType::Rsa3072:
                return KeyType::Rsa3072;
            case \Bloock\KeyType::Rsa4096:
                return KeyType::Rsa4096;
            default:
                return KeyType::UNRECOGNIZED;
        }
    }
}