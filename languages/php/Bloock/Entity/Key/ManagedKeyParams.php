<?php

namespace Bloock\Entity\Key;

/**
 * Represents the parameters for creating a managed key.
 */
class ManagedKeyParams
{
    /**
     * Is the name of the managed key.
     * @var string|null
     */
    public ?string $name;
    /**
     * Is the protection level for the key.
     * Is the protection level for the key.
     * @var string
     */
    public string $protection;
    /**
     * Is the timestamp indicating when the key expires.
     * @var string
     */
    public string $keyType;
    /**
     * Is the type of the key.
     * @var int|null
     */
    public ?int $expiration;

    /**
     * Constructs a ManagedKeyParams object with the specified parameters.
     * @param string $protection
     * @param string $keyType
     * @param string|null $name
     * @param int|null $expiration
     */
    public function __construct(string $protection, string $keyType, ?string $name = null, ?int $expiration = null)
    {
        $this->name = $name;
        $this->protection = $protection;
        $this->keyType = $keyType;
        $this->expiration = $expiration;
    }

    public static function fromProto(\Bloock\ManagedKeyParams $res): ManagedKeyParams
    {
        return new ManagedKeyParams(
            $res->getName(),
            $res->getProtection(),
            $res->getKeyType(),
            $res->getExpiration()
        );
    }

    public function toProto(): \Bloock\ManagedKeyParams
    {
        $p = new \Bloock\ManagedKeyParams();
        $p->setProtection(KeyProtectionLevel::toProto($this->protection));
        $p->setKeyType(KeyType::toProto($this->keyType));

        if ($this->name != null) {
            $p->setName($this->name);
        }

        if ($this->expiration != null) {
            $p->setExpiration($this->expiration);
        }
        return $p;
    }
}