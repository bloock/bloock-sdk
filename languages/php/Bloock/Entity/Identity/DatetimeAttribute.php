<?php

namespace Bloock\Entity\Identity;

/**
 * Represents an attribute with a datetime value.
 */
class DatetimeAttribute extends Attribute
{
    public static function fromProto(\Bloock\DateTimeAttribute $res): DatetimeAttribute
    {
        return new DatetimeAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\DateTimeAttribute
    {
        $p = new \Bloock\DateTimeAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}