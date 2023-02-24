<?php

namespace Bloock\Entity\Identity;

class DateAttributeDescriptor extends AttributeDescriptor
{
    public function toProto(): \Bloock\DateAttributeDefinition {
        $p = new \Bloock\DateAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }

    public static function fromProto(\Bloock\DateAttributeDefinition $res): DateAttributeDescriptor {
        return new DateAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }
}