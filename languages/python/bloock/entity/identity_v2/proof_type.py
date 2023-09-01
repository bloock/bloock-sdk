from __future__ import annotations

from enum import Enum
from bloock._bridge.proto.identity_entities_v2_pb2 import ProofType as ProofTypeProto


class ProofType(Enum):
    INTEGRITY_PROOF_TYPE = 0
    SPARSE_MT_PROOF_TYPE = 1

    def __int__(self):
        return self.value

    @staticmethod
    def to_proto(proofType: ProofType) -> ProofTypeProto.ValueType:
        if proofType == ProofType.INTEGRITY_PROOF_TYPE:
            return ProofTypeProto.IntegrityProofType
        elif proofType == ProofType.SPARSE_MT_PROOF_TYPE:
            return ProofTypeProto.SparseMtProofType
