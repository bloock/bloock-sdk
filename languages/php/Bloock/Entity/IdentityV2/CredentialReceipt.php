<?php

namespace Bloock\Entity\IdentityV2;

class CredentialReceipt
{
    private Credential $credential;
    private string $credentialId;
    private string $credentialType;
    private int $anchorId;

    /**
     * @param Credential $credential
     * @param string $credentialId
     * @param string $credentialType
     * @param int $anchorId
     */
    public function __construct(Credential $credential, string $credentialId, string $credentialType, int $anchorId)
    {
        $this->credential = $credential;
        $this->credentialId = $credentialId;
        $this->credentialType = $credentialType;
        $this->anchorId = $anchorId;
    }

    public static function fromProto(\Bloock\CredentialReceiptV2 $res): CredentialReceipt
    {
        return new CredentialReceipt(Credential::fromProto($res->getCredential()), $res->getCredentialId(), $res->getCredentialType(), $res->getAnchorId());
    }

    /**
     * @return Credential
     */
    public function getCredential(): Credential
    {
        return $this->credential;
    }

    /**
     * @return string
     */
    public function getCredentialId(): string
    {
        return $this->credentialId;
    }

    /**
     * @return string
     */
    public function getCredentialType(): string
    {
        return $this->credentialType;
    }

    /**
     * @return int
     */
    public function getAnchorId(): int
    {
        return $this->anchorId;
    }

    public function toProto(): \Bloock\CredentialReceiptV2
    {
        $p = new \Bloock\CredentialReceiptV2();
        $p->setCredential($this->credential->toProto());
        $p->setCredentialId($this->credentialId);
        $p->setCredentialType($this->credentialType);
        $p->setAnchorId($this->anchorId);
        return $p;
    }
}