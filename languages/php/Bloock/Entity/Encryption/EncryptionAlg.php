<?php

namespace Bloock\Entity\Encryption;

class EncryptionAlg
{
    const AES256GCM = "AES256GCM";
    const RSA = "RSA";
    const ECIES = "ECIES";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function fromProto(int $alg): string
    {
        switch ($alg) {
            case \Bloock\EncryptionAlg::A256GCM:
                return EncryptionAlg::AES256GCM;
            case \Bloock\EncryptionAlg::RSA:
                return EncryptionAlg::RSA;
            case \Bloock\EncryptionAlg::ECIES:
                return EncryptionAlg::ECIES;
            default:
                return EncryptionAlg::UNRECOGNIZED;
        }
    }
}