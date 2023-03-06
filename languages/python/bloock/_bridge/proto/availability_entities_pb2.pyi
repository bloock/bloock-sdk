"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import sys
import typing

import google.protobuf.descriptor
import google.protobuf.internal.enum_type_wrapper
import google.protobuf.message

if sys.version_info >= (3, 10):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor


class _DataAvailabilityType:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType


class _DataAvailabilityTypeEnumTypeWrapper(
    google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_DataAvailabilityType.ValueType],
    builtins.type):  # noqa: F821
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    HOSTED: _DataAvailabilityType.ValueType  # 0
    IPFS: _DataAvailabilityType.ValueType  # 1


class DataAvailabilityType(_DataAvailabilityType, metaclass=_DataAvailabilityTypeEnumTypeWrapper): ...


HOSTED: DataAvailabilityType.ValueType  # 0
IPFS: DataAvailabilityType.ValueType  # 1
global___DataAvailabilityType = DataAvailabilityType


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


class PublisherArgs(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    def __init__(
            self,
    ) -> None: ...


global___PublisherArgs = PublisherArgs


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
