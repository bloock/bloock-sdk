<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\IntegerAttributeDefinitionV2;

class IntegerAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(IntegerAttributeDefinitionV2 $res): IntegerAttributeDescriptor
    {
        return new IntegerAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): IntegerAttributeDefinitionV2
    {
        $p = new IntegerAttributeDefinitionV2();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}