<?php

namespace Bloock\Entity\Key;

class ManagedKeyParams
{
    public ?string $name;
    public string $protection;
    public string $keyType;
    public ?int $expiration;

    /**
     * @param ?string $name
     * @param string $protection
     * @param string $keyType
     * @param ?int $expiration
     */
    public function __construct(string $protection, string $keyType, string $name = null, int $expiration = null)
    {
        $this->name = $name;
        $this->protection = $protection;
        $this->keyType = $keyType;
        $this->expiration = $expiration;
    }

    public function toProto(): \Bloock\ManagedKeyParams {
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

    public static function fromProto(\Bloock\ManagedKeyParams $res): ManagedKeyParams {
        return new ManagedKeyParams(
            $res->getName(),
            $res->getProtection(),
            $res->getKeyType(),
            $res->getExpiration()
        );
    }
}