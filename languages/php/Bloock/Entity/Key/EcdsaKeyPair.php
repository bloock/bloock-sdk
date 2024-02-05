<?php

namespace Bloock\Entity\Key;

use Bloock\GenerateLocalKeyResponse;

/**
 * Represents an ecdsa key pair, with private and public key.
 */
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