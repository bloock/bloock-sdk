from __future__ import annotations

import bloock._bridge.proto.authenticity_entities_pb2 as authenticity_entities
import bloock._bridge.proto.encryption_entities_pb2 as encryption_entities
import bloock._bridge.proto.record_pb2 as proto
from bloock._bridge import bridge
from bloock._bridge.proto.record_entities_pb2 import RecordTypes
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config, ConfigData
from bloock.entity.authenticity.signer import Signer
from bloock.entity.availability.loader import Loader
from bloock.entity.encryption.decrypter import Decrypter
from bloock.entity.encryption.encrypter import Encrypter
from bloock.entity.record.record import Record


class RecordClient:
    def __init__(self, config_data=None) -> None:
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def from_record(self, record: Record) -> RecordBuilder:
        return RecordBuilder(
            payload=record.to_proto(),
            payload_type=RecordTypes.RECORD,
            config_data=self.config_data,
        )

    def from_loader(self, loader: Loader) -> RecordBuilder:
        return RecordBuilder(
            payload=loader.to_proto(),
            payload_type=RecordTypes.LOADER,
            config_data=self.config_data,
        )

    def from_string(self, string: str) -> RecordBuilder:
        return RecordBuilder(
            payload=string,
            payload_type=RecordTypes.STRING,
            config_data=self.config_data,
        )

    def from_hex(self, hex: str) -> RecordBuilder:
        return RecordBuilder(
            payload=hex,
            payload_type=RecordTypes.HEX,
            config_data=self.config_data,
        )

    def from_json(self, json: str) -> RecordBuilder:
        return RecordBuilder(
            payload=json,
            payload_type=RecordTypes.JSON,
            config_data=self.config_data,
        )

    def from_file(self, file: bytes) -> RecordBuilder:
        return RecordBuilder(
            payload=file,
            payload_type=RecordTypes.FILE,
            config_data=self.config_data,
        )

    def from_bytes(self, b: bytes) -> RecordBuilder:
        return RecordBuilder(
            payload=b,
            payload_type=RecordTypes.BYTES,
            config_data=self.config_data,
        )


class RecordBuilder:
    def __init__(
            self,
            payload,
            payload_type: RecordTypes.ValueType,
            config_data: ConfigData,
            signer: authenticity_entities.Signer | None = None,
            encrypter: encryption_entities.Encrypter | None = None,
            decrypter: encryption_entities.Decrypter | None = None,
    ) -> None:
        self.payload = payload
        self.payload_type = payload_type
        self.config_data = config_data
        self.signer = signer
        self.encrypter = encrypter
        self.decrypter = decrypter

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

        if self.payload_type == RecordTypes.RECORD:
            res = client.record().BuildRecordFromRecord(
                proto.RecordBuilderFromRecordRequest(
                    config_data=self.config_data,
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == RecordTypes.LOADER:
            res = client.record().BuildRecordFromLoader(
                proto.RecordBuilderFromLoaderRequest(
                    config_data=self.config_data,
                    loader=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == RecordTypes.STRING:
            res = client.record().BuildRecordFromString(
                proto.RecordBuilderFromStringRequest(
                    config_data=self.config_data,
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == RecordTypes.HEX:
            res = client.record().BuildRecordFromHex(
                proto.RecordBuilderFromHexRequest(
                    config_data=self.config_data,
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == RecordTypes.JSON:
            res = client.record().BuildRecordFromJson(
                proto.RecordBuilderFromJSONRequest(
                    config_data=self.config_data,
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == RecordTypes.FILE:
            res = client.record().BuildRecordFromFile(
                proto.RecordBuilderFromFileRequest(
                    config_data=self.config_data,
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )
        elif self.payload_type == RecordTypes.BYTES:
            res = client.record().BuildRecordFromBytes(
                proto.RecordBuilderFromBytesRequest(
                    config_data=self.config_data,
                    payload=self.payload,
                    signer=self.signer,
                    encrypter=self.encrypter,
                    decrypter=self.decrypter,
                )
            )

        if res.error != Error():
            raise Exception(res.error.message)

        return Record.from_proto(res.record, self.config_data)
