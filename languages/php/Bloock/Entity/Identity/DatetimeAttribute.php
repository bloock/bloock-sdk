<?php

namespace Bloock\Entity\Identity;

class DatetimeAttribute extends Attribute
{
    public function toProto(): \Bloock\DateTimeAttribute {
        $p = new \Bloock\DateTimeAttribute();
        $p->setId($this->id);
        $p->setValue($this->id);
        return $p;
    }

    public static function fromProto(\Bloock\DateTimeAttribute $res): DatetimeAttribute {
        return new DatetimeAttribute($res->getId(), $res->getValue());
    }
}