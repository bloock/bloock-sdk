<?php

namespace Bloock\Entity;

interface Signer
{
    public function toProto(): \Bloock\Signer;
}