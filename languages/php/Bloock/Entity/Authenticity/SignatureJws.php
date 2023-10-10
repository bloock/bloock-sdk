<?php

namespace Bloock\Entity\Authenticity;

class SignatureJws
{
    private string $signature;
    private string $protected;
    private SignatureHeaderJws $header;
    private string $messageHash;

    public function __construct(string $signature, string $protected, SignatureHeaderJws $signatureHeader, string $messageHash)
    {
        $this->signature = $signature;
        $this->protected = $protected;
        $this->header = $signatureHeader;
        $this->messageHash = $messageHash;
    }

    public static function fromProto(\Bloock\SignatureJWS $signature): SignatureJws
    {
        return new SignatureJws($signature->getSignature(), $signature->getProtected(), SignatureHeaderJws::fromProto($signature->getHeader()), $signature->getMessageHash());
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
    public function getProtected(): string
    {
        return $this->protected;
    }

    /**
     * @return SignatureHeaderJws
     */
    public function getHeader(): SignatureHeaderJws
    {
        return $this->header;
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

    public function toProto(): \Bloock\SignatureJWS
    {
        $p = new \Bloock\SignatureJWS();
        $p->setSignature($this->signature);
        $p->setProtected($this->protected);
        $p->setHeader($this->header->toProto());
        $p->setMessageHash($this->messageHash);
        return $p;
    }

    public function getAlg(): string
    {
        return SignatureAlg::fromString($this->header->getAlg());
    }
}