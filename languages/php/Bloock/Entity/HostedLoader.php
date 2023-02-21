<?php

namespace Bloock\Entity;

use Bloock\DataAvailabilityType;

class HostedLoader implements Loader
{
    private int $type;
    private LoaderArgs $args;

    public function __construct(string $id) {
        $this->type = DataAvailabilityType::HOSTED;
        $this->args = new LoaderArgs($id);
    }

    public function toProto(): \Bloock\Loader {
        $p = new \Bloock\Loader();
        $p->setType($this->type);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}