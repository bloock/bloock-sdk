import { ProofType as ProofTypeProto } from "../../bridge/proto/identity_entities_v2";

export enum ProofType {
  INTEGRITY_PROOF_TYPE = 0,
  SPARSE_MT_PROOF_TYPE = 1
}

export namespace ProofType {
  export function toProto(this: ProofType): ProofTypeProto {
    switch (this) {
      case ProofType.INTEGRITY_PROOF_TYPE:
        return ProofTypeProto.IntegrityProofType;
      case ProofType.SPARSE_MT_PROOF_TYPE:
        return ProofTypeProto.SparseMtProofType;
      default:
        return ProofTypeProto.UNRECOGNIZED;
    }
  }
}
