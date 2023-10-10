<?php

namespace Bloock\Entity\IdentityV2;

class DateAttribute extends Attribute
{
    public static function fromProto(\Bloock\DateAttributeV2 $res): DateAttribute
    {
        return new DateAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\DateAttributeV2
    {
        $p = new \Bloock\DateAttributeV2();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}