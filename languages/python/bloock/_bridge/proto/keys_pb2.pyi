"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import config_pb2
import google.protobuf.descriptor
import google.protobuf.message
import keys_entities_pb2
import shared_pb2
import sys

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class GenerateLocalKeyRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    KEY_TYPE_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    key_type: keys_entities_pb2.KeyType.ValueType
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        key_type: keys_entities_pb2.KeyType.ValueType = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "key_type", b"key_type"]) -> None: ...

global___GenerateLocalKeyRequest = GenerateLocalKeyRequest

class GenerateLocalKeyResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    LOCAL_KEY_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def local_key(self) -> keys_entities_pb2.LocalKey: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        local_key: keys_entities_pb2.LocalKey | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "local_key", b"local_key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "local_key", b"local_key"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GenerateLocalKeyResponse = GenerateLocalKeyResponse

class GenerateManagedKeyRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    PARAMS_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def params(self) -> keys_entities_pb2.ManagedKeyParams: ...
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        params: keys_entities_pb2.ManagedKeyParams | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "params", b"params"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "params", b"params"]) -> None: ...

global___GenerateManagedKeyRequest = GenerateManagedKeyRequest

class GenerateManagedKeyResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    MANAGED_KEY_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def managed_key(self) -> keys_entities_pb2.ManagedKey: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        managed_key: keys_entities_pb2.ManagedKey | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "managed_key", b"managed_key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "managed_key", b"managed_key"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GenerateManagedKeyResponse = GenerateManagedKeyResponse
