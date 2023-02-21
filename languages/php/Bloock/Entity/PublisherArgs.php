<?php

namespace Bloock\Entity;

class PublisherArgs
{
    public function toProto(): \Bloock\PublisherArgs {
        return new \Bloock\PublisherArgs();
    }
}