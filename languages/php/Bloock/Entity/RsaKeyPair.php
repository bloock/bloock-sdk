<?php

namespace Bloock\Entity;

use Bloock\GenerateRsaKeyPairResponse;

class RsaKeyPair extends KeyPair
{
    public function __construct(string $publicKey, string $privateKey)
    {
        parent::__construct($publicKey, $privateKey);
    }

    public static function fromProto(GenerateRsaKeyPairResponse $res): RsaKeyPair {
        return new RsaKeyPair($res->getPublicKey(), $res->getPrivateKey());
    }
}