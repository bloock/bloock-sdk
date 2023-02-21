<?php

namespace Bloock\Entity;

use Bloock\GenerateEcdsaKeysResponse;

class EcdsaKeyPair extends KeyPair
{
    public function __construct(string $publicKey, string $privateKey)
    {
        parent::__construct($publicKey, $privateKey);
    }

    public static function fromProto(GenerateEcdsaKeysResponse $res): EcdsaKeyPair {
        return new EcdsaKeyPair($res->getPublicKey(), $res->getPrivateKey());
    }
}