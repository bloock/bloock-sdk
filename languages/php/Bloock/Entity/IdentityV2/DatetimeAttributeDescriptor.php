<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\DateTimeAttributeDefinitionV2;

class DatetimeAttributeDescriptor extends AttributeDescriptor
{
    public static function fromProto(DateTimeAttributeDefinitionV2 $res): DatetimeAttributeDescriptor
    {
        return new DatetimeAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription(), $res->getRequired());
    }

    public function toProto(): DateTimeAttributeDefinitionV2
    {
        $p = new DateTimeAttributeDefinitionV2();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        $p->setRequired($this->required);
        return $p;
    }
}