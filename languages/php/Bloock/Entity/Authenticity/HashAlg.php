<?php

namespace Bloock\Entity\Authenticity;

class HashAlg
{
    const SHA_256 = "SHA_256";
    const KECCAK_256 = "KECCAK_256";
    const POSEIDON = "POSEIDON";
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
            default:
                return \Bloock\HashAlg::SHA_256;
        }
    }
}
