from __future__ import annotations

import bloock._bridge.proto.integrity_entities_pb2 as proto


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
