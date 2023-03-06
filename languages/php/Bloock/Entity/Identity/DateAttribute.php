<?php

namespace Bloock\Entity\Identity;

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