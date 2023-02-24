<?php

namespace Bloock\Entity\Availability;

class PublisherArgs
{
    public function toProto(): \Bloock\PublisherArgs {
        return new \Bloock\PublisherArgs();
    }
}