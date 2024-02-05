<?php

namespace Bloock\Entity\Availability;

use Bloock\DataAvailabilityType;

/**
 * Represents a publisher for IPFS data availability.
 */
class IpfsPublisher implements Publisher
{
    private int $type;
    private PublisherArgs $args;

    /**
     * Constructs a IpfsPublisher object with the specified parameters.
     */
    public function __construct()
    {
        $this->type = DataAvailabilityType::IPFS;
        $this->args = new PublisherArgs();
    }

    public function toProto(): \Bloock\Publisher
    {
        $p = new \Bloock\Publisher();
        $p->setType($this->type);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}