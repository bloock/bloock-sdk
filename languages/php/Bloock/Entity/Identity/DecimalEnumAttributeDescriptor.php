<?php

namespace Bloock\Entity\Identity;

use Bloock\DecimalEnumAttributeDefinition;
use Google\Protobuf\Internal\RepeatedField;

/**
 * Represents a descriptor for an attribute with a decimal enum value.
 */
class DecimalEnumAttributeDescriptor extends AttributeDescriptor
{
    private RepeatedField $enumeration;

    /**
     * Constructs an DecimalEnumAttributeDescriptor object with the specified parameters.
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

    public static function fromProto(DecimalEnumAttributeDefinition $res): DecimalEnumAttributeDescriptor
    {
        return new DecimalEnumAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired(), $res->getEnum());
    }

    public function toProto(): DecimalEnumAttributeDefinition
    {
        $p = new DecimalEnumAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        $p->setEnum($this->enumeration);
        return $p;
    }
}
