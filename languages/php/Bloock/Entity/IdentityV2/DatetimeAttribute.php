<?php

namespace Bloock\Entity\IdentityV2;

/**
 * Represents an attribute with a datetime value.
 */
class DatetimeAttribute extends Attribute
{
    public static function fromProto(\Bloock\DateTimeAttributeV2 $res): DatetimeAttribute
    {
        return new DatetimeAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\DateTimeAttributeV2
    {
        $p = new \Bloock\DateTimeAttributeV2();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}