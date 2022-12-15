from __future__ import annotations
from typing import List
from bloock._bridge import bridge
import bloock._bridge.proto.record_pb2 as proto
from bloock._bridge.proto.proof_pb2 import SetProofRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock.client.entity.proof import Proof
from bloock.client.entity.publisher import Publisher
from bloock._config.config import Config


class RecordHeader:
    def __init__(self, ty: str) -> None:
        self.ty = ty

    @staticmethod
    def from_proto(header: proto.RecordHeader) -> RecordHeader:
        return RecordHeader(header.ty)

    def to_proto(self) -> proto.RecordHeader:
        return proto.RecordHeader(ty=self.ty)


class Signature:
    def __init__(self, signature: str, protected: str, header: SignatureHeader) -> None:
        self.signature = signature
        self.protected = protected
        self.header = header

    @staticmethod
    def from_proto(signature: proto.Signature) -> Signature:
        return Signature(
            signature=signature.signature,
            protected=signature.protected,
            header=SignatureHeader.from_proto(signature.header),
        )

    def to_proto(self) -> proto.Signature:
        return proto.Signature(
            signature=self.signature,
            protected=self.protected,
            header=self.header.to_proto(),
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


class Record:
    def __init__(
        self,
        payload: bytes,
    ) -> None:
        self.payload = payload

    @staticmethod
    def from_proto(record: proto.Record) -> Record:
        return Record(payload=record.payload)

    def to_proto(self) -> proto.Record:
        return proto.Record(
            config_data=Config.new(),
            payload=self.payload,
        )

    def get_hash(self) -> str:
        client = bridge.BloockBridge()
        res = client.record().GetHash(self.to_proto())
        if res.error != Error():
            raise Exception(res.error.message)
        return res.hash

    def get_signatures(self) -> List[Signature]:
        client = bridge.BloockBridge()
        res = client.record().GetSignatures(self.to_proto())
        if res.error != Error():
            raise Exception(res.error.message)
        return list(map(lambda x: Signature.from_proto(x), res.signatures))

    def publish(self, publisher: Publisher) -> str:
        client = bridge.BloockBridge()
        req = proto.PublishRequest(
            config_data=Config.new(),
            publisher=publisher.to_proto(),
            record=self.to_proto(),
        )
        res = client.record().Publish(req)
        if res.error != Error():
            raise Exception(res.error.message)
        return res.hash

    def retrieve(self) -> bytes:
        return self.payload

    def set_proof(self, proof: Proof):
        client = bridge.BloockBridge()
        req = SetProofRequest(
            config_data=Config.new(),
            record=self.to_proto(),
            proof=proof.to_proto(),
        )
        res = client.proof().SetProof(req)

        if res.error != Error():
            raise Exception(res.error.message)

        self.payload = res.record.payload


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


class KeyPair:
    def __init__(self, public_key: str, private_key: str) -> None:
        self.public_key = public_key
        self.private_key = private_key


class EcsdaKeys(KeyPair):
    @staticmethod
    def from_proto(res: proto.GenerateKeysResponse) -> KeyPair:
        return EcsdaKeys(res.publicKey, res.privateKey)


class RsaKeyPair(KeyPair):
    @staticmethod
    def from_proto(res: proto.GenerateRsaKeyPairResponse) -> KeyPair:
        return KeyPair(res.publicKey, res.privateKey)


class EciesKeyPair(KeyPair):
    @staticmethod
    def from_proto(res: proto.GenerateEciesKeyPairResponse) -> KeyPair:
        return KeyPair(res.publicKey, res.privateKey)
