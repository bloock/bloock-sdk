<?php

namespace Bloock\Entity\Key;

/**
 * Represents a local key with its public and private components.
 */
class LocalKey
{
    /**
     * Is the public key.
     * @var string
     */
    public string $key;
    /**
     * Is the private key.
     * @var string
     */
    public string $privateKey;
    /**
     * Is the type of the key.
     * @var string
     */
    public string $keyType;

    /**
     * Constructs a LocalKey object with the specified parameters.
     * @param string $key
     * @param string $privateKey
     * @param string $keyType
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
