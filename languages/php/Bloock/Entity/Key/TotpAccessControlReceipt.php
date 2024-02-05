<?php

namespace Bloock\Entity\Key;

use Google\Protobuf\Internal\RepeatedField;

/**
 * Represents a receipt for a Time-based One-Time Password (TOTP) access control.
 */
class TotpAccessControlReceipt
{
    public string $secret;
    public string $secretQr;
    public RepeatedField $recoveryCodes;

    /**
     * Creates a new TotpAccessControlReceipt with the provided secret, secret QR code, and recovery codes.
     * @param string $secret
     * @param string $secretQr
     * @param RepeatedField $recoveryCodes
     */
    public function __construct(string $secret, string $secretQr, RepeatedField $recoveryCodes)
    {
        $this->secret = $secret;
        $this->secretQr = $secretQr;
        $this->recoveryCodes = $recoveryCodes;
    }

    /**
     * Gets the secret of the totp access control receipt.
     * @return string
     */
    public function getSecret(): string
    {
        return $this->secret;
    }

    /**
     * Gets the secret qr of the totp access control receipt.
     * @return string
     */
    public function getSecretQr(): string
    {
        return $this->secretQr;
    }

    /**
     * Gets the recovery codes of the totp access control receipt.
     * @return RepeatedField
     */
    public function getRecoveryCodes(): RepeatedField
    {
        return $this->recoveryCodes;
    }
}
