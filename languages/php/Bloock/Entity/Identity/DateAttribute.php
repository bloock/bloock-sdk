<?php

namespace Bloock\Entity\Identity;

/**
 * Represents an attribute with a date value, including its key and formatted value.
 */
class DateAttribute extends Attribute
{
    public static function fromProto(\Bloock\DateAttribute $res): DateAttribute
    {
        return new DateAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\DateAttribute
    {
        $p = new \Bloock\DateAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}