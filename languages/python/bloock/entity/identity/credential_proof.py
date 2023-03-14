from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.authenticity.signature import Signature
from bloock.entity.integrity.proof import Proof


class CredentialProof:
    def __init__(self, bloock_proof: Proof, signature_proof: Signature) -> None:
        self.bloock_proof = bloock_proof
        self.signature_proof = signature_proof

    @staticmethod
    def from_proto(c: proto.CredentialProof) -> CredentialProof:
        return CredentialProof(
            bloock_proof=Proof.from_proto(c.bloock_proof),
            signature_proof=Signature.from_proto(c.signature_proof),
        )

    def to_proto(self) -> proto.CredentialProof:
        return proto.CredentialProof(
            bloock_proof=self.bloock_proof.to_proto(),
            signature_proof=self.signature_proof.to_proto()
        )
