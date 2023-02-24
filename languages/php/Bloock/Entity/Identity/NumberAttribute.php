<?php

namespace Bloock\Entity\Identity;

class NumberAttribute extends Attribute
{
    public function toProto(): \Bloock\NumberAttribute {
        $p = new \Bloock\NumberAttribute();
        $p->setId($this->id);
        $p->setValue($this->id);
        return $p;
    }

    public static function fromProto(\Bloock\NumberAttribute $res): NumberAttribute {
        return new NumberAttribute($res->getId(), $res->getValue());
    }
}