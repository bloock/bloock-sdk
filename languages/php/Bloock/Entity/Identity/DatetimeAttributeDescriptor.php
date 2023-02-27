<?php

namespace Bloock\Entity\Identity;

class DatetimeAttributeDescriptor extends AttributeDescriptor
{
    public function toProto(): \Bloock\DateTimeAttributeDefinition {
        $p = new \Bloock\DateTimeAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }

    public static function fromProto(\Bloock\DateTimeAttributeDefinition $res): DatetimeAttributeDescriptor {
        return new DatetimeAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }
}