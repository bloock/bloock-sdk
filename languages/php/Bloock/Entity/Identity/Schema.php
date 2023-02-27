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

    public function toProto(): \Bloock\Schema {
        $p = new \Bloock\Schema();
        $p->setId($this->id);
        $p->setJsonLd($this->json);
        return $p;
    }

    public static function fromProto(\Bloock\Schema $res): Schema {
        return new Schema($res->getId(), $res->getJsonLd());
    }
}