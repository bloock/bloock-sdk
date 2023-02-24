<?php

namespace Bloock\Entity\Key;

class ManagedKey
{
    public string $name;
    public int $protection;
    public int $keyType;
    public int $expiration;

    public string $key;

    /**
     * @param string $name
     * @param int $protection
     * @param int $keyType
     * @param int $expiration
     * @param string $key
     */
    public function __construct(string $name, int $protection, int $keyType, int $expiration, string $key)
    {
        $this->name = $name;
        $this->protection = $protection;
        $this->keyType = $keyType;
        $this->expiration = $expiration;
        $this->key = $key;
    }

    public function toProto(): \Bloock\ManagedKey {
        $p = new \Bloock\ManagedKey();
        $p->setName($this->name);
        $p->setProtection($this->protection);
        $p->setKeyType($this->keyType);
        $p->setExpiration($this->expiration);
        $p->setKey($this->key);
        return $p;
    }

    public static function fromProto(\Bloock\ManagedKey $res): ManagedKey {
        return new ManagedKey($res->getName(), $res->getProtection(), $res->getKeyType(), $res->getExpiration(), $res->getKey());
    }
}