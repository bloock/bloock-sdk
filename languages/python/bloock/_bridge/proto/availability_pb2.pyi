"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import availability_entities_pb2
import builtins
import config_pb2
import google.protobuf.descriptor
import google.protobuf.message
import record_entities_pb2
import shared_pb2
import sys

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class PublishRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    RECORD_FIELD_NUMBER: builtins.int
    PUBLISHER_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def record(self) -> record_entities_pb2.Record: ...
    @property
    def publisher(self) -> availability_entities_pb2.Publisher: ...
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        record: record_entities_pb2.Record | None = ...,
        publisher: availability_entities_pb2.Publisher | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "config_data",
            b"config_data",
            "publisher",
            b"publisher",
            "record",
            b"record",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "config_data",
            b"config_data",
            "publisher",
            b"publisher",
            "record",
            b"record",
        ],
    ) -> None: ...

global___PublishRequest = PublishRequest

class PublishResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    id: builtins.str
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "id", b"id"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___PublishResponse = PublishResponse

class RetrieveRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    LOADER_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def loader(self) -> availability_entities_pb2.Loader: ...
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        loader: availability_entities_pb2.Loader | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "config_data", b"config_data", "loader", b"loader"
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "config_data", b"config_data", "loader", b"loader"
        ],
    ) -> None: ...

global___RetrieveRequest = RetrieveRequest

class RetrieveResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    RECORD_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def record(self) -> record_entities_pb2.Record: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        record: record_entities_pb2.Record | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "record", b"record"
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "record", b"record"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___RetrieveResponse = RetrieveResponse
