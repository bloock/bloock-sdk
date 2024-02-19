<?php

namespace Bloock\Entity\Identity;

/**
 * Represents the status information for a credential, including its ID, revocation nonce, and type.
 */
class CredentialStatus
{
    private string $id;
    private int $revocationNonce;
    private string $type;

    /**
     * Constructs an CredentialStatus object with the specified parameters.
     * @param string $id
     * @param int $revocationNonce
     * @param string $type
     */
    public function __construct(string $id, int $revocationNonce, string $type)
    {
        $this->id = $id;
        $this->revocationNonce = $revocationNonce;
        $this->type = $type;
    }

    public static function fromProto(\Bloock\CredentialStatus $res): CredentialStatus
    {
        return new CredentialStatus($res->getId(), $res->getRevocationNonce(), $res->getType());
    }

    /**
     * Gets the ID associated with the credential.
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * Gets the revocation nonce associated with the credential.
     * @return int
     */
    public function getRevocationNonce(): int
    {
        return $this->revocationNonce;
    }

    /**
     * Gets the type of the credential.
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    public function toProto(): \Bloock\CredentialStatus
    {
        $p = new \Bloock\CredentialStatus();
        $p->setId($this->id);
        $p->setRevocationNonce($this->revocationNonce);
        $p->setType($this->type);
        return $p;
    }
}