<?php

namespace Bloock\Entity\Key;

class AccessControlTotp
{
    public string $code;

    /**
     * @throws Exception
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
