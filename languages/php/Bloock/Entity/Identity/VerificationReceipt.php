<?php

namespace Bloock\Entity\Identity;

/**
 * Represents a receipt for a verification session.
 */
class VerificationReceipt
{
    private int $sessionID;
    private string $verificationRequest;

    /**
     * Constructs a VerificationReceipt object with the specified parameters.
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
     * Gets the session id of the verification.
     * @return int
     */
    public function getSessionID(): int
    {
        return $this->sessionID;
    }

    /**
     * Gets the verification request json.
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
