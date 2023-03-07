<?php

namespace Bloock\Entity\Identity;

class MultichoiceAttribute extends Attribute
{
    public static function fromProto(\Bloock\MultichoiceAttribute $res): MultichoiceAttribute
    {
        return new MultichoiceAttribute($res->getId(), $res->getValue());
    }

    public function toProto(): \Bloock\MultichoiceAttribute
    {
        $p = new \Bloock\MultiChoiceAttribute();
        $p->setId($this->id);
        $p->setValue($this->value);
        return $p;
    }
}