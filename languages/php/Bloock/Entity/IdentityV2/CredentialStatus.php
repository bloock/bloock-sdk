<?php

namespace Bloock\Entity\IdentityV2;

class CredentialStatus
{
    private string $id;
    private int $revocationNonce;
    private string $type;

    /**
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

    public static function fromProto(\Bloock\CredentialStatusV2 $res): CredentialStatus
    {
        return new CredentialStatus($res->getId(), $res->getRevocationNonce(), $res->getType());
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getRevocationNonce(): int
    {
        return $this->revocationNonce;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    public function toProto(): \Bloock\CredentialStatusV2
    {
        $p = new \Bloock\CredentialStatusV2();
        $p->setId($this->id);
        $p->setRevocationNonce($this->revocationNonce);
        $p->setType($this->type);
        return $p;
    }
}