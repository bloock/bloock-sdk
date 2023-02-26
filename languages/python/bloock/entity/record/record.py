from __future__ import annotations

import bloock._bridge.proto.record_entities_pb2 as proto
from bloock._bridge import bridge
from bloock._bridge.proto.record_pb2 import SetProofRequest, GetHashRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import ConfigData
from bloock.entity.integrity.proof import Proof


class RecordHeader:
    def __init__(self, ty: str) -> None:
        self.ty = ty

    @staticmethod
    def from_proto(header: proto.RecordHeader) -> RecordHeader:
        return RecordHeader(header.ty)

    def to_proto(self) -> proto.RecordHeader:
        return proto.RecordHeader(ty=self.ty)


class Record:
    def __init__(self, payload: bytes, hash: str, config_data: ConfigData) -> None:
        self.payload = payload
        self.hash = hash
        self.config_data = config_data

    @staticmethod
    def from_proto(record: proto.Record, config_data: ConfigData) -> Record:
        return Record(payload=record.payload, hash=record.hash, config_data=config_data)

    def to_proto(self) -> proto.Record:
        return proto.Record(
            config_data=self.config_data, payload=self.payload, hash=self.hash
        )

    def get_hash(self) -> str:
        client = bridge.BloockBridge()
        req = GetHashRequest(config_data=self.config_data, record=self.to_proto())
        res = client.record().GetHash(req)
        if res.error != Error():
            raise Exception(res.error.message)
        return res.hash

    def retrieve(self) -> bytes:
        return self.payload

    def set_proof(self, proof: Proof):
        client = bridge.BloockBridge()
        req = SetProofRequest(
            config_data=self.config_data,
            record=self.to_proto(),
            proof=proof.to_proto(),
        )
        res = client.record().SetProof(req)

        if res.error != Error():
            raise Exception(res.error.message)

        self.payload = res.record.payload
