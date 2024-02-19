<?php

namespace Bloock\Entity\Identity;

/**
 * Represents an attribute with an integer value.
 */
class IntegerAttribute extends Attribute
{
    public static function fromProto(\Bloock\IntegerAttribute $res): IntegerAttribute
    {
        return new IntegerAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\IntegerAttribute
    {
        $p = new \Bloock\IntegerAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}