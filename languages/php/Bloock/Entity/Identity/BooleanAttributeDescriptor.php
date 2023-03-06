<?php

namespace Bloock\Entity\Identity;

use Bloock\BooleanAttributeDefinition;

class BooleanAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(BooleanAttributeDefinition $res): BooleanAttributeDescriptor
    {
        return new BooleanAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }

    public function toProto(): BooleanAttributeDefinition
    {
        $p = new BooleanAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }
}