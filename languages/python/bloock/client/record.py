from __future__ import annotations

import bloock._bridge.proto.bloock_authenticity_entities_pb2 as authenticity_entities
import bloock._bridge.proto.bloock_encryption_entities_pb2 as encryption_entities
import bloock._bridge.proto.bloock_record_pb2 as proto
from bloock._bridge import bridge
from bloock._bridge.proto.bloock_record_entities_pb2 import RecordTypes
from bloock._bridge.proto.bloock_shared_pb2 import Error
from bloock._config.config import Config, ConfigData
from bloock.entity.authenticity.signer import Signer
from bloock.entity.availability.loader import Loader
from bloock.entity.encryption.encrypter import Encrypter
from bloock.entity.record.record import Record
from bloock.entity.record.record_details import RecordDetails


class RecordClient:
    """
    Provides functionality for creating records using various data sources and to interact with the [Bloock Record service](https://dashboard.bloock.com/login).
    """
    def __init__(self, config_data=None) -> None:
        """
        Creates a new RecordClient with the provided configuration.
        :type config_data: object
        :rtype: object
        """
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def from_record(self, record: Record) -> RecordBuilder:
        """
        Creates a RecordBuilder from an existing record.
        :type record: object
        :rtype: object
        """
        return RecordBuilder(
            payload=record.to_proto(),
            payload_type=RecordTypes.RECORD,
            config_data=self.config_data,
        )

    def from_loader(self, loader: Loader) -> RecordBuilder:
        """
        Creates a RecordBuilder from a data loader.
        :type loader: object
        :rtype: object
        """
        return RecordBuilder(
            payload=loader.to_proto(),
            payload_type=RecordTypes.LOADER,
            config_data=self.config_data,
        )

    def from_string(self, string: str) -> RecordBuilder:
        """
        Creates a RecordBuilder from a string payload.
        :type string: object
        :rtype: object
        """
        return RecordBuilder(
            payload=string,
            payload_type=RecordTypes.STRING,
            config_data=self.config_data,
        )

    def from_hex(self, hex: str) -> RecordBuilder:
        """
        Creates a RecordBuilder from a hexadecimal string payload.
        :type hex: object
        :rtype: object
        """
        return RecordBuilder(
            payload=hex,
            payload_type=RecordTypes.HEX,
            config_data=self.config_data,
        )

    def from_json(self, json: str) -> RecordBuilder:
        """
        Creates a RecordBuilder from a JSON string payload.
        :type json: object
        :rtype: object
        """
        return RecordBuilder(
            payload=json,
            payload_type=RecordTypes.JSON,
            config_data=self.config_data,
        )

    def from_file(self, file: bytes) -> RecordBuilder:
        """
        Creates a RecordBuilder from a byte slice representing a file.
        :type file: object
        :rtype: object
        """
        return RecordBuilder(
            payload=file,
            payload_type=RecordTypes.FILE,
            config_data=self.config_data,
        )

    def from_bytes(self, b: bytes) -> RecordBuilder:
        """
        Creates a RecordBuilder from a byte slice payload.
        :type b: object
        :rtype: object
        """
        return RecordBuilder(
            payload=b,
            payload_type=RecordTypes.BYTES,
            config_data=self.config_data,
        )


class RecordBuilder:
    """
    Assists in constructing records with various configurations.
    """
    def __init__(
            self,
            payload,
            payload_type: RecordTypes.ValueType,
            config_data: ConfigData,
            signer: authenticity_entities.Signer | None = None,
            encrypter: encryption_entities.Encrypter | None = None,
            decrypter: encryption_entities.Decrypter | None = None,
    ) -> None:
        """
        Creates a new RecordBuilder with default configuration.
        :type decrypter: object
        :type encrypter: object
        :type signer: object
        :type config_data: object
        :type payload_type: object
        :type payload: object
        :rtype: object
        """
        self.payload = payload
        self.payload_type = payload_type
        self.config_data = config_data
        self.signer = signer
        self.encrypter = encrypter
        self.decrypter = decrypter

    def with_signer(self, signer: Signer) -> RecordBuilder:
        """
        Sets the signer for the RecordBuilder.
        :type signer: object
        :rtype: object
        """
        self.signer = signer.to_proto()
        return self

    def with_encrypter(self, encrypter: Encrypter) -> RecordBuilder:
        """
        Sets the encrypter for the RecordBuilder.
        :type encrypter: object
        :rtype: object
        """
        self.encrypter = encrypter.to_proto()
        return self

    def with_decrypter(self, decrypter: Encrypter) -> RecordBuilder:
        """
        Sets the decrypter for the RecordBuilder.
        :type decrypter: object
        :rtype: object
        """
        self.decrypter = decrypter.to_proto()
        return self

    def build(self) -> Record:
        """
        Constructs a record based on the RecordBuilder's configuration.
        :rtype: object
        """
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

    def get_details(self) -> RecordDetails:
        """
        Gets details about other Bloock services (Integrity, Authenticity, Encryption, Availability) configured in the RecordBuilder.
        :rtype: object
        """
        client = bridge.BloockBridge()
        
        res: proto.GetDetailsResponse = client.record().GetDetails(
            proto.GetDetailsRequest(
                payload=self.payload,
                config_data=self.config_data
            )
        )
        
        if res.error != Error():
            raise Exception(res.error.message)

        return RecordDetails.from_proto(res.details)
