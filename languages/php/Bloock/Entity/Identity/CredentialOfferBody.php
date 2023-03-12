<?php

namespace Bloock\Entity\Identity;

use Google\Protobuf\Internal\RepeatedField;

class CredentialOfferBody
{
    private string $url;
    private RepeatedField $credentials;

    /**
     * @param string $url
     * @param RepeatedField $credentials
     */
    public function __construct(string $url, RepeatedField $credentials)
    {
        $this->url = $url;
        $this->credentials = $credentials;
    }

    public static function fromProto(\Bloock\CredentialOfferBody $res): CredentialOfferBody
    {
        return new CredentialOfferBody($res->getUrl(), $res->getCredentials());
    }

    public function toProto(): \Bloock\CredentialOfferBody
    {
        $p = new \Bloock\CredentialOfferBody();
        $p->setUrl($this->url);
        $p->setCredentials($this->credentials);
        return $p;
    }

    /**
     * @return string
     */
    public function getUrl(): string
    {
        return $this->url;
    }

    /**
     * @return RepeatedField
     */
    public function getCredentials(): RepeatedField
    {
        return $this->credentials;
    }
}