<?php

namespace Bloock\Entity\Identity;

class BooleanAttributeDescriptor extends AttributeDescriptor
{
    public function toProto(): \Bloock\BooleanAttributeDefinition {
        $p = new \Bloock\BooleanAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }

    public static function fromProto(\Bloock\BooleanAttributeDefinition $res): BooleanAttributeDescriptor {
        return new BooleanAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }
}