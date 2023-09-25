<?php

namespace Bloock\Entity\IdentityV2;

class Schema
{
    private string $cid;
    private string $cidJsonLd;
    private string $json;

    /**
     * @param string $id
     * @param string $json
     */
    public function __construct(string $cid, string $cidJsonLd, string $json)
    {
        $this->cid = $cid;
        $this->cidJsonLd = $cidJsonLd;
        $this->json = $json;
    }

    public static function fromProto(\Bloock\SchemaV2 $res): Schema
    {
        return new Schema($res->getCid(), $res->getCidJsonLd(), $res->getJson());
    }

    /**
     * @return string
     */
    public function getCid(): string
    {
        return $this->cid;
    }

    /**
     * @return string
     */
    public function getCidJsonLd(): string
    {
        return $this->cidJsonLd;
    }

    public function toProto(): \Bloock\SchemaV2
    {
        $p = new \Bloock\SchemaV2();
        $p->setCid($this->cid);
        $p->setCidJsonLd($this->cidJsonLd);
        $p->setJson($this->json);
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
