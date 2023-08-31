<?php

namespace Bloock\Entity\IdentityV2;

class AttributeDescriptor
{
    public string $displayName;
    public string $technicalName;
    public ?string $description;
    public bool $required;

    /**
     * @param string $displayName
     * @param string $technicalName
     * @param ?string $description
     * @param bool $required
     */
    public function __construct(string $displayName, string $technicalName, ?string $description, bool $required)
    {
        $this->displayName = $displayName;
        $this->technicalName = $technicalName;
        $this->description = $description;
        $this->required = $required;
    }


}