<?php

namespace Bloock\Entity\Key;

/**
 * Represents a pair of public and private keys.
 */
class KeyPair
{
    public string $publicKey;
    public string $privateKey;

    /**
     * Constructs a KeyPair object with the specified parameters.
     * @param string $publicKey
     * @param string $privateKey
     */
    public function __construct(string $publicKey, string $privateKey)
    {
        $this->publicKey = $publicKey;
        $this->privateKey = $privateKey;
    }

    /**
     * Gets the public key.
     * @return string
     */
    public function getPublicKey(): string
    {
        return $this->publicKey;
    }

    /**
     * Gets the private key.
     * @return string
     */
    public function getPrivateKey(): string
    {
        return $this->privateKey;
    }
}