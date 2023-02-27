<?php

namespace Bloock\Entity\Encryption;

interface Encrypter
{
    function toProto(): \Bloock\Encrypter;
}