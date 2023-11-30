<?php

namespace Bloock\Entity\Record;

use Bloock\Entity\Integrity\Proof;

class IntegrityDetails
{
    private string $hash;
    private ?Proof $proof;

    public function __construct(string $hash, ?Proof $proof)
    {
        $this->hash = $hash;
        $this->proof = $proof;
    }

    /**
     * @return string
     */
    public function getHash(): string
    {
        return $this->hash;
    }

    /**
     * @return Proof
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
