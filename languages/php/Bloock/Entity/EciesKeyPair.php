<?php

namespace Bloock\Entity;

use Bloock\GenerateEcdsaKeysResponse;
use Bloock\GenerateEciesKeyPairResponse;

class EciesKeyPair extends KeyPair
{
    public function __construct(string $publicKey, string $privateKey)
    {
        parent::__construct($publicKey, $privateKey);
    }

    public static function fromProto(GenerateEciesKeyPairResponse $res): EciesKeyPair {
        return new EciesKeyPair($res->getPublicKey(), $res->getPrivateKey());
    }
}