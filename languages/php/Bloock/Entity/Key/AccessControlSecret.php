<?php

namespace Bloock\Entity\Key;

class AccessControlSecret
{
    public string $secret;

    /**
     * @throws Exception
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
