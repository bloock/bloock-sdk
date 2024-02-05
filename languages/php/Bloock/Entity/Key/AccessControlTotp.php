<?php

namespace Bloock\Entity\Key;

/**
 * Represents a Time-based One-Time Password ([TOTP](https://datatracker.ietf.org/doc/html/rfc6238)) code used for access control.
 */
class AccessControlTotp
{
    public string $code;

    /**
     * Constructs an AccessControlTotp object with the specified parameters.
     * @param string $code
     */
    public function __construct(string $code)
    {
        $this->code = $code;
    }

    public function toProto(): \Bloock\AccessControlTotp
    {
        $s = new \Bloock\AccessControlTotp();

        $s->setCode($this->code);

        return $s;
    }
}
