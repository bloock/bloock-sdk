from __future__ import annotations
from typing import List

import bloock._bridge.proto.record_entities_pb2 as proto
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import ConfigData
from bloock.entity.integrity.proof import Proof
from bloock.entity.authenticity.signature import Signature
from bloock.entity.encryption.encryption_alg import EncryptionAlg


class IntegrityDetails:
    def __init__(self, hash: str, proof: Proof | None) -> None:
        self.hash = hash
        self.proof = proof

    @staticmethod
    def from_proto(details: proto.IntegrityDetails) -> IntegrityDetails:
        proof = None
        if details.HasField("proof"):
            proof = details.proof

        return IntegrityDetails(hash=details.hash, proof=proof)

    def to_proto(self) -> proto.IntegrityDetails:
        return proto.IntegrityDetails(
            hash=self.hash, proof=self.proof
        )
    
class AuthenticityDetails:
    def __init__(self, signatures: List[Signature]) -> None:
        self.signatures = signatures

    @staticmethod
    def from_proto(details: proto.AuthenticityDetails) -> AuthenticityDetails:
        return AuthenticityDetails(signatures=list(map(lambda x: Signature.from_proto(x), details.signatures)))

    def to_proto(self) -> proto.AuthenticityDetails:
        return proto.AuthenticityDetails(signatures=list(map(lambda x: x.to_proto(), self.signatures)))
    
class EncryptionDetails:
    def __init__(self, alg: str | None, key: str | None, subject: str | None) -> None:
        self.alg = alg
        self.key = key
        self.subject = subject

    @staticmethod
    def from_proto(details: proto.EncryptionDetails) -> EncryptionDetails:
        alg = None
        if details.HasField("alg"):
            alg = details.alg
            
        key = None
        if details.HasField("key"):
            key = details.key

        subject = None
        if details.HasField("subject"):
            subject = details.subject

        return EncryptionDetails(alg=alg, key=key, subject=subject)

    def to_proto(self) -> proto.EncryptionDetails:
        return proto.EncryptionDetails(
            alg=self.alg, key=self.key, subject=self.subject
        )
    
class AvailabilityDetails:
    def __init__(self, type: str | None, size: int) -> None:
        self.type = type
        self.size = size

    @staticmethod
    def from_proto(details: proto.AvailabilityDetails) -> AvailabilityDetails:
        type = None
        if details.HasField("type"):
            type = details.type

        return AvailabilityDetails(type=type, size=details.size)

    def to_proto(self) -> proto.AvailabilityDetails:
        return proto.AvailabilityDetails(
            type=self.type, size=self.size
        )

class RecordDetails:
    def __init__(self, integrity: IntegrityDetails | None, authenticity: AuthenticityDetails | None, encryption: EncryptionDetails | None, availability: AvailabilityDetails | None) -> None:
        self.integrity = integrity
        self.authenticity = authenticity
        self.encryption = encryption
        self.availability = availability

    @staticmethod
    def from_proto(details: proto.RecordDetails) -> RecordDetails:
        integrity = None
        if details.HasField("integrity"):
            integrity = IntegrityDetails.from_proto(details.integrity)

        authenticity = None
        if details.HasField("authenticity"):
            authenticity = AuthenticityDetails.from_proto(details.authenticity)

        encryption = None
        if details.HasField("encryption"):
            encryption = EncryptionDetails.from_proto(details.encryption)

        availability = None
        if details.HasField("availability"):
            availability = AvailabilityDetails.from_proto(details.availability)

        return RecordDetails(
            integrity=integrity,
            authenticity=authenticity,
            encryption=encryption,
            availability=availability
        )

    def to_proto(self) -> proto.RecordDetails:
        return proto.RecordDetails(
            integrity=self.integrity.to_proto(),
            authenticity=self.authenticity.to_proto(),
            encryption=self.encryption.to_proto(),
            availability=self.availability.to_proto(),
        )
