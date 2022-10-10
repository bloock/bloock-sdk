from __future__ import annotations
from typing import List
import bloock._bridge.proto.proof_pb2 as proto
from bloock.client.entity.anchor import AnchorNetwork


class ProofAnchor:
    def __init__(
        self, anchor_id: int, networks: List[AnchorNetwork], root: str, status: str
    ) -> None:
        self.anchor_id = anchor_id
        self.networks = networks
        self.root = root
        self.status = status

    @staticmethod
    def from_proto(proof: proto.ProofAnchor) -> ProofAnchor:
        return ProofAnchor(
            anchor_id=proof.anchor_id,
            networks=list(map(lambda x: AnchorNetwork.from_proto(x), proof.networks)),
            root=proof.root,
            status=proof.status,
        )

    def to_proto(self) -> proto.ProofAnchor:
        return proto.ProofAnchor(
            anchor_id=self.anchor_id,
            networks=list(map(lambda x: x.to_proto(), self.networks)),
            root=self.root,
            status=self.status,
        )


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
