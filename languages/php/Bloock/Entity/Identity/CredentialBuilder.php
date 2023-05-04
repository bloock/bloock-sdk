<?php

namespace Bloock\Entity\Identity;

use Bloock\Bridge\Bridge;
use Bloock\ConfigData;
use Bloock\CreateCredentialRequest;
use Exception;

class CredentialBuilder
{
    private string $schemaId;
    private string $holderKey;
    private ConfigData $configData;

    private array $booleanAttributes;
    private array $dateAttributes;
    private array $datetimeAttributes;
    private array $stringAttributes;
    private array $numberAttributes;

    public function __construct(string $schemaId, string $holderKey, ConfigData $configData)
    {
        $this->schemaId = $schemaId;
        $this->holderKey = $holderKey;
        $this->configData = $configData;

        $this->booleanAttributes = [];
        $this->dateAttributes = [];
        $this->datetimeAttributes = [];
        $this->stringAttributes = [];
        $this->numberAttributes = [];
    }

    public function withBooleanAttribute(string $key, bool $value): CredentialBuilder
    {
        $attribute = new BooleanAttribute($key, $value);
        $this->booleanAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withDateAttribute(string $key, int $value): CredentialBuilder
    {
        $attribute = new DateAttribute($key, $value);
        $this->dateAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withDatetimeAttribute(string $key, int $value): CredentialBuilder
    {
        $attribute = new DatetimeAttribute($key, $value);
        $this->datetimeAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withStringAttribute(string $key, string $value): CredentialBuilder
    {
        $attribute = new StringAttribute($key, $value);
        $this->stringAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withNumberAttribute(string $key, int $value): CredentialBuilder
    {
        $attribute = new NumberAttribute($key, $value);
        $this->numberAttributes[] = $attribute->toProto();
        return $this;
    }

    public function build(): CredentialReceipt
    {
        $bridge = new Bridge();

        $req = new CreateCredentialRequest();
        $req->setConfigData($this->configData);
        $req->setSchemaId($this->schemaId);
        $req->setHolderKey($this->holderKey);
        $req->setBooleanAttributes($this->booleanAttributes);
        $req->setDateAttributes($this->dateAttributes);
        $req->setDatetimeAttributes($this->datetimeAttributes);
        $req->setstringAttributes($this->stringAttributes);
        $req->setNumberAttributes($this->numberAttributes);

        $res = $bridge->identity->CreateCredential($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return CredentialReceipt::fromProto($res->getCredentialReceipt());
    }
}
