<?php

namespace Bloock\Entity\IdentityV2;

class BjjIssuerKey implements IssuerKey
{
    public IssuerKeyArgs $args;

    public function __construct(IssuerKeyArgs $args)
    {
        $this->args = $args;
    }

    public function toProto(): \Bloock\IssuerKey
    {
        $s = new \Bloock\IssuerKey();

        if ($this->args->localKey != null) {
            $s->setLocalKey($this->args->localKey->toProto());
        }

        if ($this->args->managedKey != null) {
            $s->setManagedKey($this->args->managedKey->toProto());
        }

        return $s;
    }
}