<?php

namespace Bloock\Entity\Key;

class ManagedKeyParams
{
    public ?string $name;
    public int $protection;
    public int $keyType;
    public ?int $expiration;

    /**
     * @param ?string $name
     * @param int $protection
     * @param int $keyType
     * @param ?int $expiration
     */
    public function __construct(int $protection, int $keyType, string $name = null, int $expiration = null)
    {
        $this->name = $name;
        $this->protection = $protection;
        $this->keyType = $keyType;
        $this->expiration = $expiration;
    }

    public function toProto(): \Bloock\ManagedKeyParams {
        $p = new \Bloock\ManagedKeyParams();
        $p->setName($this->name);
        $p->setProtection($this->protection);
        $p->setKeyType($this->keyType);
        $p->setExpiration($this->expiration);
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