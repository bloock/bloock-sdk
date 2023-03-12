<?php

namespace Bloock\Entity\Identity;

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

    public static function fromProto(\Bloock\CredentialSchema $res): CredentialSchema
    {
        return new CredentialSchema($res->getId(), $res->getType());
    }

    public function toProto(): \Bloock\CredentialSchema
    {
        $p = new \Bloock\CredentialSchema();
        $p->setId($this->id);
        $p->setType($this->type);
        return $p;
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
}