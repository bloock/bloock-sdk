<?php

namespace Bloock\Entity\Encryption;

interface Decrypter
{
    function toProto(): \Bloock\Decrypter;
}