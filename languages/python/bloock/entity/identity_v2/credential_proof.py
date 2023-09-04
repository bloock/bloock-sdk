from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto


class CredentialProof:
    def __init__(self, signature_proof: str, integrity_proof: str | None, sparse_mt_proof: str | None) -> None:
        self.signature_proof = signature_proof
        self.integrity_proof = integrity_proof
        self.sparse_mt_proof = sparse_mt_proof

    @staticmethod
    def from_proto(c: proto.CredentialProofV2) -> CredentialProof:
        integrity_proof = None
        if c.integrity_proof is not None:
            if c.integrity_proof != '':
                integrity_proof = c.integrity_proof
        sparse_mt_proof = None
        if c.sparse_mt_proof is not None:
            if c.sparse_mt_proof != '':
                sparse_mt_proof = c.sparse_mt_proof
        return CredentialProof(
            signature_proof=c.signature_proof,
            integrity_proof=integrity_proof,
            sparse_mt_proof=sparse_mt_proof,
        )

    def to_proto(self) -> proto.CredentialProofV2:
        integrity_proof = None
        if self.integrity_proof is not None or self.integrity_proof != '':
            integrity_proof = self.integrity_proof
        sparse_mt_proof = None
        if self.sparse_mt_proof is not None or self.sparse_mt_proof != '':
            sparse_mt_proof = self.sparse_mt_proof

        return proto.CredentialProofV2(
            signature_proof=self.signature_proof,
            integrity_proof=integrity_proof,
            sparse_mt_proof=sparse_mt_proof,
        )
