<?php

namespace Bloock\Entity\Identity;

use Bloock\DateAttributeDefinition;

/**
 * Represents a descriptor for a date attribute, including its display name, ID, description, and required status.
 */
class DateAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(DateAttributeDefinition $res): DateAttributeDescriptor
    {
        return new DateAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): DateAttributeDefinition
    {
        $p = new DateAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}