<?php

namespace Bloock\Entity\Identity;

class Identity
{
    private string $mnemonic;
    private string $key;
    private string $privateKey;

    /**
     * @param string $mnemonic
     * @param string $key
     * @param string $privateKey
     */
    public function __construct(string $mnemonic, string $key, string $privateKey)
    {
        $this->mnemonic = $mnemonic;
        $this->key = $key;
        $this->privateKey = $privateKey;
    }

    public static function fromProto(\Bloock\Identity $res): Identity
    {
        return new Identity($res->getMnemonic(), $res->getKey(), $res->getPrivateKey());
    }

    /**
     * @return string
     */
    public function getMnemonic(): string
    {
        return $this->mnemonic;
    }

    /**
     * @return string
     */
    public function getKey(): string
    {
        return $this->key;
    }

    /**
     * @return string
     */
    public function getPrivateKey(): string
    {
        return $this->privateKey;
    }

    public function toProto(): \Bloock\Identity
    {
        $p = new \Bloock\Identity();
        $p->setMnemonic($this->mnemonic);
        $p->setKey($this->key);
        $p->setPrivateKey($this->privateKey);
        return $p;
    }
}