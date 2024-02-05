<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\StringEnumAttributeDefinitionV2;
use Google\Protobuf\Internal\RepeatedField;

/**
 * Represents a descriptor for an attribute with a string enum value.
 */
class StringEnumAttributeDescriptor extends AttributeDescriptor
{
    private RepeatedField $enumeration;

    /**
     * Constructs an StringEnumAttributeDescriptor object with the specified parameters.
     * @param string $displayName
     * @param string $technicalName
     * @param string|null $description
     * @param bool $required
     * @param RepeatedField $enumeration
     */
    public function __construct(string $displayName, string $technicalName, ?string $description, bool $required, RepeatedField $enumeration)
    {
        parent::__construct($displayName, $technicalName, $description, $required);
        $this->enumeration = $enumeration;
    }

    public static function fromProto(StringEnumAttributeDefinitionV2 $res): StringEnumAttributeDescriptor
    {
        return new StringEnumAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired(), $res->getEnum());
    }

    public function toProto(): StringEnumAttributeDefinitionV2
    {
        $p = new StringEnumAttributeDefinitionV2();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        $p->setEnum($this->enumeration);
        return $p;
    }
}