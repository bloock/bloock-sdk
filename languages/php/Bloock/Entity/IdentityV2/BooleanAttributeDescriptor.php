<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\BooleanAttributeDefinitionV2;

class BooleanAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(BooleanAttributeDefinitionV2 $res): BooleanAttributeDescriptor
    {
        return new BooleanAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): BooleanAttributeDefinitionV2
    {
        $p = new BooleanAttributeDefinitionV2();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}
