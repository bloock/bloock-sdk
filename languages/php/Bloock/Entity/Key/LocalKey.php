<?php

namespace Bloock\Entity\Key;

class LocalKey
{
    public string $key;
    public string $privateKey;

    /**
     * @param string $key
     * @param string $privateKey
     */
    public function __construct(string $key, string $privateKey)
    {
        $this->key = $key;
        $this->privateKey = $privateKey;
    }

    public function toProto(): \Bloock\LocalKey {
        $p = new \Bloock\LocalKey();
        $p->setKey($this->key);
        $p->setPrivateKey($this->privateKey);
        return $p;
    }

    public static function fromProto(\Bloock\LocalKey $res): LocalKey {
        return new LocalKey($res->getKey(), $res->getPrivateKey());
    }
}