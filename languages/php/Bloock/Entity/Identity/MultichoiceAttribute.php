<?php

namespace Bloock\Entity\Identity;

class MultichoiceAttribute extends Attribute
{
    public function toProto(): \Bloock\MultichoiceAttribute {
        $p = new \Bloock\MultichoiceAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }

    public static function fromProto(\Bloock\MultichoiceAttribute $res): MultichoiceAttribute {
        return new MultichoiceAttribute($res->getId(), $res->getValue());
    }
}