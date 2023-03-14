<?php

namespace Bloock\Entity\Identity;

use Bloock\Entity\Authenticity\Signature;
use Bloock\Entity\Integrity\Proof;

class CredentialProof
{
    private Proof $bloockProof;
    private Signature $signatureProof;

    /**
     * @param Proof $bloockProof
     * @param Signature $signatureProof
     */
    public function __construct(Proof $bloockProof, Signature $signatureProof)
    {
        $this->bloockProof = $bloockProof;
        $this->signatureProof = $signatureProof;
    }

    public static function fromProto(\Bloock\CredentialProof $res): CredentialProof
    {
        return new CredentialProof(Proof::fromProto($res->getBloockProof()), Signature::fromProto($res->getSignatureProof()));
    }

    /**
     * @return Proof
     */
    public function getBloockProof(): Proof
    {
        return $this->bloockProof;
    }

    /**
     * @return Signature
     */
    public function getSignatureProof(): Signature
    {
        return $this->signatureProof;
    }

    public function toProto(): \Bloock\CredentialProof
    {
        $p = new \Bloock\CredentialProof();
        $p->setBloockProof($this->bloockProof->toProto());
        $p->setSignatureProof($this->signatureProof->toProto());
        return $p;
    }
}