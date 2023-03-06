<?php

namespace Bloock\Entity\Identity;

class BooleanAttribute extends Attribute
{
    public static function fromProto(\Bloock\BooleanAttribute $res): BooleanAttribute
    {
        return new BooleanAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\BooleanAttribute
    {
        $p = new \Bloock\BooleanAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}