<?php

namespace Bloock\Entity\IdentityV2;

class ProofType
{
    const INTEGRITY_PROOF_TYPE = "INTEGRITY_PROOF_TYPE";
    const SPARSE_MT_PROOF_TYPE = "SPARSE_MT_PROOF_TYPE";

    public static function fromProto(\Bloock\ProofType $proofType): string
    {
        switch ($proofType) {
            case \Bloock\ProofType::IntegrityProofType:
                return ProofType::INTEGRITY_PROOF_TYPE;
            case \Bloock\ProofType::SparseMtProofType:
                return ProofType::SPARSE_MT_PROOF_TYPE;
            default:
                return null;
        }
    }

    public static function toProto(string $proofType): int
    {
        switch ($proofType) {
            case ProofType::INTEGRITY_PROOF_TYPE:
                return \Bloock\ProofType::IntegrityProofType;
            case ProofType::SPARSE_MT_PROOF_TYPE:
                return \Bloock\ProofType::SparseMtProofType;
            default:
                return null;
        }
    }
}
