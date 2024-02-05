<?php

namespace Bloock\Entity\Availability;

use Bloock\DataAvailabilityType;

/**
 * Represents a loader for hosted data availability.
 */
class HostedLoader implements Loader
{
    private int $type;
    private LoaderArgs $args;

    /**
     * Constructs a HostedLoader object with the specified parameters.
     * @param string $id
     */
    public function __construct(string $id)
    {
        $this->type = DataAvailabilityType::HOSTED;
        $this->args = new LoaderArgs($id);
    }

    public function toProto(): \Bloock\Loader
    {
        $p = new \Bloock\Loader();
        $p->setType($this->type);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}