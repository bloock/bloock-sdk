<?php

namespace Bloock\Entity\Identity;

use Bloock\DateTimeAttributeDefinition;

/**
 * Represents a descriptor for an attribute with a datetime value.
 */
class DatetimeAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(DateTimeAttributeDefinition $res): DatetimeAttributeDescriptor
    {
        return new DatetimeAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): DateTimeAttributeDefinition
    {
        $p = new DateTimeAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}