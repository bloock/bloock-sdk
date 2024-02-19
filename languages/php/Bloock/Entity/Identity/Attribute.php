<?php

namespace Bloock\Entity\Identity;

/**
 * Represents an attribute with an identifier and a corresponding value.
 */
class Attribute
{
    public string $id;
    public $value;

    /**
     * Constructs an Attribute object with the specified parameters.
     * @param string $id
     * @param $value
     */
    public function __construct(string $id, $value)
    {
        $this->id = $id;
        $this->value = $value;
    }
}
