<?php

namespace Bloock\Entity\Identity;

class BooleanAttribute extends Attribute
{
    public function toProto(): \Bloock\BooleanAttribute {
        $p = new \Bloock\BooleanAttribute();
        $p->setId($this->id);
        $p->setValue($this->id);
        return $p;
    }

    public static function fromProto(\Bloock\BooleanAttribute $res): BooleanAttribute {
        return new BooleanAttribute($res->getId(), $res->getValue());
    }
}