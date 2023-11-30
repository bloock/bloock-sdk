<?php

namespace Bloock\Entity\Record;

class RecordDetails
{
    private ?IntegrityDetails $integrity;
    private ?AuthenticityDetails $authenticity;
    private ?EncryptionDetails $encryption;
    private ?AvailabilityDetails $availability;

    public function __construct(?IntegrityDetails $integrity, ?AuthenticityDetails $authenticity, ?EncryptionDetails $encryption, ?AvailabilityDetails $availability)
    {
        $this->integrity = $integrity;
        $this->authenticity = $authenticity;
        $this->encryption = $encryption;
        $this->availability = $availability;
    }

    /**
     * @return IntegrityDetails
     */
    public function getIntegrity(): ?IntegrityDetails
    {
        return $this->integrity;
    }

    /**
     * @return AuthenticityDetails
     */
    public function getAuthenticity(): ?AuthenticityDetails
    {
        return $this->authenticity;
    }

    /**
     * @return EncryptionDetails
     */
    public function getEncryption(): ?EncryptionDetails
    {
        return $this->encryption;
    }

    /**
     * @return AvailabilityDetails
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
