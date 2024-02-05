<?php

namespace Bloock\Entity\Authenticity;

use Bloock\SignerAlg;

/**
 * Represents different signature algorithms.
 */
class SignatureAlg
{
    /**
     * Represents the ECDSA signature algorithm with the "ES256K" name.
     */
    const ECDSA = "ECDSA";
    /**
     * Represents the ENS (Ethereum Name Service) signature algorithm.
     */
    const ENS = "ENS";
    /**
     * Represents the BJJ signature algorithm with the "BJJ" name.
     */
    const BJJ = "BJJ";
    /**
     * Represents an unrecognized signature algorithm.
     */
    const UNRECOGNIZED = "UNRECOGNIZED";

    /**
     * Converts a string representation of an algorithm to the corresponding SignatureAlg enum.
     * @param string $alg
     * @return string
     */
    public static function fromString(string $alg): string
    {
        switch ($alg) {
            case "ES256K":
                return SignatureAlg::ECDSA;
            case "ENS":
                return SignatureAlg::ENS;
            case "BJJ":
                return SignatureAlg::BJJ;
            default:
                return SignatureAlg::UNRECOGNIZED;
        }
    }

    public static function fromProto(SignerAlg $alg): string
    {
        switch ($alg) {
            case SignerAlg::ES256K:
                return SignatureAlg::ECDSA;
            case SignerAlg::ENS:
                return SignatureAlg::ENS;
            case SignerAlg::BJJ:
                return SignatureAlg::BJJ;
            default:
                return SignatureAlg::UNRECOGNIZED;
        }
    }
}
