<?php

namespace Bloock\Entity\Identity;

/**
 * Represents an attribute with a decimal value.
 */
class DecimalAttribute extends Attribute
{
    public static function fromProto(\Bloock\DecimalAttribute $res): DecimalAttribute
    {
        return new DecimalAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\DecimalAttribute
    {
        $p = new \Bloock\DecimalAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}