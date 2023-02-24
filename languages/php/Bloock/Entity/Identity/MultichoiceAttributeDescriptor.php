<?php

namespace Bloock\Entity\Identity;

class MultichoiceAttributeDescriptor extends AttributeDescriptor
{
    public array $allowedValues;

    /**
     * @param array $allowedValues
     */
    public function __construct(string $displayName, string $technicalName, array $allowedValues, ?string $description)
    {
        parent::__construct($displayName, $technicalName, $description);
        $this->allowedValues = $allowedValues;
    }


    public function toProto(): \Bloock\MultiChoiceAttributeDefinition {
        $p = new \Bloock\MultiChoiceAttributeDefinition();
        $p->setDisplayName($this->displayName);
        $p->setId($this->technicalName);
        $p->setAllowedValues($this->allowedValues);
        $p->setDescription($this->description);
        return $p;
    }

    public static function fromProto(\Bloock\MultiChoiceAttributeDefinition $res): MultichoiceAttributeDescriptor {
        $v = [];
        foreach ($res->getAllowedValues()->getIterator() as $value) {
            $v[] = $value;
        }
        return new MultichoiceAttributeDescriptor($res->getDisplayName(), $res->getId(), $v, $res->getDescription());
    }
}