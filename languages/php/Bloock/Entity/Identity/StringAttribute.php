<?php

namespace Bloock\Entity\Identity;

class StringAttribute extends Attribute
{
    public static function fromProto(\Bloock\StringAttribute $res): StringAttribute
    {
        return new StringAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\StringAttribute
    {
        $p = new \Bloock\StringAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}