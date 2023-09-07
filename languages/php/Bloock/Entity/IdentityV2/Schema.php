<?php

namespace Bloock\Entity\IdentityV2;

class Schema
{
    private string $id;
    private string $json;

    /**
     * @param string $id
     * @param string $json
     */
    public function __construct(string $id, string $json)
    {
        $this->id = $id;
        $this->json = $json;
    }

    public static function fromProto(\Bloock\SchemaV2 $res): Schema
    {
        return new Schema($res->getId(), $res->getJsonLd());
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    public function toProto(): \Bloock\SchemaV2
    {
        $p = new \Bloock\SchemaV2();
        $p->setId($this->id);
        $p->setJsonLd($this->json);
        return $p;
    }

    /**
     * @return string
     */
    public function getJson(): string
    {
        return $this->json;
    }
}