<?php

namespace Bloock\Entity\Record;

use Bloock\Entity\Integrity\Proof;

/**
 * Represents details related to the integrity of a record, including hash and proof.
 */
class IntegrityDetails
{
    private string $hash;
    private ?Proof $proof;

    /**
     * Constructs a IntegrityDetails object with the specified parameters.
     * @param string $hash
     * @param Proof|null $proof
     */
    public function __construct(string $hash, ?Proof $proof)
    {
        $this->hash = $hash;
        $this->proof = $proof;
    }

    /**
     * Gets the hash of the record.
     * @return string
     */
    public function getHash(): string
    {
        return $this->hash;
    }

    /**
     * Gets the proof of the record.
     * @return Proof|null
     */
    public function getProof(): ?Proof
    {
        return $this->proof;
    }

    public static function fromProto(\Bloock\IntegrityDetails $details): IntegrityDetails
    {
        $proof = null;
        if ($details->hasProof()) {
            $proof = Proof::fromProto($details->getProof());
        }
        return new IntegrityDetails($details->getHash(), $proof);
    }

    public function toProto(): \Bloock\IntegrityDetails
    {
        $p = new \Bloock\IntegrityDetails();
        $p->setHash($this->hash);
        $p->setProof($this->proof);
        return $p;
    }
}
