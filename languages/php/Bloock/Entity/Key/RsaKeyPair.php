<?php

namespace Bloock\Entity\Key;

use Bloock\GenerateLocalKeyResponse;

/**
 * Represents a rsa key pair, with private and public key.
 */
class RsaKeyPair extends KeyPair
{
    /**
     * Constructs a RsaKeyPair object with the specified parameters.
     * @param string $publicKey
     * @param string $privateKey
     */
    public function __construct(string $publicKey, string $privateKey)
    {
        parent::__construct($publicKey, $privateKey);
    }

    public static function fromProto(GenerateLocalKeyResponse $res): RsaKeyPair
    {
        return new RsaKeyPair($res->getLocalKey()->getKey(), $res->getLocalKey()->getPrivateKey());
    }
}