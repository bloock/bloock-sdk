<?php

namespace Bloock\Entity\Key;

use Google\Protobuf\Internal\RepeatedField;

class TotpAccessControlReceipt
{
    public string $secret;
    public string $secretQr;
    public RepeatedField $recoveryCodes;

    public function __construct(string $secret, string $secretQr, RepeatedField $recoveryCodes)
    {
        $this->secret = $secret;
        $this->secretQr = $secretQr;
        $this->recoveryCodes = $recoveryCodes;
    }

    public function getSecret(): string
    {
        return $this->secret;
    }

    public function getSecretQr(): string
    {
        return $this->secretQr;
    }

    public function getRecoveryCodes(): RepeatedField
    {
        return $this->recoveryCodes;
    }
}
