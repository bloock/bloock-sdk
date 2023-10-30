<?php

namespace Bloock\Entity\Authenticity;

class Signature
{
    private string $signature;
    private string $alg;
    private string $kid;
    private string $messageHash;

    public function __construct(string $signature, string $alg, string $kid, string $messageHash)
    {
        $this->signature = $signature;
        $this->alg = $alg;
        $this->kid = $kid;
        $this->messageHash = $messageHash;
    }

    public static function fromProto(\Bloock\Signature $signature): Signature
    {
        return new Signature($signature->getSignature(), $signature->getAlg(), $signature->getKid(), $signature->getMessageHash());
    }

    /**
     * @return string
     */
    public function getSignature(): string
    {
        return $this->signature;
    }

    public function setSignature(string $signature): void
    {
        $this->signature = $signature;
    }

    /**
     * @return string
     */
    public function getKid(): string
    {
        return $this->kid;
    }

    /**
     * @return string
     */
    public function getMessageHash(): string
    {
        return $this->messageHash;
    }

    public function setMessageHash(string $messageHash): void
    {
        $this->messageHash = $messageHash;
    }

    public function toProto(): \Bloock\Signature
    {
        $p = new \Bloock\Signature();
        $p->setSignature($this->signature);
        $p->setAlg($this->alg);
        $p->setKid($this->kid);
        $p->setMessageHash($this->messageHash);
        return $p;
    }

    public function getAlg(): string
    {
        return SignatureAlg::fromString($this->alg);
    }
}
