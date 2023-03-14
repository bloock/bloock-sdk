from __future__ import annotations

from typing import List

import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.credential_proof import CredentialProof
from bloock.entity.identity.credential_schema import CredentialSchema
from bloock.entity.identity.credential_status import CredentialStatus


class CredentialBody:
    def __init__(self, context: List[str], id: str, type: List[str], issuance_date: str, credential_subject: str,
                 credential_status: CredentialStatus, issuer: str, credential_schema: CredentialSchema,
                 proof: CredentialProof) -> None:
        self.context = context
        self.id = id
        self.type = type
        self.issuance_date = issuance_date
        self.credential_subject = credential_subject
        self.credential_status = credential_status
        self.issuer = issuer
        self.credential_schema = credential_schema
        self.proof = proof

    @staticmethod
    def from_proto(c: proto.CredentialBody) -> CredentialBody:
        return CredentialBody(
            context=c.context,
            id=c.id,
            type=c.type,
            issuance_date=c.issuance_date,
            credential_subject=c.credential_subject,
            credential_status=CredentialStatus.from_proto(c.credential_status),
            issuer=c.issuer,
            credential_schema=CredentialSchema.from_proto(c.credential_schema),
            proof=CredentialProof.from_proto(c.proof)
        )

    def to_proto(self) -> proto.CredentialBody:
        return proto.CredentialBody(
            context=self.context,
            id=self.id,
            type=self.type,
            issuance_date=self.issuance_date,
            credential_subject=self.credential_subject,
            credential_status=self.credential_status.to_proto(),
            issuer=self.issuer,
            credential_schema=self.credential_schema.to_proto(),
            proof=self.proof.to_proto()
        )
