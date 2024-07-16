<?php

namespace Bloock\Entity\Availability;

use Bloock\DataAvailabilityType;

/**
 * Represents a loader for IPNS data availability.
 */
class IpnsLoader implements Loader
{
    private int $type;
    private LoaderArgs $args;

    /**
     * Constructs a IpnsLoader object with the specified parameters.
     * @param string $id
     */
    public function __construct(string $id)
    {
        $this->type = DataAvailabilityType::IPNS;
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