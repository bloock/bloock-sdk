<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\Bridge\Bridge;
use Bloock\BuildSchemaRequestV2;
use Bloock\ConfigData;
use Exception;
use Google\Protobuf\Internal\RepeatedField;

class SchemaBuilder
{
    private string $displayName;
    private string $schemaType;
    private string $version;
    private string $description;
    private string $issuerDid;
    private ConfigData $configData;

    private array $stringAttributes;
    private array $integerAttributes;
    private array $decimalAttributes;
    private array $booleanAttributes;
    private array $dateAttributes;
    private array $datetimeAttributes;
    private array $stringEnumAttributes;
    private array $integerEnumAttributes;
    private array $decimalEnumAttributes;

    public function __construct(string $displayName, string $schemaType, string $version, string $description, string $issuerDid, ConfigData $configData)
    {
        $this->displayName = $displayName;
        $this->schemaType = $schemaType;
        $this->version = $version;
        $this->description = $description;
        $this->issuerDid = $issuerDid;
        $this->configData = $configData;

        $this->stringAttributes = [];
        $this->integerAttributes = [];
        $this->decimalAttributes = [];
        $this->booleanAttributes = [];
        $this->dateAttributes = [];
        $this->datetimeAttributes = [];
        $this->stringEnumAttributes = [];
        $this->integerEnumAttributes = [];
        $this->decimalEnumAttributes = [];
    }

    public function addStringAttribute(string $name, string $technicalName, ?string $description, bool $required): SchemaBuilder
    {
        $attribute = new StringAttributeDescriptor($name, $technicalName, $description, $required);
        $this->stringAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addIntegerAttribute(string $name, string $technicalName, ?string $description, bool $required): SchemaBuilder
    {
        $attribute = new IntegerAttributeDescriptor($name, $technicalName, $description, $required);
        $this->integerAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addDecimalAttribute(string $name, string $technicalName, ?string $description, bool $required): SchemaBuilder
    {
        $attribute = new DecimalAttributeDescriptor($name, $technicalName, $description, $required);
        $this->decimalAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addBooleanAttribute(string $name, string $technicalName, ?string $description, bool $required): SchemaBuilder
    {
        $attribute = new BooleanAttributeDescriptor($name, $technicalName, $description, $required);
        $this->booleanAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addDateAttribute(string $name, string $technicalName, ?string $description, bool $required): SchemaBuilder
    {
        $attribute = new DateAttributeDescriptor($name, $technicalName, $description, $required);
        $this->dateAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addDateTimeAttribute(string $name, string $technicalName, ?string $description, bool $required): SchemaBuilder
    {
        $attribute = new DatetimeAttributeDescriptor($name, $technicalName, $description, $required);
        $this->datetimeAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addStringEnumAttribute(string $name, string $technicalName, ?string $description, bool $required, array $enumeration): SchemaBuilder
    {
        $repeatedField = new RepeatedField(\Google\Protobuf\Internal\GPBType::STRING);
        foreach ($enumeration as $value) {
            $repeatedField[] = $value;
        }
        $attribute = new StringEnumAttributeDescriptor($name, $technicalName, $description, $required, $repeatedField);
        $this->stringAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addIntegerEnumAttribute(string $name, string $technicalName, ?string $description, bool $required, array $enumeration): SchemaBuilder
    {
        $repeatedField = new RepeatedField(\Google\Protobuf\Internal\GPBType::INT64);
        foreach ($enumeration as $value) {
            $repeatedField[] = $value;
        }
        $attribute = new IntegerEnumAttributeDescriptor($name, $technicalName, $description, $required, $repeatedField);
        $this->stringAttributes[] = $attribute->toProto();
        return $this;
    }

    public function addDecimalEnumAttribute(string $name, string $technicalName, ?string $description, bool $required, array $enumeration): SchemaBuilder
    {
        $repeatedField = new RepeatedField(\Google\Protobuf\Internal\GPBType::DOUBLE);
        foreach ($enumeration as $value) {
            $repeatedField[] = $value;
        }
        $attribute = new DecimalEnumAttributeDescriptor($name, $technicalName, $description, $required, $repeatedField);
        $this->stringAttributes[] = $attribute->toProto();
        return $this;
    }

    public function build(): Schema
    {
        $bridge = new Bridge();

        $req = new BuildSchemaRequestV2();
        $req->setConfigData($this->configData);
        $req->setDisplayName($this->displayName);
        $req->setSchemaType($this->schemaType);
        $req->setVersion($this->version);
        $req->setDescription($this->description);
        $req->setIssuerDid($this->issuerDid);
        $req->setStringAttributes($this->stringAttributes);
        $req->setIntegerAttributes($this->integerAttributes);
        $req->setDecimalAttributes($this->decimalAttributes);
        $req->setBooleanAttributes($this->booleanAttributes);
        $req->setDateAttributes($this->dateAttributes);
        $req->setDatetimeAttributes($this->datetimeAttributes);
        $req->setStringEnumAttributes($this->stringEnumAttributes);
        $req->setIntegerEnumAttributes($this->integerEnumAttributes);
        $req->setDecimalEnumAttributes($this->decimalEnumAttributes);

        $res = $bridge->identityV2->BuildSchema($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Schema::fromProto($res->getSchema());
    }
}