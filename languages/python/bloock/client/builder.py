from __future__ import annotations
from bloock._bridge import bridge
import bloock._bridge.proto.record_pb2 as proto
from bloock._bridge.proto.shared_pb2 import Error
from bloock.client.entity.encrypter import Encrypter
from bloock.client.entity.decrypter import Decrypter
from bloock.client.entity.record import Record
from bloock.client.entity.signer import Signer


class RecordBuilder:
    def __init__(
        self,
        payload,
        payload_type: proto.RecordTypes.ValueType,
        signer: proto.Signer | None,
        encrypter: proto.Encrypter | None,
        decrypter: proto.Decrypter | None,
    ) -> None:
        self.payload = payload
        self.payload_type = payload_type
        self.signer = signer
        self.encrypter = encrypter
        self.decrypter = decrypter

    @staticmethod
    def from_record(record: Record) -> RecordBuilder:
        return RecordBuilder(
            payload=record.to_proto(),
            payload_type=proto.RecordTypes.RECORD,
            signer=None,
            encrypter=None,
            decrypter=None,
        )

    @staticmethod
    def from_string(string: str) -> RecordBuilder:
        return RecordBuilder(
            payload=string,
            payload_type=proto.RecordTypes.STRING,
            signer=None,
            encrypter=None,
            decrypter=None,
        )

    @staticmethod
    def from_hex(hex: str) -> RecordBuilder:
        return RecordBuilder(
            payload=hex,
            payload_type=proto.RecordTypes.HEX,
            signer=None,
            encrypter=None,
            decrypter=None,
        )

    @staticmethod
    def from_json(json: str) -> RecordBuilder:
        return RecordBuilder(
            payload=json,
            payload_type=proto.RecordTypes.JSON,
            signer=None,
            encrypter=None,
            decrypter=None,
        )

    @staticmethod
    def from_file(file: bytes) -> RecordBuilder:
        return RecordBuilder(
            payload=file,
            payload_type=proto.RecordTypes.FILE,
            signer=None,
            encrypter=None,
            decrypter=None,
        )

    @staticmethod
    def from_bytes(b: bytes) -> RecordBuilder:
        return RecordBuilder(
            payload=b,
            payload_type=proto.RecordTypes.BYTES,
            signer=None,
            encrypter=None,
            decrypter=None,
        )

    @staticmethod
    def from_raw(b: str) -> RecordBuilder:
        return RecordBuilder(
            payload=b,
            payload_type=proto.RecordTypes.RAW,
            signer=None,
            encrypter=None,
            decrypter=None,
        )

    def with_signer(self, signer: Signer) -> RecordBuilder:
        self.signer = signer.to_proto()
        return self

    def with_encrypter(self, encrypter: Encrypter) -> RecordBuilder:
        self.encrypter = encrypter.to_proto()
        return self

    def with_decrypter(self, decrypter: Decrypter) -> RecordBuilder:
        self.decrypter = decrypter.to_proto()
        return self

    def build(self) -> Record:
        client = bridge.BloockBridge()

        res = proto.RecordBuilderResponse()

        if self.payload_type == proto.RecordTypes.RECORD:
            res = client.record().BuildRecordFromRecord(
                proto.RecordBuilderFromRecordRequest(
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == proto.RecordTypes.STRING:
            res = client.record().BuildRecordFromString(
                proto.RecordBuilderFromStringRequest(
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == proto.RecordTypes.HEX:
            res = client.record().BuildRecordFromHex(
                proto.RecordBuilderFromHexRequest(
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == proto.RecordTypes.JSON:
            res = client.record().BuildRecordFromJson(
                proto.RecordBuilderFromJSONRequest(
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == proto.RecordTypes.FILE:
            res = client.record().BuildRecordFromFile(
                proto.RecordBuilderFromFileRequest(
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == proto.RecordTypes.BYTES:
            res = client.record().BuildRecordFromBytes(
                proto.RecordBuilderFromBytesRequest(
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == proto.RecordTypes.RAW:
            res = client.record().BuildRecordFromRaw(
                proto.RecordBuilderFromRawRequest(
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )

        if res.error != Error():
            raise Exception(res.error.message)

        return Record.from_proto(res.record)
