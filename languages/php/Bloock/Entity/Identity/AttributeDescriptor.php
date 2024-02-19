<?php

namespace Bloock\Entity\Identity;

/**
 * Represents a descriptor for an attribute.
 */
class AttributeDescriptor
{
    /**
     * Is the human-readable display name of the attribute.
     * @var string
     */
    public string $displayName;
    /**
     * Is the identifier for the attribute.
     * @var string
     */
    public string $technicalName;
    /**
     * Is a description providing additional information about the attribute.
     * @var string|null
     */
    public ?string $description;
    /**
     * Specifies whether the attribute is required.
     * @var bool
     */
    public bool $required;

    /**
     * @param string $displayName
     * @param string $technicalName
     * @param string|null $description
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