<?php

namespace Bloock\Entity\Identity;

/**
 * Represents the proof associated with a credential, including signature and sparse merkle tree proof.
 */
class CredentialProof
{
    private string $signatureProof;
    private string $sparseMtProof;

    /**
     * Constructs an CredentialProof object with the specified parameters.
     * @param string $signatureProof
     * @param string $sparseMtProof
     */
    public function __construct(string $signatureProof, string $sparseMtProof)
    {
        $this->signatureProof = $signatureProof;
        $this->sparseMtProof = $sparseMtProof;
    }

    public static function fromProto(\Bloock\CredentialProof $res): CredentialProof
    {
        return new CredentialProof($res->getSignatureProof(), $res->getSparseMtProof());
    }

    /**
     * Retrieve signature proof with string format
     * @return string
     */
    public function getSignatureProof(): string
    {
        return $this->signatureProof;
    }

    /**
     * Retrieve sparse merkle tree proof with string format
     * @return string
     */
    public function getSparseMtProof(): string
    {
        return $this->sparseMtProof;
    }

    public function toProto(): \Bloock\CredentialProof
    {
        $p = new \Bloock\CredentialProof();

        if ($this->signatureProof != null) {
            $p->setSignatureProof($this->signatureProof);
        }

        if ($this->sparseMtProof != null) {
            $p->setSparseMtProof($this->sparseMtProof);
        }
    
        return $p;
    }
}
