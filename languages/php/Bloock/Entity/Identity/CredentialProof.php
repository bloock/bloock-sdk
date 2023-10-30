<?php

namespace Bloock\Entity\Identity;

use Bloock\Entity\Authenticity\SignatureJws;
use Bloock\Entity\Integrity\Proof;

class CredentialProof
{
    private Proof $bloockProof;
    private SignatureJws $signatureProof;

    /**
     * @param Proof $bloockProof
     * @param SignatureJws $signatureProof
     */
    public function __construct(Proof $bloockProof, SignatureJws $signatureProof)
    {
        $this->bloockProof = $bloockProof;
        $this->signatureProof = $signatureProof;
    }

    public static function fromProto(\Bloock\CredentialProof $res): CredentialProof
    {
        return new CredentialProof(Proof::fromProto($res->getBloockProof()), SignatureJws::fromProto($res->getSignatureProof()));
    }

    /**
     * @return Proof
     */
    public function getBloockProof(): Proof
    {
        return $this->bloockProof;
    }

    /**
     * @return SignatureJws
     */
    public function getSignatureProof(): SignatureJws
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