from __future__ import annotations

from typing import List

import bloock._bridge.proto.bloock_integrity_entities_pb2 as proto
from bloock.entity.integrity.anchor_network import AnchorNetwork


class ProofAnchor:
    """
    Represents a proof anchor.
    """
    def __init__(
            self, anchor_id: int, networks: List[AnchorNetwork], root: str, status: str
    ) -> None:
        """
        Constructs a ProofAnchor object with the specified parameters.
        :type status: object
        :type root: object
        :type networks: object
        :type anchor_id: object
        :rtype: object
        """
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
