<?php

namespace Bloock\Entity\IdentityV2;

/**
 * Represents an identity BJJ key used.
 */
class BjjIdentityKey implements IdentityKey
{
    public IdentityKeyArgs $args;

    /**
     * Creates a new BjjIdentityKey instance with the provided issuer key arguments.
     * @param IdentityKeyArgs $args
     */
    public function __construct(IdentityKeyArgs $args)
    {
        $this->args = $args;
    }

    public function toProto(): \Bloock\IdentityKey
    {
        $s = new \Bloock\IdentityKey();

        if ($this->args->localKey != null) {
            $s->setLocalKey($this->args->localKey->toProto());
        }

        if ($this->args->managedKey != null) {
            $s->setManagedKey($this->args->managedKey->toProto());
        }

        return $s;
    }
}
