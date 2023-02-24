<?php

namespace Bloock\Entity\Availability;

interface Publisher
{
    public function toProto(): \Bloock\Publisher;
}