<?php

namespace Bloock\Entity\Authenticity;

class SignatureHeader
{
    private string $alg;
    private string $kid;

    public function __construct(string $alg, string $kid)
    {
        $this->alg = $alg;
        $this->kid = $kid;
    }

    public static function fromProto(\Bloock\SignatureHeader $header): SignatureHeader
    {
        return new SignatureHeader($header->getAlg(), $header->getKid());
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

    public function toProto(): \Bloock\SignatureHeader
    {
        $p = new \Bloock\SignatureHeader();
        $p->setAlg($this->alg);
        $p->setKid($this->kid);
        return $p;
    }
}