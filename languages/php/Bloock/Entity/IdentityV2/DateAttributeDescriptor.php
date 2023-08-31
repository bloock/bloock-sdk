<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\DateAttributeDefinitionV2;

class DateAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(DateAttributeDefinitionV2 $res): DateAttributeDescriptor
    {
        return new DateAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): DateAttributeDefinitionV2
    {
        $p = new DateAttributeDefinitionV2();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}