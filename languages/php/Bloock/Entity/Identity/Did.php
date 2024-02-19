<?php

namespace Bloock\Entity\Identity;

/**
 * Represents a DID.
 */
class Did
{
    private string $did;
    private DidType $didType;

    /**
     * Returns a new instance of Did for the given parameters.
     * @param string $did
     * @param DidType $didType
     */
    public function __construct(string $did, DidType $didType)
    {
        $this->did = $did;
        $this->didType = $didType;
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
     * Gets the did type.
     * @return DidType
     */
    public function getDidType(): DidType
    {
        return $this->didType;
    }
}
