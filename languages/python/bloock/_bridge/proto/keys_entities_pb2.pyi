"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
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

class _KeyType:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _KeyTypeEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_KeyType.ValueType], builtins.type):
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    EcP256k: _KeyType.ValueType  # 0
    Rsa2048: _KeyType.ValueType  # 1
    Rsa3072: _KeyType.ValueType  # 2
    Rsa4096: _KeyType.ValueType  # 3
    Aes128: _KeyType.ValueType  # 4
    Aes256: _KeyType.ValueType  # 5

class KeyType(_KeyType, metaclass=_KeyTypeEnumTypeWrapper): ...

EcP256k: KeyType.ValueType  # 0
Rsa2048: KeyType.ValueType  # 1
Rsa3072: KeyType.ValueType  # 2
Rsa4096: KeyType.ValueType  # 3
Aes128: KeyType.ValueType  # 4
Aes256: KeyType.ValueType  # 5
global___KeyType = KeyType

class _KeyProtectionLevel:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _KeyProtectionLevelEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_KeyProtectionLevel.ValueType], builtins.type):
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    SOFTWARE: _KeyProtectionLevel.ValueType  # 0
    HSM: _KeyProtectionLevel.ValueType  # 1

class KeyProtectionLevel(_KeyProtectionLevel, metaclass=_KeyProtectionLevelEnumTypeWrapper): ...

SOFTWARE: KeyProtectionLevel.ValueType  # 0
HSM: KeyProtectionLevel.ValueType  # 1
global___KeyProtectionLevel = KeyProtectionLevel

@typing_extensions.final
class LocalKey(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    KEY_FIELD_NUMBER: builtins.int
    KEY_TYPE_FIELD_NUMBER: builtins.int
    PRIVATE_KEY_FIELD_NUMBER: builtins.int
    key: builtins.str
    key_type: global___KeyType.ValueType
    private_key: builtins.str
    def __init__(
        self,
        *,
        key: builtins.str = ...,
        key_type: global___KeyType.ValueType = ...,
        private_key: builtins.str | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_private_key", b"_private_key", "private_key", b"private_key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_private_key", b"_private_key", "key", b"key", "key_type", b"key_type", "private_key", b"private_key"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_private_key", b"_private_key"]) -> typing_extensions.Literal["private_key"] | None: ...

global___LocalKey = LocalKey

@typing_extensions.final
class ManagedKeyParams(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PROTECTION_FIELD_NUMBER: builtins.int
    KEY_TYPE_FIELD_NUMBER: builtins.int
    NAME_FIELD_NUMBER: builtins.int
    EXPIRATION_FIELD_NUMBER: builtins.int
    protection: global___KeyProtectionLevel.ValueType
    key_type: global___KeyType.ValueType
    name: builtins.str
    expiration: builtins.int
    def __init__(
        self,
        *,
        protection: global___KeyProtectionLevel.ValueType = ...,
        key_type: global___KeyType.ValueType = ...,
        name: builtins.str | None = ...,
        expiration: builtins.int | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_expiration", b"_expiration", "_name", b"_name", "expiration", b"expiration", "name", b"name"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_expiration", b"_expiration", "_name", b"_name", "expiration", b"expiration", "key_type", b"key_type", "name", b"name", "protection", b"protection"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_expiration", b"_expiration"]) -> typing_extensions.Literal["expiration"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_name", b"_name"]) -> typing_extensions.Literal["name"] | None: ...

global___ManagedKeyParams = ManagedKeyParams

@typing_extensions.final
class ManagedKey(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    KEY_FIELD_NUMBER: builtins.int
    PROTECTION_FIELD_NUMBER: builtins.int
    KEY_TYPE_FIELD_NUMBER: builtins.int
    NAME_FIELD_NUMBER: builtins.int
    EXPIRATION_FIELD_NUMBER: builtins.int
    id: builtins.str
    key: builtins.str
    protection: global___KeyProtectionLevel.ValueType
    key_type: global___KeyType.ValueType
    name: builtins.str
    expiration: builtins.int
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        key: builtins.str = ...,
        protection: global___KeyProtectionLevel.ValueType = ...,
        key_type: global___KeyType.ValueType = ...,
        name: builtins.str = ...,
        expiration: builtins.int = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["expiration", b"expiration", "id", b"id", "key", b"key", "key_type", b"key_type", "name", b"name", "protection", b"protection"]) -> None: ...

global___ManagedKey = ManagedKey
