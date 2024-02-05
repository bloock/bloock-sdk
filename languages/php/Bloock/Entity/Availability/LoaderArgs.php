<?php

namespace Bloock\Entity\Availability;

/**
 * Represents the arguments for a data loader.
 */
class LoaderArgs
{
    private string $id;

    /**
     * Constructs a LoaderArgs object with the specified parameters.
     * @param string $id
     */
    public function __construct(string $id)
    {
        $this->id = $id;
    }

    public function toProto(): \Bloock\LoaderArgs
    {
        $p = new \Bloock\LoaderArgs();
        $p->setId($this->id);
        return $p;
    }
}