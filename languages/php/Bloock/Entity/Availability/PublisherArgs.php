<?php

namespace Bloock\Entity\Availability;

/**
 * Represents the arguments for a data publisher.
 */
class PublisherArgs
{
    public ?IpnsKey $ipnsKey = null;

    /**
     * Constructs a IpnsKey a publisher for IPFS data availability.
     * @param IpnsKey $ipnsKey
     */
    public function __construct(?IpnsKey $ipnsKey = null)
    {
        if ($ipnsKey != null) {
            $this->ipnsKey = $ipnsKey;
        }
    }

    public function toProto(): \Bloock\PublisherArgs
    {
        $p = new \Bloock\PublisherArgs();

        if ($this->ipnsKey != null) {
            $p->setIpnsKey($this->ipnsKey->toProto());
        }

        return $p;
    }
}