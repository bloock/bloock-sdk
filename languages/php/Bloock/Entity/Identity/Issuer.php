<?php

namespace Bloock\Entity\Identity;

use Bloock\Entity\Key\Key;

/**
 * Represents an Issuer identity.
 */
class Issuer
{
    private Did $did;
    private Key $key;

    /**
     * Returns a new instance of Issuer identity for the given parameters.
     * @param string $did
     * @param DidMethod $didMethod
     */
    public function __construct(string $did, DidMethod $didMethod, Key $key)
    {
        $this->did = new Did($did, $didMethod);
        $this->key = $key;
    }

     /**
     * Gets the did object of the issuer.
     * @return Did
     */
    public function getDid(): Did
    {
        return $this->did;
    }

    /**
     * Gets the key object of the issuer.
     * @return Key
     */
    public function getKey(): Key
    {
        return $this->key;
    }
}