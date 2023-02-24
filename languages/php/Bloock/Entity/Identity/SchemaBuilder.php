<?php

namespace Bloock\Entity\Identity;

use Bloock\Bridge\Bridge;
use Bloock\BuildSchemaRequest;
use Bloock\ConfigData;
use Bloock\CreateCredentialOfferRequest;

class SchemaBuilder
{
    private string $displayName;
    private string $technicalName;
    private ConfigData $configData;

    private array $booleanAttributes;
    private array $dateAttributes;
    private array $datetimeAttributes;
    private array $multichoiceAttributes;
    private array $numberAttributes;

    public function __construct(string $displayName, string $technicalName, ConfigData $configData)
    {
        $this->displayName = $displayName;
        $this->technicalName = $technicalName;
        $this->configData = $configData;

        $this->booleanAttributes = [];
        $this->dateAttributes = [];
        $this->datetimeAttributes = [];
        $this->multichoiceAttributes = [];
        $this->numberAttributes = [];
    }

    public function addBooleanAttribute(string $name, string $technicalName, ?string $description): SchemaBuilder {
        $attribute = new BooleanAttributeDescriptor($name, $technicalName, $description);
        $this->booleanAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addDateAttribute(string $name, string $technicalName, ?string $description): SchemaBuilder {
        $attribute = new DateAttributeDescriptor($name, $technicalName, $description);
        $this->dateAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addDateTimeAttribute(string $name, string $technicalName, ?string $description): SchemaBuilder {
        $attribute = new DatetimeAttributeDescriptor($name, $technicalName, $description);
        $this->datetimeAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addMultichoiceAttribute(string $name, string $technicalName, ?string $description): SchemaBuilder {
        $attribute = new MultichoiceAttributeDescriptor($name, $technicalName, $description);
        $this->multichoiceAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addNumberAttribute(string $name, string $technicalName, array $allowedValues, ?string $description): SchemaBuilder {
        $attribute = new NumberAttributeDescriptor($name, $technicalName, $description);
        $this->numberAttributes[] = $attribute->toProto();
        return $this;
    }

    public function build(): Schema {
        $bridge = new Bridge();

        $req = new BuildSchemaRequest();
        $req->setConfigData($this->configData);
        $req->setDisplayName($this->displayName);
        $req->setTechnicalName($this->technicalName);
        $req->setBooleanAttributes($this->booleanAttributes);
        $req->setDateAttributes($this->dateAttributes);
        $req->setDatetimeAttributes($this->datetimeAttributes);
        $req->setMultichoiceAttributes($this->multichoiceAttributes);
        $req->setNumberAttributes($this->numberAttributes);

        $res = $bridge->identity->BuildSchema($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Schema::fromProto($res->getSchema());
    }
}