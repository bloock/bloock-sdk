package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public enum ProofType {
    INTEGRITY_PROOF_TYPE,
    SPARSE_MT_PROOF_TYPE;

    public IdentityEntitiesV2.ProofType toProto() {
        switch (this) {
            case INTEGRITY_PROOF_TYPE:
                return IdentityEntitiesV2.ProofType.IntegrityProofType;
            case SPARSE_MT_PROOF_TYPE:
                return IdentityEntitiesV2.ProofType.SparseMtProofType;
            default:
                return IdentityEntitiesV2.ProofType.UNRECOGNIZED;
        }
    }
}
