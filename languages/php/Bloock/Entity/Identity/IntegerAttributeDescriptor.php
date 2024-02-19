<?php

namespace Bloock\Entity\Identity;

use Bloock\IntegerAttributeDefinition;

/**
 * Represents a descriptor for an attribute with an integer value.
 */
class IntegerAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(IntegerAttributeDefinition $res): IntegerAttributeDescriptor
    {
        return new IntegerAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): IntegerAttributeDefinition
    {
        $p = new IntegerAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}