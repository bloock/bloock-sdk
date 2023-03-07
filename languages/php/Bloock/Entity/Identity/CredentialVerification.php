<?php

namespace Bloock\Entity\Identity;

class CredentialVerification
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

    public static function fromProto(\Bloock\CredentialVerification $res): CredentialVerification
    {
        return new CredentialVerification($res->getTimestamp(), $res->getIssuer(), $res->getRevocation());
    }

    public function toProto(): \Bloock\CredentialVerification
    {
        $p = new \Bloock\CredentialVerification();
        $p->setTimestamp($this->timestamp);
        $p->setIssuer($this->issuer);
        $p->setRevocation($this->revocation);
        return $p;
    }
}