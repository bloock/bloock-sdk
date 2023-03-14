from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class CredentialReceipt:
    def __init__(self, id: str, anchor_id: int) -> None:
        self.id = id
        self.anchor_id = anchor_id

    @staticmethod
    def from_proto(c: proto.CredentialReceipt) -> CredentialReceipt:
        return CredentialReceipt(
            id=c.id,
            anchor_id=c.anchor_id
        )

    def to_proto(self) -> proto.CredentialReceipt:
        return proto.CredentialReceipt(
            id=self.id,
            anchor_id=self.anchor_id
        )
