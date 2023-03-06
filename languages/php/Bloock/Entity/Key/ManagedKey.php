<?php

namespace Bloock\Entity\Key;

class ManagedKey
{
    public ?string $name;
    public string $protection;
    public string $keyType;
    public ?int $expiration;

    public string $key;

    /**
     * @param ?string $name
     * @param string $protection
     * @param string $keyType
     * @param ?int $expiration
     * @param string $key
     */
    public function __construct(?string $name, string $protection, string $keyType, ?int $expiration, string $key)
    {
        $this->name = $name;
        $this->protection = $protection;
        $this->keyType = $keyType;
        $this->expiration = $expiration;
        $this->key = $key;
    }

    public static function fromProto(\Bloock\ManagedKey $res): ManagedKey
    {
        return new ManagedKey($res->getName(), KeyProtectionLevel::fromProto($res->getProtection()), KeyType::fromProto($res->getKeyType()), $res->getExpiration(), $res->getKey());
    }

    public function toProto(): \Bloock\ManagedKey
    {
        $p = new \Bloock\ManagedKey();
        $p->setName($this->name);
        $p->setProtection(KeyProtectionLevel::toProto($this->protection));
        $p->setKeyType(KeyType::toProto($this->keyType));
        $p->setExpiration($this->expiration);
        $p->setKey($this->key);
        return $p;
    }
}