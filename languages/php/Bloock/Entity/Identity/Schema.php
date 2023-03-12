<?php

namespace Bloock\Entity\Identity;

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

    public static function fromProto(\Bloock\Schema $res): Schema
    {
        return new Schema($res->getId(), $res->getJsonLd());
    }

    public function toProto(): \Bloock\Schema
    {
        $p = new \Bloock\Schema();
        $p->setId($this->id);
        $p->setJsonLd($this->json);
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
    public function getJson(): string
    {
        return $this->json;
    }
}