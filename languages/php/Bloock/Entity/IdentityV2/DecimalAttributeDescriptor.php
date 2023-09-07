<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\DecimalAttributeDefinitionV2;

class DecimalAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(DecimalAttributeDefinitionV2 $res): DecimalAttributeDescriptor
    {
        return new DecimalAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): DecimalAttributeDefinitionV2
    {
        $p = new DecimalAttributeDefinitionV2();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}