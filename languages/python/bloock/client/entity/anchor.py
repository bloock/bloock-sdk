from __future__ import annotations
from typing import List
import bloock._bridge.proto.anchor_pb2 as proto


class Anchor:
    def __init__(
        self,
        id: int,
        block_roots: List[str],
        networks: List[AnchorNetwork],
        root: str,
        status: str,
    ) -> None:
        self.id = id
        self.block_roots = block_roots
        self.networks = networks
        self.root = root
        self.status = status

    @staticmethod
    def from_proto(anchor: proto.Anchor) -> Anchor:
        return Anchor(
            id=anchor.id,
            block_roots=list(anchor.block_roots),
            networks=list(map(lambda x: AnchorNetwork.from_proto(x), anchor.networks)),
            root=anchor.root,
            status=anchor.status,
        )

    def to_proto(self) -> proto.Anchor:
        return proto.Anchor(
            id=self.id,
            block_roots=list(self.block_roots),
            networks=list(map(lambda x: x.to_proto(), self.networks)),
            root=self.root,
            status=self.status,
        )


class AnchorNetwork:
    def __init__(self, name: str, state: str, tx_hash: str) -> None:
        self.name = name
        self.state = state
        self.tx_hash = tx_hash

    @staticmethod
    def from_proto(network: proto.AnchorNetwork) -> AnchorNetwork:
        return AnchorNetwork(
            name=network.name, state=network.state, tx_hash=network.tx_hash
        )

    def to_proto(self) -> proto.AnchorNetwork:
        return proto.AnchorNetwork(
            name=self.name, state=self.state, tx_hash=self.tx_hash
        )
