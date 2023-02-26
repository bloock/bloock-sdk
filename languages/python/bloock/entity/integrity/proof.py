from __future__ import annotations

from typing import List

import bloock._bridge.proto.integrity_entities_pb2 as proto
from bloock.entity.integrity.proof_anchor import ProofAnchor


class Proof:
    def __init__(
            self,
            leaves: List[str],
            nodes: List[str],
            depth: str,
            bitmap: str,
            anchor: ProofAnchor,
    ) -> None:
        self.leaves = leaves
        self.nodes = nodes
        self.depth = depth
        self.bitmap = bitmap
        self.anchor = anchor

    @staticmethod
    def from_proto(proof: proto.Proof) -> Proof:
        return Proof(
            leaves=list(proof.leaves),
            nodes=list(proof.nodes),
            depth=proof.depth,
            bitmap=proof.bitmap,
            anchor=ProofAnchor.from_proto(proof.anchor),
        )

    def to_proto(self) -> proto.Proof:
        return proto.Proof(
            leaves=self.leaves,
            nodes=self.nodes,
            depth=self.depth,
            bitmap=self.bitmap,
            anchor=self.anchor.to_proto(),
        )
