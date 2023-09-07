from __future__ import annotations

import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.credential import Credential


class CredentialReceipt:
    def __init__(self, credential: Credential, credential_id: str, credential_type: str, anchor_id: int) -> None:
        self.credential = credential
        self.credential_id = credential_id
        self.credential_type = credential_type
        self.anchor_id = anchor_id

    @staticmethod
    def from_proto(c: proto.CredentialReceiptV2) -> CredentialReceipt:
        return CredentialReceipt(
            credential=Credential.from_proto(c.credential),
            credential_id=c.credential_id,
            credential_type=c.credential_type,
            anchor_id=c.anchor_id,
        )

    def to_proto(self) -> proto.CredentialReceiptV2:
        return proto.CredentialReceiptV2(
            credential=self.credential.to_proto(),
            credential_id=self.credential_id,
            credential_type=self.credential_type,
            anchor_id=self.anchor_id,
        )
