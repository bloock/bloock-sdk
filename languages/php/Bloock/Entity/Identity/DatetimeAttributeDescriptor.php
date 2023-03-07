<?php

namespace Bloock\Entity\Identity;

use Bloock\DateTimeAttributeDefinition;

class DatetimeAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(DateTimeAttributeDefinition $res): DatetimeAttributeDescriptor
    {
        return new DatetimeAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }

    public function toProto(): DateTimeAttributeDefinition
    {
        $p = new DateTimeAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }
}