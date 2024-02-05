<?php

namespace Bloock\Entity\Availability;

/**
 * Represents the arguments for a data publisher.
 */
class PublisherArgs
{
    public function toProto(): \Bloock\PublisherArgs
    {
        return new \Bloock\PublisherArgs();
    }
}