<?php

namespace Bloock\Entity\IdentityV2;

/**
 * Represents an attribute with a decimal value.
 */
class DecimalAttribute extends Attribute
{
    public static function fromProto(\Bloock\DecimalAttributeV2 $res): DecimalAttribute
    {
        return new DecimalAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\DecimalAttributeV2
    {
        $p = new \Bloock\DecimalAttributeV2();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}