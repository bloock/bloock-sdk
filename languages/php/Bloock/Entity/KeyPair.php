<?php

namespace Bloock\Entity;

class KeyPair
{
    public string $publicKey;
    public string $privateKey;

    public function __construct(string $publicKey, string $privateKey)
    {
        $this->publicKey = $publicKey;
        $this->privateKey = $privateKey;
    }

    public function getPublicKey(): string {
        return $this->publicKey;
    }

    public function getPrivateKey(): string {
        return $this->privateKey;
    }
}