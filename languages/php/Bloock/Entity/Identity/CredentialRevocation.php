<?php

namespace Bloock\Entity\Identity;

class CredentialRevocation
{
    private int $timestamp;
    private string $issuer;
    private int $revocation;

    /**
     * @param int $timestamp
     * @param string $issuer
     * @param int $revocation
     */
    public function __construct(int $timestamp, string $issuer, int $revocation)
    {
        $this->timestamp = $timestamp;
        $this->issuer = $issuer;
        $this->revocation = $revocation;
    }

    public function toProto(): \Bloock\CredentialVerification {
        $p = new \Bloock\CredentialVerification();
        $p->setTimestamp($this->timestamp);
        $p->setIssuer($this->issuer);
        $p->setRevocation($this->revocation);
        return $p;
    }

    public static function fromProto(\Bloock\CredentialVerification $res): CredentialRevocation {
        return new CredentialRevocation($res->getTimestamp(), $res->getIssuer(), $res->getRevocation());
    }
}