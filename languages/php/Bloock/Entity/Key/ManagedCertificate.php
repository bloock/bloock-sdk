<?php

namespace Bloock\Entity\Key;

class ManagedCertificate
{
    public string $id;
    public string $protection;
    public string $keyType;
    public ?int $expiration;
    public string $key;

    /**
     * @param string $id
     * @param string $protection
     * @param string $keyType
     * @param ?int $expiration
     * @param string $key
     */
    public function __construct(string $id, string $protection, string $keyType, ?int $expiration, string $key)
    {
        $this->id = $id;
        $this->protection = $protection;
        $this->keyType = $keyType;
        $this->expiration = $expiration;
        $this->key = $key;
    }

    public static function fromProto(\Bloock\ManagedCertificate $res): ManagedCertificate
    {
        return new ManagedCertificate($res->getId(), KeyProtectionLevel::fromProto($res->getProtection()), KeyType::fromProto($res->getKeyType()), $res->getExpiration(), $res->getKey());
    }

    public function toProto(): \Bloock\ManagedCertificate
    {
        $p = new \Bloock\ManagedCertificate();
        $p->setId($this->id);
        $p->setProtection(KeyProtectionLevel::toProto($this->protection));
        $p->setKeyType(KeyType::toProto($this->keyType));
        $p->setExpiration($this->expiration);
        $p->setKey($this->key);
        return $p;
    }
}