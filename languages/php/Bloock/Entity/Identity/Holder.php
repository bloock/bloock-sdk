<?php

namespace Bloock\Entity\Identity;

use Bloock\Entity\Key\Key;

/**
 * Represents a Holder identity.
 */
class Holder
{
    private Did $did;
    private Key $key;

    /**
     * Returns a new instance of Holder identity for the given parameters.
     * @param string $did
     * @param DidMethod $didMethod
     */
    public function __construct(string $did, DidMethod $didMethod, Key $key)
    {
        $this->did = new Did($did, $didMethod);
        $this->key = $key;
    }

     /**
     * Gets the did object of the holder.
     * @return Did
     */
    public function getDid(): Did
    {
        return $this->did;
    }

    /**
     * Gets the key object of the holder.
     * @return Key
     */
    public function getKey(): Key
    {
        return $this->key;
    }
}