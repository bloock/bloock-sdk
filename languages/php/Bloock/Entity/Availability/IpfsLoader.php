<?php

namespace Bloock\Entity\Availability;

use Bloock\DataAvailabilityType;

class IpfsLoader implements Loader
{
    private int $type;
    private LoaderArgs $args;

    public function __construct(string $id) {
        $this->type = DataAvailabilityType::IPFS;
        $this->args = new LoaderArgs($id);
    }

    public function toProto(): \Bloock\Loader {
        $p = new \Bloock\Loader();
        $p->setType($this->type);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}