<?php

namespace Bloock\Entity\IdentityV2;

class StringAttribute extends Attribute
{
    public static function fromProto(\Bloock\StringAttributeV2 $res): StringAttribute
    {
        return new StringAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\StringAttributeV2
    {
        $p = new \Bloock\StringAttributeV2();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}