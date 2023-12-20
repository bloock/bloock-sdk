<?php

namespace Bloock\Entity\Encryption;

class EncryptionAlg
{
    const AES256GCM = "AES256GCM";
    const AES256GCM_M = "AES256GCM_M";
    const RSA = "RSA";
    const RSA_M = "RSA_M";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function fromProto(int $alg): string
    {
        switch ($alg) {
            case \Bloock\EncryptionAlg::A256GCM:
                return EncryptionAlg::AES256GCM;
            case \Bloock\EncryptionAlg::A256GCM_M:
                return EncryptionAlg::AES256GCM_M;
            case \Bloock\EncryptionAlg::RSA:
                return EncryptionAlg::RSA;
            case \Bloock\EncryptionAlg::RSA_M:
                return EncryptionAlg::RSA_M;
            default:
                return EncryptionAlg::UNRECOGNIZED;
        }
    }
}
