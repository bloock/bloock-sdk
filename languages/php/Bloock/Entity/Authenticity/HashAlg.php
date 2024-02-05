<?php

namespace Bloock\Entity\Authenticity;

/**
 * Represents different hash algorithms.
 */
class HashAlg
{
    /**
     * Represents the SHA-256 hash algorithm.
     */
    const SHA_256 = "SHA_256";
    /**
     * Represents the Keccak-256 hash algorithm.
     */
    const KECCAK_256 = "KECCAK_256";
    /**
     * Represents the Poseidon hash algorithm.
     */
    const POSEIDON = "POSEIDON";
    /**
     * Represents no hash algorithm.
     */
    const NONE = "NONE";
    /**
     * Represents an unrecognized hash algorithm.
     */
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function fromProto(int $alg): string
    {
        switch ($alg) {
            case \Bloock\HashAlg::SHA_256:
                return HashAlg::SHA_256;
            case \Bloock\HashAlg::KECCAK_256:
                return HashAlg::KECCAK_256;
            case \Bloock\HashAlg::POSEIDON:
                return HashAlg::POSEIDON;
            case \Bloock\HashAlg::NONE:
                return HashAlg::NONE;
            default:
                return HashAlg::SHA_256;
        }
    }

    public static function toProto(string $type): int
    {
        switch ($type) {
            case HashAlg::SHA_256:
                return \Bloock\HashAlg::SHA_256;
            case HashAlg::KECCAK_256:
                return \Bloock\HashAlg::KECCAK_256;
            case HashAlg::POSEIDON:
                return \Bloock\HashAlg::POSEIDON;
            case HashAlg::NONE:
                return \Bloock\HashAlg::NONE;
            default:
                return \Bloock\HashAlg::SHA_256;
        }
    }
}
