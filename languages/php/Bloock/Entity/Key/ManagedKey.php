<?php

namespace Bloock\Entity\Key;

use Bloock\Entity\Key\AccessControlType;

/**
 * Represents a managed key.
 */
class ManagedKey
{
    /**
     * Is the unique identifier of the managed key (ex: 46c49ee7-ef44-472c-a873-ce81a2d5d764).
     * @var string
     */
    public string $id;
    /**
     * Is the name of the managed key.
     * @var string|null
     */
    public ?string $name;
    /**
     * Is the protection level for the key.
     * @var string
     */
    public string $protection;
    /**
     * Is the type of the key.
     * @var string
     */
    public string $keyType;
    /**
     * Is the timestamp indicating when the key expires.
     * @var int|null
     */
    public ?int $expiration;
    /**
     * Is the actual public key.
     * @var string
     */
    public string $key;
    /**
     * Is the access control type for the key.
     * @var string
     */
    public string $accessControlType;

    /**
     * Constructs a ManagedKey object with the specified parameters.
     * @param string $id
     * @param string|null $name
     * @param string $protection
     * @param string $keyType
     * @param int|null $expiration
     * @param string $key
     * @param string $accessControlType
     */
    public function __construct(string $id, ?string $name, string $protection, string $keyType, ?int $expiration, string $key, string $accessControlType)
    {
        $this->id = $id;
        $this->name = $name;
        $this->protection = $protection;
        $this->keyType = $keyType;
        $this->expiration = $expiration;
        $this->key = $key;
        $this->accessControlType = $accessControlType;
    }

    public static function fromProto(\Bloock\ManagedKey $res): ManagedKey
    {
        return new ManagedKey($res->getId(), $res->getName(), KeyProtectionLevel::fromProto($res->getProtection()), KeyType::fromProto($res->getKeyType()), $res->getExpiration(), $res->getKey(), AccessControlType::fromProto($res->getAccessControlType()));
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
        $p->setAccessControlType(AccessControlType::toProto($this->protection));
        return $p;
    }
}
