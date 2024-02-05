<?php

namespace Bloock\Entity\Authenticity;

/**
 * Represents a cryptographic signature along with additional metadata.
 */
class Signature
{
    /**
     * Is the cryptographic signature.
     * @var string
     */
    private string $signature;
    /**
     * Is the algorithm used for the signature.
     * @var string
     */
    private string $alg;
    /**
     * Is the key identifier associated with the signature. (public key or key ID).
     * @var string
     */
    private string $kid;
    /**
     * Is the hash of the message that was signed.
     * @var string
     */
    private string $messageHash;
    /**
     * Is an optional field representing the subject of the signature.
     * @var string
     */
    private string $subject;

    /**
     * Constructs a Signature object with the specified parameters.
     * @param string $signature
     * @param string $alg
     * @param string $kid
     * @param string $messageHash
     * @param string $subject
     */
    public function __construct(string $signature, string $alg, string $kid, string $messageHash, string $subject)
    {
        $this->signature = $signature;
        $this->alg = $alg;
        $this->kid = $kid;
        $this->messageHash = $messageHash;
        $this->subject = $subject;
    }

    public static function fromProto(\Bloock\Signature $signature): Signature
    {
        return new Signature($signature->getSignature(), $signature->getAlg(), $signature->getKid(), $signature->getMessageHash(), $signature->getSubject());
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
     * Gets the key identifier associated with the signature. (public key or key ID).
     * @return string
     */
    public function getKid(): string
    {
        return $this->kid;
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

    /**
     * Gets the subject of the signature.
     * @return string
     */
    public function getSubject(): string
    {
        return $this->subject;
    }

    /**
     * Sets the subject of the signature.
     * @param string $subject
     * @return void
     */
    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function toProto(): \Bloock\Signature
    {
        $p = new \Bloock\Signature();
        $p->setSignature($this->signature);
        $p->setAlg($this->alg);
        $p->setKid($this->kid);
        $p->setMessageHash($this->messageHash);
        $p->setSubject($this->subject);
        return $p;
    }

    /**
     * Returns the SignatureAlg based on the algorithm specified in the Alg field.
     * @return string
     */
    public function getAlg(): string
    {
        return SignatureAlg::fromString($this->alg);
    }
}
