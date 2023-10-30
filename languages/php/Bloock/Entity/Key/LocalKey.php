<?php

namespace Bloock\Entity\Key;

class LocalKey
{
    public string $key;
    public string $privateKey;
    public string $keyType;

    /**
     * @param string $key
     * @param string $privateKey
     */
    public function __construct(string $key, string $privateKey, string $keyType)
    {
        $this->key = $key;
        $this->privateKey = $privateKey;
        $this->keyType = $keyType;
    }

    public static function fromProto(\Bloock\LocalKey $res): LocalKey
    {
        return new LocalKey($res->getKey(), $res->getPrivateKey(), KeyType::fromProto($res->getKeyType()));
    }

    public function toProto(): \Bloock\LocalKey
    {
        $p = new \Bloock\LocalKey();
        $p->setKey($this->key);
        $p->setPrivateKey($this->privateKey);
        $p->setKeyType(KeyType::toProto($this->keyType));

        return $p;
    }
}
