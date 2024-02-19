<?php

namespace Bloock\Entity\Identity;

use Bloock\BooleanAttributeDefinition;

/**
 * Represents a descriptor for a boolean attribute.
 */
class BooleanAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(BooleanAttributeDefinition $res): BooleanAttributeDescriptor
    {
        return new BooleanAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): BooleanAttributeDefinition
    {
        $p = new BooleanAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}
