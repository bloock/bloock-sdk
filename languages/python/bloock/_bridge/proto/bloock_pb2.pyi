"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import config_pb2
import google.protobuf.descriptor
import google.protobuf.message
import sys

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class HelloRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_FIELD_NUMBER: builtins.int
    NAME_FIELD_NUMBER: builtins.int
    @property
    def config(self) -> config_pb2.ConfigData: ...
    name: builtins.str
    def __init__(
        self,
        *,
        config: config_pb2.ConfigData | None = ...,
        name: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config", b"config"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config", b"config", "name", b"name"]) -> None: ...

global___HelloRequest = HelloRequest

class HelloResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    MESSAGE_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    message: builtins.str
    @property
    def error(self) -> global___Error: ...
    def __init__(
        self,
        *,
        message: builtins.str = ...,
        error: global___Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "message", b"message"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___HelloResponse = HelloResponse

class Error(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    KIND_FIELD_NUMBER: builtins.int
    MESSAGE_FIELD_NUMBER: builtins.int
    kind: builtins.str
    message: builtins.str
    def __init__(
        self,
        *,
        kind: builtins.str = ...,
        message: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["kind", b"kind", "message", b"message"]) -> None: ...

global___Error = Error