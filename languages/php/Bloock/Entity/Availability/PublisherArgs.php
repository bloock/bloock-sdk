<?php

namespace Bloock\Entity\Availability;

/**
 * Represents the arguments for a data publisher.
 */
class PublisherArgs
{

    private IpnsKey $ipnsKey;

    /**
     * Constructs a IpnsKey a publisher for IPFS data availability.
     * @param IpnsKey $ipnsKey
     */
    public function __construct(IpnsKey $ipnsKey)
    {
        $this->ipnsKey = $ipnsKey;
    }

    public function toProto(): \Bloock\PublisherArgs
    {
        $p = new \Bloock\PublisherArgs();
        $p->setIpnsKey($this->ipnsKey);
        return $p;
    }
}