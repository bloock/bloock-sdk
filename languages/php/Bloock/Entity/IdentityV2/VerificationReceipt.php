<?php

namespace Bloock\Entity\IdentityV2;

class VerificationReceipt
{
    private int $sessionID;
    private string $verificationRequest;

    /**
     * @param int $sessionID
     * @param string $verificationRequest
     */
    public function __construct(int $sessionID, string $verificationRequest)
    {
        $this->sessionID = $sessionID;
        $this->verificationRequest = $verificationRequest;
    }

    public static function fromProto(\Bloock\VerificationReceipt $res): VerificationReceipt
    {
        return new VerificationReceipt($res->getSessionId(), $res->getVerificationRequest());
    }

    /**
     * @return int
     */
    public function getSessionID(): int
    {
        return $this->sessionID;
    }

    /**
     * @return string
     */
    public function getVerificationRequest(): string
    {
        return $this->verificationRequest;
    }

    public function toProto(): \Bloock\VerificationReceipt
    {
        $p = new \Bloock\VerificationReceipt();
        $p->setSessionId($this->sessionID);
        $p->setVerificationRequest($this->verificationRequest);
        return $p;
    }
}
