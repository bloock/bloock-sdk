<?php

namespace Bloock\Entity\Identity;

use Bloock\Bridge\Bridge;
use Bloock\ConfigData;
use Bloock\CreateCredentialOfferRequest;
use Exception;

class CredentialOfferBuilder
{
    private string $schemaId;
    private string $holderKey;
    private ConfigData $configData;

    private array $booleanAttributes;
    private array $dateAttributes;
    private array $datetimeAttributes;
    private array $multichoiceAttributes;
    private array $numberAttributes;

    public function __construct(string $schemaId, string $holderKey, ConfigData $configData)
    {
        $this->schemaId = $schemaId;
        $this->holderKey = $holderKey;
        $this->configData = $configData;

        $this->booleanAttributes = [];
        $this->dateAttributes = [];
        $this->datetimeAttributes = [];
        $this->multichoiceAttributes = [];
        $this->numberAttributes = [];
    }

    public function withBooleanAttribute(string $key, bool $value): CredentialOfferBuilder
    {
        $attribute = new BooleanAttribute($key, $value);
        $this->booleanAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withDateAttribute(string $key, int $value): CredentialOfferBuilder
    {
        $attribute = new DateAttribute($key, $value);
        $this->dateAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withDatetimeAttribute(string $key, int $value): CredentialOfferBuilder
    {
        $attribute = new DatetimeAttribute($key, $value);
        $this->datetimeAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withMultichoiceAttribute(string $key, string $value): CredentialOfferBuilder
    {
        $attribute = new MultichoiceAttribute($key, $value);
        $this->multichoiceAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withNumberAttribute(string $key, int $value): CredentialOfferBuilder
    {
        $attribute = new NumberAttribute($key, $value);
        $this->numberAttributes[] = $attribute->toProto();
        return $this;
    }

    public function build(): CredentialOffer
    {
        $bridge = new Bridge();

        $req = new CreateCredentialOfferRequest();
        $req->setConfigData($this->configData);
        $req->setSchemaId($this->schemaId);
        $req->setHolderKey($this->holderKey);
        $req->setBooleanAttributes($this->booleanAttributes);
        $req->setDateAttributes($this->dateAttributes);
        $req->setDatetimeAttributes($this->datetimeAttributes);
        $req->setMultichoiceAttributes($this->multichoiceAttributes);
        $req->setNumberAttributes($this->numberAttributes);

        $res = $bridge->identity->CreateCredentialOffer($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return CredentialOffer::fromProto($res->getCredentialOffer());
    }
}