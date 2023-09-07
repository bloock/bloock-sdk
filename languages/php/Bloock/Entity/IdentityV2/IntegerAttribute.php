<?php

namespace Bloock\Entity\IdentityV2;

class IntegerAttribute extends Attribute
{
    public static function fromProto(\Bloock\IntegerAttributeV2 $res): IntegerAttribute
    {
        return new IntegerAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\IntegerAttributeV2
    {
        $p = new \Bloock\IntegerAttributeV2();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}