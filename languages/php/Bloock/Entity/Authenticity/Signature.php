<?php

namespace Bloock\Entity\Authenticity;

class Signature
{
    private string $signature;
    private string $protected;
    private SignatureHeader $header;
    private string $messageHash;

    public function __construct(string $signature, string $protected, SignatureHeader $signatureHeader, string $messageHash) {
        $this->signature = $signature;
        $this->protected = $protected;
        $this->header = $signatureHeader;
        $this->messageHash = $messageHash;
    }

    public static function fromProto(\Bloock\Signature $signature): Signature {
        return new Signature($signature->getSignature(), $signature->getProtected(), SignatureHeader::fromProto($signature->getHeader()), $signature->getMessageHash());
    }

    public function toProto(): \Bloock\Signature {
        $p = new \Bloock\Signature();
        $p->setSignature($this->signature);
        $p->setProtected($this->protected);
        $p->setHeader($this->header->toProto());
        $p->setMessageHash($this->messageHash);
        return $p;
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
     * @return SignatureHeader
     */
    public function getHeader(): SignatureHeader
    {
        return $this->header;
    }

    public function getAlg(): string
    {
        return SignatureAlg::fromString($this->header->getAlg());
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
}