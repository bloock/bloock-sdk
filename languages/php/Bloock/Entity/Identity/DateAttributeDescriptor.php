<?php

namespace Bloock\Entity\Identity;

use Bloock\DateAttributeDefinition;

class DateAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(DateAttributeDefinition $res): DateAttributeDescriptor
    {
        return new DateAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }

    public function toProto(): DateAttributeDefinition
    {
        $p = new DateAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }
}