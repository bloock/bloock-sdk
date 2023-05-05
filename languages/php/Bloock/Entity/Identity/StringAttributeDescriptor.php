<?php

namespace Bloock\Entity\Identity;

use Bloock\StringAttributeDefinition;

class StringAttributeDescriptor extends AttributeDescriptor
{
    /**
     * @param array $allowedValues
     */
    public function __construct(string $displayName, string $technicalName, ?string $description)
    {
        parent::__construct($displayName, $technicalName, $description);
    }

    public static function fromProto(StringAttributeDefinition $res): StringAttributeDescriptor
    {
        return new StringAttributeDescriptor($res->getDisplayName(), $res->getId(), $res->getDescription());
    }

    public function toProto(): StringAttributeDefinition
    {
        $p = new StringAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setDescription($this->description);
        return $p;
    }
}
