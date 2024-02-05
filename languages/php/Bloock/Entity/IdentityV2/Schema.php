<?php

namespace Bloock\Entity\IdentityV2;

/**
 * Represents a schema with its attributes.
 */
class Schema
{
    private string $cid;
    private string $cidJsonLd;
    private string $schemaType;
    private string $json;

    /**
     * Constructs a Schema object with the specified parameters.
     * @param string $cid
     * @param string $cidJsonLd
     * @param string $schemaType
     * @param string $json
     */
    public function __construct(string $cid, string $cidJsonLd, string $schemaType, string $json)
    {
        $this->cid = $cid;
        $this->cidJsonLd = $cidJsonLd;
        $this->schemaType = $schemaType;
        $this->json = $json;
    }

    public static function fromProto(\Bloock\SchemaV2 $res): Schema
    {
        return new Schema($res->getCid(), $res->getCidJsonLd(), $res->getSchemaType(), $res->getJson());
    }

    /**
     * Gets the cid of the schema.
     * @return string
     */
    public function getCid(): string
    {
        return $this->cid;
    }

    /**
     * Gets de cid json-ld of the schema.
     * @return string
     */
    public function getCidJsonLd(): string
    {
        return $this->cidJsonLd;
    }

    /**
     * Gets the schema type of the schema.
     * @return string
     */
    public function getSchemaType(): string
    {
        return $this->schemaType;
    }

    public function toProto(): \Bloock\SchemaV2
    {
        $p = new \Bloock\SchemaV2();
        $p->setCid($this->cid);
        $p->setCidJsonLd($this->cidJsonLd);
        $p->setSchemaType($this->schemaType);
        $p->setJson($this->json);
        return $p;
    }

    /**
     * Gets the json representation of the schema.
     * @return string
     */
    public function getJson(): string
    {
        return $this->json;
    }
}
