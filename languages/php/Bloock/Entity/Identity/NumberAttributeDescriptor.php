<?php

namespace Bloock\Entity\Identity;

use Bloock\NumberAttributeDefinition;

class NumberAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(NumberAttributeDefinition $res): NumberAttributeDescriptor
    {
        return new NumberAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }

    public function toProto(): NumberAttributeDefinition
    {
        $p = new NumberAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }
}