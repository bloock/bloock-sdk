<?php

namespace Bloock\Entity\Key;

class ManagedKey
{
    public string $id;
    public ?string $name;
    public string $protection;
    public string $keyType;
    public ?int $expiration;

    public string $key;

    /**
     * @param string $id
     * @param ?string $name
     * @param string $protection
     * @param string $keyType
     * @param ?int $expiration
     * @param string $key
     */
    public function __construct(string $id, ?string $name, string $protection, string $keyType, ?int $expiration, string $key)
    {
        $this->id = $id;
        $this->name = $name;
        $this->protection = $protection;
        $this->keyType = $keyType;
        $this->expiration = $expiration;
        $this->key = $key;
    }

    public static function fromProto(\Bloock\ManagedKey $res): ManagedKey
    {
        return new ManagedKey($res->getId(), $res->getName(), KeyProtectionLevel::fromProto($res->getProtection()), KeyType::fromProto($res->getKeyType()), $res->getExpiration(), $res->getKey());
    }

    public function toProto(): \Bloock\ManagedKey
    {
        $p = new \Bloock\ManagedKey();
        $p->setId($this->id);
        $p->setName($this->name);
        $p->setProtection(KeyProtectionLevel::toProto($this->protection));
        $p->setKeyType(KeyType::toProto($this->keyType));
        $p->setExpiration($this->expiration);
        $p->setKey($this->key);
        return $p;
    }
}