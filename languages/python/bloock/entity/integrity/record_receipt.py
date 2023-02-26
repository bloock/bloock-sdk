from __future__ import annotations

import bloock._bridge.proto.integrity_entities_pb2 as proto


class RecordReceipt:
    def __init__(self, anchor: int, client: str, record: str, status: str) -> None:
        self.anchor = anchor
        self.client = client
        self.record = record
        self.status = status

    @staticmethod
    def from_proto(receipt: proto.RecordReceipt) -> RecordReceipt:
        return RecordReceipt(
            anchor=receipt.anchor,
            client=receipt.client,
            record=receipt.record,
            status=receipt.status,
        )

    def to_proto(self) -> proto.RecordReceipt:
        return proto.RecordReceipt(
            anchor=self.anchor,
            client=self.client,
            record=self.record,
            status=self.status,
        )
