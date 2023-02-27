from __future__ import annotations

from typing import List

import bloock._bridge.proto.integrity_entities_pb2 as proto
from bloock.entity.integrity.anchor_network import AnchorNetwork


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
