<?php

namespace Bloock\Entity\Authenticity;

class SignatureAlg
{
    const ECDSA = "ECDSA";
    const ENS = "ENS";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function fromString(string $alg): string {
        switch ($alg) {
            case "ES256K":
                return SignatureAlg::ECDSA;
            case "ENS":
                return SignatureAlg::ENS;
            default:
                return SignatureAlg::UNRECOGNIZED;
        }
    }
    public static function fromProto(\Bloock\SignerAlg $alg): string {
        switch ($alg) {
            case \Bloock\SignerAlg::ES256K:
                return SignatureAlg::ECDSA;
            case \Bloock\SignerAlg::ENS:
                return SignatureAlg::ENS;
            default:
                return SignatureAlg::UNRECOGNIZED;
        }
    }
}