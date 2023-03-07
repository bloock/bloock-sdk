<?php

namespace Bloock\Entity\Identity;

class NumberAttribute extends Attribute
{
    public static function fromProto(\Bloock\NumberAttribute $res): NumberAttribute
    {
        return new NumberAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\NumberAttribute
    {
        $p = new \Bloock\NumberAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}