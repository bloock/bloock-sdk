<?php

namespace Bloock\Entity\Identity;

use Bloock\DecimalAttributeDefinition;

/**
 * Represents a descriptor for an attribute with a decimal value.
 */
class DecimalAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(DecimalAttributeDefinition $res): DecimalAttributeDescriptor
    {
        return new DecimalAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): DecimalAttributeDefinition
    {
        $p = new DecimalAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}