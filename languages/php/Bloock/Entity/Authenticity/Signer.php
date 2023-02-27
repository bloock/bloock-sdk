<?php

namespace Bloock\Entity\Authenticity;

interface Signer
{
    public function toProto(): \Bloock\Signer;
}