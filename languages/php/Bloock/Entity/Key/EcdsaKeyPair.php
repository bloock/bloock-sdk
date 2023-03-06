<?php

namespace Bloock\Entity\Key;

use Bloock\GenerateLocalKeyResponse;

class EcdsaKeyPair extends KeyPair
{
    public function __construct(string $publicKey, string $privateKey)
    {
        parent::__construct($publicKey, $privateKey);
    }

    public static function fromProto(GenerateLocalKeyResponse $res): EcdsaKeyPair
    {
        return new EcdsaKeyPair($res->getLocalKey()->getKey(), $res->getLocalKey()->getPrivateKey());
    }
}