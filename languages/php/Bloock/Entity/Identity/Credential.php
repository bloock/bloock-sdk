<?php

namespace Bloock\Entity\Identity;

class Credential
{
    private string $json;

    /**
     * @param string $json
     */
    public function __construct(string $json)
    {
        $this->json = $json;
    }

    public function toJson(): string {
        return $this->json;
    }

    public static function fromJson(string $json): Credential {
        return new Credential($json);
    }

    public function toProto(): \Bloock\Credential {
        $p = new \Bloock\Credential();
        $p->setJson($this->json);
        return $p;
    }

    public static function fromProto(\Bloock\Credential $res): Credential {
        return new Credential($res->getJson());
    }
}