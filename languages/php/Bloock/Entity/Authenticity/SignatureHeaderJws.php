<?php

namespace Bloock\Entity\Authenticity;

/**
 * Represents the header of a JSON Web Signature (JWS). [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515).
 */
class SignatureHeaderJws
{
    private string $alg;
    private string $kid;

    /**
     * Constructs a SignatureHeaderJws object with the specified algorithm and key identifier.
     * @param string $alg
     * @param string $kid
     */
    public function __construct(string $alg, string $kid)
    {
        $this->alg = $alg;
        $this->kid = $kid;
    }

    public static function fromProto(\Bloock\SignatureHeaderJWS $header): SignatureHeaderJws
    {
        return new SignatureHeaderJws($header->getAlg(), $header->getKid());
    }

    /**
     * Gets the algorithm used for the JWS signature.
     * @return string
     */
    public function getAlg(): string
    {
        return $this->alg;
    }

    /**
     * Gets the key identifier associated with the JWS signature.
     * @return string
     */
    public function getKid(): string
    {
        return $this->kid;
    }

    public function toProto(): \Bloock\SignatureHeaderJWS
    {
        $p = new \Bloock\SignatureHeaderJWS();
        $p->setAlg($this->alg);
        $p->setKid($this->kid);
        return $p;
    }
}