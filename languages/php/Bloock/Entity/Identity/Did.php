<?php

namespace Bloock\Entity\Identity;

/**
 * Represents a DID.
 */
class Did
{
    private string $did;
    private DidMethod $didMethod;

    /**
     * Returns a new instance of Did for the given parameters.
     * @param string $did
     * @param DidMethod $didMethod
     */
    public function __construct(string $did, DidMethod $didMethod)
    {
        $this->did = $did;
        $this->didMethod = $didMethod;
    }

     /**
     * Gets the raw did identifier.
     * @return string
     */
    public function getDid(): string
    {
        return $this->did;
    }

    /**
     * Gets the did method.
     * @return DidMethod
     */
    public function getDidMethod(): DidMethod
    {
        return $this->didMethod;
    }
}
