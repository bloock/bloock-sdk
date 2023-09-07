<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\IntegerEnumAttributeDefinitionV2;
use Google\Protobuf\Internal\RepeatedField;

class IntegerEnumAttributeDescriptor extends AttributeDescriptor
{
    private RepeatedField $enumeration;

    public function __construct(string $displayName, string $technicalName, ?string $description, bool $required, RepeatedField $enumeration)
    {
        parent::__construct($displayName, $technicalName, $description, $required);
        $this->enumeration = $enumeration;
    }

    public static function fromProto(IntegerEnumAttributeDefinitionV2 $res): IntegerEnumAttributeDescriptor
    {
        return new IntegerEnumAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired(), $res->getEnum());
    }

    public function toProto(): IntegerEnumAttributeDefinitionV2
    {
        $p = new IntegerEnumAttributeDefinitionV2();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        $p->setEnum($this->enumeration);
        return $p;
    }
}