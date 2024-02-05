<?php

namespace Bloock\Entity\Record;

/**
 * Represents details related to the availability of a record, including content type and size.
 */
class AvailabilityDetails
{
    private ?string $type;
    private int $size;

    /**
     * Constructs a AvailabilityDetails object with the specified parameters.
     * @param string|null $type
     * @param int $size
     */
    public function __construct(?string $type, int $size)
    {
        $this->type = $type;
        $this->size = $size;
    }

    /**
     * Gets the content type of record file.
     * @return string|null
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * Gets the byte size of the record file.
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
