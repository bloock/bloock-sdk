<?php

namespace Bloock\Entity\IdentityV2;

class CredentialProof
{
    private string $signatureProof;
    private string $integrityProof;
    private string $sparseMtProof;

    /**
     * @param string $signatureProof
     * @param string $integrityProof
     * @param string $sparseMtProof
     */
    public function __construct(string $signatureProof, string $integrityProof, string $sparseMtProof)
    {
        $this->signatureProof = $signatureProof;
        $this->integrityProof = $integrityProof;
        $this->sparseMtProof = $sparseMtProof;
    }

    public static function fromProto(\Bloock\CredentialProofV2 $res): CredentialProof
    {
        return new CredentialProof($res->getSignatureProof(), $res->getIntegrityProof(), $res->getSparseMtProof());
    }

    /**
     * @return string
     */
    public function getSignatureProof(): string
    {
        return $this->signatureProof;
    }

    /**
     * @return string
     */
    public function getIntegrityProof(): string
    {
        return $this->integrityProof;
    }

    /**
     * @return string
     */
    public function getSparseMtProof(): string
    {
        return $this->sparseMtProof;
    }

    public function toProto(): \Bloock\CredentialProofV2
    {
        $p = new \Bloock\CredentialProofV2();

        if ($this->signatureProof != null) {
            $p->setSignatureProof($this->signatureProof);
        }

        if ($this->integrityProof != null) {
            $p->setIntegrityProof($this->integrityProof);
        }

        if ($this->sparseMtProof != null) {
            $p->setSparseMtProof($this->sparseMtProof);
        }
    
        return $p;
    }
}
