<?php

namespace Bloock\Entity\Identity;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\CredentialOfferFromJsonRequest;
use Bloock\CredentialOfferToJsonRequest;
use Exception;

class CredentialOffer
{
    private string $thid;
    private CredentialOfferBody $body;
    private string $from;
    private string $to;

    /**
     * @param string $thid
     * @param CredentialOfferBody $body
     * @param string $from
     * @param string $to
     */
    public function __construct(string $thid, CredentialOfferBody $body, string $from, string $to)
    {
        $this->thid = $thid;
        $this->body = $body;
        $this->from = $from;
        $this->to = $to;
    }

    /**
     * @throws Exception
     */
    static public function fromJSON(string $json): CredentialOffer
    {
        $bridge = new Bridge();

        $req = new CredentialOfferFromJsonRequest();
        $req->setConfigData(Config::newConfigDataDefault());
        $req->setJson($json);

        $res = $bridge->identity->CredentialOfferFromJson($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return CredentialOffer::fromProto($res->getCredentialOffer());
    }

    public static function fromProto(\Bloock\CredentialOffer $res): CredentialOffer
    {
        return new CredentialOffer($res->getThid(), CredentialOfferBody::fromProto($res->getBody()), $res->getFrom(), $res->getTo());
    }

    /**
     * @throws Exception
     */
    public function toJSON(): string
    {
        $bridge = new Bridge();

        $req = new CredentialOfferToJsonRequest();
        $req->setConfigData(Config::newConfigDataDefault());
        $req->setCredentialOffer($this->toProto());

        $res = $bridge->identity->CredentialOfferToJson($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getJson();
    }

    public function toProto(): \Bloock\CredentialOffer
    {
        $p = new \Bloock\CredentialOffer();
        $p->setThid($this->thid);
        $p->setBody($this->body->toProto());
        $p->setFrom($this->from);
        $p->setTo($this->to);
        return $p;
    }
}