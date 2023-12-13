"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import collections.abc
import config_pb2
import google.protobuf.descriptor
import google.protobuf.internal.containers
import google.protobuf.message
import integrity_entities_pb2
import record_entities_pb2
import shared_pb2
import sys
import typing

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class SendRecordsRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    RECORDS_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def records(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[record_entities_pb2.Record]: ...
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        records: collections.abc.Iterable[record_entities_pb2.Record] | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "records", b"records"]) -> None: ...

global___SendRecordsRequest = SendRecordsRequest

@typing_extensions.final
class SendRecordsResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    RECORDS_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def records(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[integrity_entities_pb2.RecordReceipt]: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        records: collections.abc.Iterable[integrity_entities_pb2.RecordReceipt] | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "records", b"records"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___SendRecordsResponse = SendRecordsResponse

@typing_extensions.final
class GetAnchorRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    ANCHOR_ID_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    anchor_id: builtins.int
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        anchor_id: builtins.int = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["anchor_id", b"anchor_id", "config_data", b"config_data"]) -> None: ...

global___GetAnchorRequest = GetAnchorRequest

@typing_extensions.final
class GetAnchorResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ANCHOR_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def anchor(self) -> integrity_entities_pb2.Anchor: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        anchor: integrity_entities_pb2.Anchor | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_anchor", b"_anchor", "_error", b"_error", "anchor", b"anchor", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_anchor", b"_anchor", "_error", b"_error", "anchor", b"anchor", "error", b"error"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_anchor", b"_anchor"]) -> typing_extensions.Literal["anchor"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GetAnchorResponse = GetAnchorResponse

@typing_extensions.final
class WaitAnchorRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    ANCHOR_ID_FIELD_NUMBER: builtins.int
    TIMEOUT_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    anchor_id: builtins.int
    timeout: builtins.int
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        anchor_id: builtins.int = ...,
        timeout: builtins.int = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["anchor_id", b"anchor_id", "config_data", b"config_data", "timeout", b"timeout"]) -> None: ...

global___WaitAnchorRequest = WaitAnchorRequest

@typing_extensions.final
class WaitAnchorResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ANCHOR_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def anchor(self) -> integrity_entities_pb2.Anchor: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        anchor: integrity_entities_pb2.Anchor | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_anchor", b"_anchor", "_error", b"_error", "anchor", b"anchor", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_anchor", b"_anchor", "_error", b"_error", "anchor", b"anchor", "error", b"error"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_anchor", b"_anchor"]) -> typing_extensions.Literal["anchor"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___WaitAnchorResponse = WaitAnchorResponse

@typing_extensions.final
class GetProofRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    RECORDS_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def records(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[record_entities_pb2.Record]: ...
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        records: collections.abc.Iterable[record_entities_pb2.Record] | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "records", b"records"]) -> None: ...

global___GetProofRequest = GetProofRequest

@typing_extensions.final
class GetProofResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PROOF_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def proof(self) -> integrity_entities_pb2.Proof: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        proof: integrity_entities_pb2.Proof | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "proof", b"proof"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "proof", b"proof"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GetProofResponse = GetProofResponse

@typing_extensions.final
class ValidateRootRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    ROOT_FIELD_NUMBER: builtins.int
    NETWORK_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    root: builtins.str
    network: config_pb2.Network.ValueType
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        root: builtins.str = ...,
        network: config_pb2.Network.ValueType = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "network", b"network", "root", b"root"]) -> None: ...

global___ValidateRootRequest = ValidateRootRequest

@typing_extensions.final
class ValidateRootResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TIMESTAMP_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    timestamp: builtins.int
    """TODO Should be u128"""
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        timestamp: builtins.int = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "timestamp", b"timestamp"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___ValidateRootResponse = ValidateRootResponse

@typing_extensions.final
class VerifyProofRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    PROOF_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def proof(self) -> integrity_entities_pb2.Proof: ...
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        proof: integrity_entities_pb2.Proof | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "proof", b"proof"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "proof", b"proof"]) -> None: ...

global___VerifyProofRequest = VerifyProofRequest

@typing_extensions.final
class VerifyProofResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    RECORD_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    record: builtins.str
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        record: builtins.str | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "_record", b"_record", "error", b"error", "record", b"record"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "_record", b"_record", "error", b"error", "record", b"record"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_record", b"_record"]) -> typing_extensions.Literal["record"] | None: ...

global___VerifyProofResponse = VerifyProofResponse

@typing_extensions.final
class VerifyRecordsRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    RECORDS_FIELD_NUMBER: builtins.int
    NETWORK_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def records(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[record_entities_pb2.Record]: ...
    network: config_pb2.Network.ValueType
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        records: collections.abc.Iterable[record_entities_pb2.Record] | None = ...,
        network: config_pb2.Network.ValueType | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_network", b"_network", "config_data", b"config_data", "network", b"network"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_network", b"_network", "config_data", b"config_data", "network", b"network", "records", b"records"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_network", b"_network"]) -> typing_extensions.Literal["network"] | None: ...

global___VerifyRecordsRequest = VerifyRecordsRequest

@typing_extensions.final
class VerifyRecordsResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TIMESTAMP_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    timestamp: builtins.int
    """TODO Should be u128"""
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        timestamp: builtins.int = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "timestamp", b"timestamp"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___VerifyRecordsResponse = VerifyRecordsResponse
