<?php

namespace Bloock\Entity\Availability;

class LoaderArgs
{
    private string $id;

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