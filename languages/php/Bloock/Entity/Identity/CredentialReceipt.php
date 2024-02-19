<?php

namespace Bloock\Entity\Identity;

/**
 * Represents a receipt for a credential, including the credential itself, its ID, and type.
 */
class CredentialReceipt
{
    private Credential $credential;
    private string $credentialId;
    private string $credentialType;

    /**
     * Constructs an CredentialReceipt object with the specified parameters.
     * @param Credential $credential
     * @param string $credentialId
     * @param string $credentialType
     */
    public function __construct(Credential $credential, string $credentialId, string $credentialType)
    {
        $this->credential = $credential;
        $this->credentialId = $credentialId;
        $this->credentialType = $credentialType;
    }

    public static function fromProto(\Bloock\CredentialReceipt $res): CredentialReceipt
    {
        return new CredentialReceipt(Credential::fromProto($res->getCredential()), $res->getCredentialId(), $res->getCredentialType());
    }

    /**
     * Gets the credential object.
     * @return Credential
     */
    public function getCredential(): Credential
    {
        return $this->credential;
    }

    /**
     * Gets the ID associated with the credential.
     * @return string
     */
    public function getCredentialId(): string
    {
        return $this->credentialId;
    }

    /**
     * Gets the type of the credential.
     * @return string
     */
    public function getCredentialType(): string
    {
        return $this->credentialType;
    }

    public function toProto(): \Bloock\CredentialReceipt
    {
        $p = new \Bloock\CredentialReceipt();
        $p->setCredential($this->credential->toProto());
        $p->setCredentialId($this->credentialId);
        $p->setCredentialType($this->credentialType);
        return $p;
    }
}