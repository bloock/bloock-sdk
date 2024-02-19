from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto

class IssuerStateReceipt:
    """
    Represents a receipt for the issuer's state.
    """
    def __init__(self, txHash: str) -> None:
        """
        Constructs an IssuerStateReceipt object with the specified parameters.
        :type txHash: object
        :rtype: object
        """
        self.txHash = txHash

    @staticmethod
    def from_proto(c: proto.IssuerStateReceipt) -> IssuerStateReceipt:
        return IssuerStateReceipt(
            txHash=c.tx_hash
        )

    def to_proto(self) -> proto.IssuerStateReceipt:
        return proto.IssuerStateReceipt(
            tx_hash=self.txHash
        )
