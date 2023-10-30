<?php

namespace Bloock\Entity\Authenticity;

class SignatureHeaderJws
{
    private string $alg;
    private string $kid;

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
     * @return string
     */
    public function getAlg(): string
    {
        return $this->alg;
    }

    /**
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