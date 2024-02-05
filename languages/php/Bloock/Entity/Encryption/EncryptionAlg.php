<?php

namespace Bloock\Entity\Encryption;

/**
 * Represents encryption algorithm types.
 */
class EncryptionAlg
{
    /**
     * Represents the AES-256-GCM encryption algorithm.
     */
    const AES256GCM = "AES256GCM";
    /**
     * Represents the AES-256-GCM with managed key encryption algorithm.
     */
    const AES256GCM_M = "AES256GCM_M";
    /**
     * Represents the RSA encryption algorithm.
     */
    const RSA = "RSA";
    /**
     * Represents the RSA with managed key encryption algorithm.
     */
    const RSA_M = "RSA_M";
    /**
     * Represents an unrecognized encryption algorithm.
     */
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
