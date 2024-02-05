<?php

namespace Bloock\Entity\IdentityV2;

/**
 * Represents the schema information for a credential, including its ID and type.
 */
class CredentialSchema
{
    private string $id;
    private string $type;

    /**
     * Constructs an CredentialSchema object with the specified parameters.
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
     * Gets the id of the credential.
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * Gets the type of the credential.
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