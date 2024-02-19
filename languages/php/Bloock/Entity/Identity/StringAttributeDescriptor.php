<?php

namespace Bloock\Entity\Identity;

use Bloock\StringAttributeDefinition;

/**
 * Represents a descriptor for an attribute with a string value.
 */
class StringAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(StringAttributeDefinition $res): StringAttributeDescriptor
    {
        return new StringAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): StringAttributeDefinition
    {
        $p = new StringAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}