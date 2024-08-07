"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import bloock_keys_entities_pb2
import builtins
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

class _DataAvailabilityType:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _DataAvailabilityTypeEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_DataAvailabilityType.ValueType], builtins.type):
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    HOSTED: _DataAvailabilityType.ValueType  # 0
    IPFS: _DataAvailabilityType.ValueType  # 1
    IPNS: _DataAvailabilityType.ValueType  # 2

class DataAvailabilityType(_DataAvailabilityType, metaclass=_DataAvailabilityTypeEnumTypeWrapper): ...

HOSTED: DataAvailabilityType.ValueType  # 0
IPFS: DataAvailabilityType.ValueType  # 1
IPNS: DataAvailabilityType.ValueType  # 2
global___DataAvailabilityType = DataAvailabilityType

@typing_extensions.final
class Publisher(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TYPE_FIELD_NUMBER: builtins.int
    ARGS_FIELD_NUMBER: builtins.int
    type: global___DataAvailabilityType.ValueType
    @property
    def args(self) -> global___PublisherArgs: ...
    def __init__(
        self,
        *,
        type: global___DataAvailabilityType.ValueType = ...,
        args: global___PublisherArgs | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["args", b"args"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["args", b"args", "type", b"type"]) -> None: ...

global___Publisher = Publisher

@typing_extensions.final
class PublisherArgs(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    IPNS_KEY_FIELD_NUMBER: builtins.int
    @property
    def ipns_key(self) -> global___IpnsKey: ...
    def __init__(
        self,
        *,
        ipns_key: global___IpnsKey | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_ipns_key", b"_ipns_key", "ipns_key", b"ipns_key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_ipns_key", b"_ipns_key", "ipns_key", b"ipns_key"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_ipns_key", b"_ipns_key"]) -> typing_extensions.Literal["ipns_key"] | None: ...

global___PublisherArgs = PublisherArgs

@typing_extensions.final
class Loader(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TYPE_FIELD_NUMBER: builtins.int
    ARGS_FIELD_NUMBER: builtins.int
    type: global___DataAvailabilityType.ValueType
    @property
    def args(self) -> global___LoaderArgs: ...
    def __init__(
        self,
        *,
        type: global___DataAvailabilityType.ValueType = ...,
        args: global___LoaderArgs | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["args", b"args"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["args", b"args", "type", b"type"]) -> None: ...

global___Loader = Loader

@typing_extensions.final
class LoaderArgs(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    id: builtins.str
    def __init__(
        self,
        *,
        id: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id"]) -> None: ...

global___LoaderArgs = LoaderArgs

@typing_extensions.final
class IpnsKey(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    MANAGED_KEY_FIELD_NUMBER: builtins.int
    MANAGED_CERTIFICATE_FIELD_NUMBER: builtins.int
    @property
    def managed_key(self) -> bloock_keys_entities_pb2.ManagedKey: ...
    @property
    def managed_certificate(self) -> bloock_keys_entities_pb2.ManagedCertificate: ...
    def __init__(
        self,
        *,
        managed_key: bloock_keys_entities_pb2.ManagedKey | None = ...,
        managed_certificate: bloock_keys_entities_pb2.ManagedCertificate | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_managed_certificate", b"_managed_certificate", "_managed_key", b"_managed_key", "managed_certificate", b"managed_certificate", "managed_key", b"managed_key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_managed_certificate", b"_managed_certificate", "_managed_key", b"_managed_key", "managed_certificate", b"managed_certificate", "managed_key", b"managed_key"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_managed_certificate", b"_managed_certificate"]) -> typing_extensions.Literal["managed_certificate"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_managed_key", b"_managed_key"]) -> typing_extensions.Literal["managed_key"] | None: ...

global___IpnsKey = IpnsKey
