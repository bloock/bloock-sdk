"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import config_pb2
import google.protobuf.descriptor
import google.protobuf.internal.enum_type_wrapper
import google.protobuf.message
import sys
import typing

if sys.version_info >= (3, 10):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class _RecordTypes:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _RecordTypesEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_RecordTypes.ValueType], builtins.type):
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    STRING: _RecordTypes.ValueType  # 0
    HEX: _RecordTypes.ValueType  # 1
    JSON: _RecordTypes.ValueType  # 2
    BYTES: _RecordTypes.ValueType  # 3
    FILE: _RecordTypes.ValueType  # 4
    RECORD: _RecordTypes.ValueType  # 5
    LOADER: _RecordTypes.ValueType  # 6

class RecordTypes(_RecordTypes, metaclass=_RecordTypesEnumTypeWrapper): ...

STRING: RecordTypes.ValueType  # 0
HEX: RecordTypes.ValueType  # 1
JSON: RecordTypes.ValueType  # 2
BYTES: RecordTypes.ValueType  # 3
FILE: RecordTypes.ValueType  # 4
RECORD: RecordTypes.ValueType  # 5
LOADER: RecordTypes.ValueType  # 6
global___RecordTypes = RecordTypes

@typing_extensions.final
class RecordHeader(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TY_FIELD_NUMBER: builtins.int
    ty: builtins.str
    def __init__(
        self,
        *,
        ty: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["ty", b"ty"]) -> None: ...

global___RecordHeader = RecordHeader

@typing_extensions.final
class Record(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    PAYLOAD_FIELD_NUMBER: builtins.int
    HASH_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    payload: builtins.bytes
    hash: builtins.str
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        payload: builtins.bytes = ...,
        hash: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_config_data", b"_config_data", "config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_config_data", b"_config_data", "config_data", b"config_data", "hash", b"hash", "payload", b"payload"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_config_data", b"_config_data"]) -> typing_extensions.Literal["config_data"] | None: ...

global___Record = Record
