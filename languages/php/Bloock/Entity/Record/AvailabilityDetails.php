<?php

namespace Bloock\Entity\Record;

class AvailabilityDetails
{
    private ?string $type;
    private int $size;

    public function __construct(?string $type, int $size)
    {
        $this->type = $type;
        $this->size = $size;
    }

    /**
     * @return string
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @return int
     */
    public function getSize(): int
    {
        return $this->size;
    }

    public static function fromProto(\Bloock\AvailabilityDetails $details): AvailabilityDetails
    {
        $type = null;
        if ($details->hasType()) {
            $type = $details->getType();
        }
        return new AvailabilityDetails($type, $details->getSize());
    }

    public function toProto(): \Bloock\AvailabilityDetails
    {
        $p = new \Bloock\AvailabilityDetails();
        $p->setType($this->type);
        $p->setSize($this->size);
        return $p;
    }
}
