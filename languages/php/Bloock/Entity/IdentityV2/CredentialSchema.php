<?php

namespace Bloock\Entity\IdentityV2;

class CredentialSchema
{
    private string $id;
    private string $type;

    /**
     * @param string $id
     * @param string $type
     */
    public function __construct(string $id, string $type)
    {
        $this->id = $id;
        $this->type = $type;
    }

    public static function fromProto(\Bloock\CredentialSchemaV2 $res): CredentialSchema
    {
        return new CredentialSchema($res->getId(), $res->getType());
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    public function toProto(): \Bloock\CredentialSchemaV2
    {
        $p = new \Bloock\CredentialSchemaV2();
        $p->setId($this->id);
        $p->setType($this->type);
        return $p;
    }
}