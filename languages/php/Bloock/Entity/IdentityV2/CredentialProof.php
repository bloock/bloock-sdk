<?php

namespace Bloock\Entity\IdentityV2;

class CredentialProof
{
    private string $signatureProof;
    private string $sparseMtProof;

    /**
     * @param string $signatureProof
     * @param string $sparseMtProof
     */
    public function __construct(string $signatureProof, string $sparseMtProof)
    {
        $this->signatureProof = $signatureProof;
        $this->sparseMtProof = $sparseMtProof;
    }

    public static function fromProto(\Bloock\CredentialProofV2 $res): CredentialProof
    {
        return new CredentialProof($res->getSignatureProof(), $res->getSparseMtProof());
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

        if ($this->sparseMtProof != null) {
            $p->setSparseMtProof($this->sparseMtProof);
        }
    
        return $p;
    }
}
