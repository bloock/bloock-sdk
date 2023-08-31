<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\StringAttributeDefinitionV2;

class StringAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(StringAttributeDefinitionV2 $res): StringAttributeDescriptor
    {
        return new StringAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): StringAttributeDefinitionV2
    {
        $p = new StringAttributeDefinitionV2();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}