import bloock._bridge.proto.record_pb2 as proto
from __future__ import annotations

from bloock.client.entity.proof import Proof


class RecordHeader():
    def __init__(self, ty: str) -> None:
        self.ty = ty

    @staticmethod
    def from_proto(header: proto.RecordHeader) -> RecordHeader:
        return RecordHeader(header.ty)

    def to_proto(self) -> proto.RecordHeader:
        return proto.RecordHeader(ty=self.ty)

class Signature():
    def __init__(self, signature: str, protected: str, header: SignatureHeader) -> None:
        self.signature = signature
        self.protected = protected
        self.header = header

    @staticmethod
    def from_proto(signature: proto.Signature) -> Signature:
        return Signature(
            signature=signature.signature, 
            protected=signature.protected, 
            header=SignatureHeader.from_proto(signature.header)
        )

    def to_proto(self) -> proto.Signature:
        return proto.Signature(
            signature=self.signature, 
            protected=self.protected, 
            header=self.header.to_proto()
        )


class SignatureHeader:
    def __init__(self, alg: str, kid: str) -> None:
        self.alg = alg
        self.kid = kid

    @staticmethod
    def from_proto(header: proto.SignatureHeader) -> SignatureHeader:
        return SignatureHeader(alg=header.alg, kid=header.kid)

    def to_proto(self) -> proto.SignatureHeader:
        return proto.SignatureHeader(alg=self.alg, kid=self.kid)

class EncryptionHeader:
    def __init__(self, alg: str) -> None:
        self.alg = alg

    @staticmethod
    def from_proto(header: proto.EncryptionHeader) -> EncryptionHeader:
        return EncryptionHeader(alg=header.alg)

    def to_proto(self) -> proto.EncryptionHeader:
        return proto.EncryptionHeader(alg=self.alg)

class Encryption():
    def __init__(self, header: EncryptionHeader, protected: str) -> None:
        self.header = header
        self.protected = protected

    @staticmethod
    def from_proto(encryption: proto.Encryption) -> Encryption:
        return Encryption(
            header=EncryptionHeader.from_proto(encryption.header),
            protected=encryption.protected
        )

    def to_proto(self) -> proto.Encryption:
        return proto.Encryption(
            header=self.header.to_proto(),
            protected=self.protected
        )

class Record():
    def __init__(self, headers: RecordHeader, payload: bytes, signatures: list[Signature], encryption: Encryption, proof: Proof) -> None:
        self.headers = headers
        self.payload = payload
        self.signatures = signatures
        self.encryption = encryption
        self.proof = proof

    @staticmethod
    def from_proto(record: proto.Record) -> Record:
        return Record(
            headers = RecordHeader.from_proto(record.headers),
            payload = record.payload,
            signatures = list(map(lambda x: Signature.from_proto(x), record.signatures)),
            encryption = Encryption.from_proto(record.encryption),
            proof = Proof.from_proto(record.proof),
        )

    def to_proto(self) -> proto.Record:
        return proto.Record(
            headers = self.headers.to_proto(),
            payload = self.payload,
            signatures = list(map(lambda x: x.to_proto(), self.signatures)),
            encryption = self.encryption.to_proto(),
            proof = self.proof.to_proto(),
        )
