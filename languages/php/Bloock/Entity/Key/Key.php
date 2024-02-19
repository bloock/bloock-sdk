<?php

namespace Bloock\Entity\Key;

use Exception;
use Bloock\Entity\Key\LocalKey;
use Bloock\Entity\Key\ManagedKey;

/**
 * Represents a key entity that can be either a ManagedKey or a LocalKey.
 */
class Key
{
    public ?LocalKey $localKey = null;
    public ?ManagedKey $managedKey = null;

    /**
     * Creates a Key instance with a local or managed key.
     * @param $key
     * @throws Exception
     */
    public function __construct($key)
    {
        if ($key instanceof LocalKey) {
            $this->localKey = $key;
        } else if ($key instanceof ManagedKey) {
            $this->managedKey = $key;
        } else {
            throw new Exception("Invalid key provided");
        }
    }

    public function toProto(): \Bloock\Key
    {
        $s = new \Bloock\Key();

        if ($this->localKey != null) {
            $s->setLocalKey($this->localKey->toProto());
        }

        if ($this->managedKey != null) {
            $s->setManagedKey($this->managedKey->toProto());
        }

        return $s;
    }
}
