<?php

namespace Bloock\Entity\Key;

/**
 * Represents a managed certificate with its details.
 */
class ManagedCertificate
{
    /**
     * Is the identifier of the managed certificate (ex: 2abae00b-f3d9-410c-abdf-1ea391d633aa).
     * @var string
     */
    public string $id;
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
     * Is the timestamp indicating when the certificate expires.
     * @var int|null
     */
    public ?int $expiration;
    /**
     * Is the certificate public key.
     * @var string
     */
    public string $key;

    /**
     * Constructs a ManagedCertificate object with the specified parameters.
     * @param string $id
     * @param string $protection
     * @param string $keyType
     * @param int|null $expiration
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