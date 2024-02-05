<?php

namespace Bloock\Entity\Authenticity;

/**
 * Represents a JSON Web Signature (JWS). [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515).
 */
class SignatureJws
{
    private string $signature;
    private string $protected;
    private SignatureHeaderJws $header;
    private string $messageHash;

    /**
     * Constructs a SignatureJws object with the specified parameters.
     * @param string $signature
     * @param string $protected
     * @param SignatureHeaderJws $signatureHeader
     * @param string $messageHash
     */
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
     * Gets the cryptographic signature.
     * @return string
     */
    public function getSignature(): string
    {
        return $this->signature;
    }

    /**
     * Sets the cryptographic signature.
     * @param string $signature
     * @return void
     */
    public function setSignature(string $signature): void
    {
        $this->signature = $signature;
    }

    /**
     * Gets the "protected" header parameter of the JWS.
     * @return string
     */
    public function getProtected(): string
    {
        return $this->protected;
    }

    /**
     * Gets the header containing algorithm and key identifier metadata for the JWS.
     * @return SignatureHeaderJws
     */
    public function getHeader(): SignatureHeaderJws
    {
        return $this->header;
    }

    /**
     * Gets the signature message hash.
     * @return string
     */
    public function getMessageHash(): string
    {
        return $this->messageHash;
    }

    /**
     * Sets the hash of the message that was signed.
     * @param string $messageHash
     * @return void
     */
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

    /**
     * Gets the algorithm used for the JWS signature.
     * @return string
     */
    public function getAlg(): string
    {
        return SignatureAlg::fromString($this->header->getAlg());
    }
}