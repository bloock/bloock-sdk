<?php

namespace Bloock\Entity\Identity;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\CredentialFromJsonRequest;
use Bloock\CredentialToJsonRequest;
use Exception;

class Credential
{
    private string $threadId;
    private CredentialBody $body;

    /**
     * @param string $threadId
     * @param CredentialBody $body
     */
    public function __construct(string $threadId, CredentialBody $body)
    {
        $this->threadId = $threadId;
        $this->body = $body;
    }

    public static function fromProto(\Bloock\Credential $res): Credential
    {
        return new Credential($res->getThreadId(), CredentialBody::fromProto($res->getBody()));
    }

    public function toProto(): \Bloock\Credential
    {
        $p = new \Bloock\Credential();
        $p->setThreadId($this->threadId);
        $p->setBody($this->body->toProto());
        return $p;
    }

    public static function fromJson(string $json): Credential
    {
        $bridge = new Bridge();

        $req = new CredentialFromJsonRequest();
        $req->setConfigData(Config::newConfigDataDefault());
        $req->setJson($json);

        $res = $bridge->identity->CredentialFromJson($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Credential::fromProto($res->getCredential());
    }

    public function toJson(): string
    {
        $bridge = new Bridge();

        $req = new CredentialToJsonRequest();
        $req->setConfigData(Config::newConfigDataDefault());
        $req->setCredential($this->toProto());

        $res = $bridge->identity->CredentialToJson($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getJson();
    }

    /**
     * @return string
     */
    public function getThreadId(): string
    {
        return $this->threadId;
    }

    /**
     * @return CredentialBody
     */
    public function getBody(): CredentialBody
    {
        return $this->body;
    }
}