<?php

namespace Bloock\Entity\Key;

class KeyType
{
    const EcP256k = "EcP256k";
    const Rsa2048 = "Rsa2048";
    const Rsa3072 = "Rsa3072";
    const Rsa4096 = "Rsa4096";
    const Aes128 = "Aes128";
    const Aes256 = "Aes256";
    const Bjj = "Bjj";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function toProto(string $type): int
    {
        switch ($type) {
            case KeyType::EcP256k:
                return \Bloock\KeyType::EcP256k;
            case KeyType::Rsa2048:
                return \Bloock\KeyType::Rsa2048;
            case KeyType::Rsa3072:
                return \Bloock\KeyType::Rsa3072;
            case KeyType::Rsa4096:
                return \Bloock\KeyType::Rsa4096;
            case KeyType::Aes128:
                return \Bloock\KeyType::Aes128;
            case KeyType::Aes256:
                return \Bloock\KeyType::Aes256;
            case KeyType::Bjj:
                return \Bloock\KeyType::Bjj;
            default:
                return \Bloock\KeyType::EcP256k;
        }
    }

    public static function fromProto(int $alg): string
    {
        switch ($alg) {
            case \Bloock\KeyType::EcP256k:
                return KeyType::EcP256k;
            case \Bloock\KeyType::Rsa2048:
                return KeyType::Rsa2048;
            case \Bloock\KeyType::Rsa3072:
                return KeyType::Rsa3072;
            case \Bloock\KeyType::Rsa4096:
                return KeyType::Rsa4096;
            case \Bloock\KeyType::Aes128:
                return KeyType::Aes128;
            case \Bloock\KeyType::Aes256:
                return KeyType::Aes256;
            case \Bloock\KeyType::Bjj:
                return KeyType::Bjj;
            default:
                return KeyType::UNRECOGNIZED;
        }
    }
}
