<?php

namespace Bloock\Entity\Identity;

class CredentialOffer
{
    private string $json;

    /**
     * @param string $json
     */
    public function __construct(string $json)
    {
        $this->json = $json;
    }

    public function toJSON(): string {
        return $this->json;
    }

    static public function fromJSON(string $json): CredentialOffer {
        return new CredentialOffer($json);
    }

    public function toProto(): \Bloock\CredentialOffer {
        $p = new \Bloock\CredentialOffer();
        $p->setJson($this->json);
        return $p;
    }

    public static function fromProto(\Bloock\CredentialOffer $res): CredentialOffer {
        return new CredentialOffer($res->getJson());
    }
}