from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class CredentialProof:
    """
    Represents the proof associated with a credential, including signature and sparse merkle tree proof.
    """
    def __init__(self, signature_proof: str, sparse_mt_proof: str | None) -> None:
        """
        Constructs an CredentialProof object with the specified parameters.
        :type sparse_mt_proof: object
        :type signature_proof: object
        :rtype: object
        """
        self.signature_proof = signature_proof
        self.sparse_mt_proof = sparse_mt_proof

    @staticmethod
    def from_proto(c: proto.CredentialProof) -> CredentialProof:
        sparse_mt_proof = None
        if c.sparse_mt_proof is not None:
            if c.sparse_mt_proof != '':
                sparse_mt_proof = c.sparse_mt_proof
        return CredentialProof(
            signature_proof=c.signature_proof,
            sparse_mt_proof=sparse_mt_proof,
        )

    def to_proto(self) -> proto.CredentialProof:
        sparse_mt_proof = None
        if self.sparse_mt_proof is not None or self.sparse_mt_proof != '':
            sparse_mt_proof = self.sparse_mt_proof

        return proto.CredentialProof(
            signature_proof=self.signature_proof,
            sparse_mt_proof=sparse_mt_proof,
        )
