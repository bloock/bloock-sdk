<?php

namespace Bloock\Entity\Key;

/**
 * Represents a secret used for secret-based access control.
 */
class AccessControlSecret
{
    public string $secret;

    /**
     * Creates a new AccessControlSecret instance with the provided secret.
     * @param string $secret
     */
    public function __construct(string $secret)
    {
        $this->secret = $secret;
    }

    public function toProto(): \Bloock\AccessControlSecret
    {
        $s = new \Bloock\AccessControlSecret();

        $s->setSecret($this->secret);

        return $s;
    }
}
