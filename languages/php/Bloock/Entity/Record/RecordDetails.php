<?php

namespace Bloock\Entity\Record;

/**
 * Represents all details related to a record, including integrity, authenticity, encryption, and availability details.
 */
class RecordDetails
{
    private ?IntegrityDetails $integrity;
    private ?AuthenticityDetails $authenticity;
    private ?EncryptionDetails $encryption;
    private ?AvailabilityDetails $availability;

    /**
     * Constructs a RecordDetails object with the specified parameters.
     * @param IntegrityDetails|null $integrity
     * @param AuthenticityDetails|null $authenticity
     * @param EncryptionDetails|null $encryption
     * @param AvailabilityDetails|null $availability
     */
    public function __construct(?IntegrityDetails $integrity, ?AuthenticityDetails $authenticity, ?EncryptionDetails $encryption, ?AvailabilityDetails $availability)
    {
        $this->integrity = $integrity;
        $this->authenticity = $authenticity;
        $this->encryption = $encryption;
        $this->availability = $availability;
    }

    /**
     * Gets the integrity details of the record.
     * @return IntegrityDetails|null
     */
    public function getIntegrity(): ?IntegrityDetails
    {
        return $this->integrity;
    }

    /**
     * Gets the authenticity details of the record.
     * @return AuthenticityDetails|null
     */
    public function getAuthenticity(): ?AuthenticityDetails
    {
        return $this->authenticity;
    }

    /**
     * Gets the encryption details of the record.
     * @return EncryptionDetails|null
     */
    public function getEncryption(): ?EncryptionDetails
    {
        return $this->encryption;
    }

    /**
     * Gets the availability details of the record.
     * @return AvailabilityDetails|null
     */
    public function getAvailability(): ?AvailabilityDetails
    {
        return $this->availability;
    }

    public static function fromProto(\Bloock\RecordDetails $details): RecordDetails
    {
        $integrity = null;
        if ($details->hasIntegrity()) {
            $integrity = IntegrityDetails::fromProto($details->getIntegrity());
        }

        $authenticity = null;
        if ($details->hasAuthenticity()) {
            $authenticity = AuthenticityDetails::fromProto($details->getAuthenticity());
        }

        $encryption = null;
        if ($details->hasEncryption()) {
            $encryption = EncryptionDetails::fromProto($details->getEncryption());
        }

        $availability = null;
        if ($details->hasAvailability()) {
            $availability = AvailabilityDetails::fromProto($details->getAvailability());
        }
        return new RecordDetails($integrity, $authenticity, $encryption, $availability);
    }

    public function toProto(): \Bloock\RecordDetails
    {
        $p = new \Bloock\RecordDetails();
        $p->setIntegrity($this->integrity);
        $p->setAuthenticity($this->authenticity);
        $p->setEncryption($this->encryption);
        $p->setAvailability($this->availability);
        return $p;
    }
}
