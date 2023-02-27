<?php

namespace Bloock\Entity\Identity;

class AttributeDescriptor
{
    public string $displayName;
    public string $technicalName;
    public ?string $description;

    /**
     * @param string $displayName
     * @param string $technicalName
     * @param ?string $description
     */
    public function __construct(string $displayName, string $technicalName, ?string $description)
    {
        $this->displayName = $displayName;
        $this->technicalName = $technicalName;
        $this->description = $description;
    }


}