<?php

namespace Bloock\Entity\IdentityV2;

interface IdentityKey
{
    public function toProto(): \Bloock\IdentityKey;
}
