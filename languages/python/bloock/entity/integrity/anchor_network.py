from __future__ import annotations

import bloock._bridge.proto.bloock_integrity_entities_pb2 as proto


class AnchorNetwork:
    """
    Represents information about an anchor network.
    """
    def __init__(self, name: str, state: str, tx_hash: str, root: str | None) -> None:
        """
        Constructs an AnchorNetwork object with the specified parameters.
        :type root: object
        :type tx_hash: object
        :type state: object
        :type name: object
        :rtype: object
        """
        self.name = name
        self.state = state
        self.tx_hash = tx_hash
        self.root = root

    @staticmethod
    def from_proto(network: proto.AnchorNetwork) -> AnchorNetwork:
        return AnchorNetwork(
            name=network.name, state=network.state, tx_hash=network.tx_hash, root=network.root
        )

    def to_proto(self) -> proto.AnchorNetwork:
        return proto.AnchorNetwork(
            name=self.name, state=self.state, tx_hash=self.tx_hash, root=self.root
        )
