<?php

namespace Bloock\Entity\Identity;

use Bloock\IntegerEnumAttributeDefinition;
use Google\Protobuf\Internal\RepeatedField;

/**
 * Represents a descriptor for an attribute with an integer enum value.
 */
class IntegerEnumAttributeDescriptor extends AttributeDescriptor
{
    private RepeatedField $enumeration;

    /**
     * Constructs an IntegerEnumAttributeDescriptor object with the specified parameters.
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

    public static function fromProto(IntegerEnumAttributeDefinition $res): IntegerEnumAttributeDescriptor
    {
        return new IntegerEnumAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired(), $res->getEnum());
    }

    public function toProto(): IntegerEnumAttributeDefinition {
    
        $p = new IntegerEnumAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        $p->setEnum($this->enumeration);
        return $p;
    }
}