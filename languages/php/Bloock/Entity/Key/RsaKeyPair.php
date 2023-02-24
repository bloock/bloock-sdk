<?php

namespace Bloock\Entity\Key;

use Bloock\GenerateLocalKeyResponse;

class RsaKeyPair extends KeyPair
{
    public function __construct(string $publicKey, string $privateKey)
    {
        parent::__construct($publicKey, $privateKey);
    }

    public static function fromProto(GenerateLocalKeyResponse $res): RsaKeyPair {
        return new RsaKeyPair($res->getLocalKey()->getKey(), $res->getLocalKey()->getPrivateKey());
    }
}