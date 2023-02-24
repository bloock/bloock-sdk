<?php

namespace Bloock\Entity\Availability;

use Bloock\DataAvailabilityType;

class IpfsPublisher implements Publisher
{
    private int $type;
    private PublisherArgs $args;

    public function __construct() {
        $this->type = DataAvailabilityType::IPFS;
        $this->args = new PublisherArgs();
    }

    public function toProto(): \Bloock\Publisher {
        $p = new \Bloock\Publisher();
        $p->setType($this->type);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}