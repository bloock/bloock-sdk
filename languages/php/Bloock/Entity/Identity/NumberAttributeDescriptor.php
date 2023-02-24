<?php

namespace Bloock\Entity\Identity;

class NumberAttributeDescriptor extends AttributeDescriptor
{
    public function toProto(): \Bloock\NumberAttributeDefinition {
        $p = new \Bloock\NumberAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }

    public static function fromProto(\Bloock\NumberAttributeDefinition $res): NumberAttributeDescriptor {
        return new NumberAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }
}