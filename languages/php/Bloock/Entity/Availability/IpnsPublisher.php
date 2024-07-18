<?php

namespace Bloock\Entity\Availability;

use Bloock\DataAvailabilityType;

/**
 * Represents a publisher for IPNS data availability.
 */
class IpnsPublisher implements Publisher
{
    private int $type;
    private PublisherArgs $args;

    /**
     * Constructs a IpnsPublisher object with the specified parameters.
     */
    public function __construct($key)
    {
        $this->type = DataAvailabilityType::IPNS;
        $this->args = new PublisherArgs($key);
    }

    public function toProto(): \Bloock\Publisher
    {
        $p = new \Bloock\Publisher();
        $p->setType($this->type);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}