<?php

namespace Bloock\Entity\IdentityV2;

class BooleanAttribute extends Attribute
{
    public static function fromProto(\Bloock\BooleanAttributeV2 $res): BooleanAttribute
    {
        return new BooleanAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\BooleanAttributeV2
    {
        $p = new \Bloock\BooleanAttributeV2();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}