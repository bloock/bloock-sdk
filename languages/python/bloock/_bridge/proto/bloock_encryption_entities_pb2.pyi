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

class _EncryptionAlg:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _EncryptionAlgEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_EncryptionAlg.ValueType], builtins.type):
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    A256GCM: _EncryptionAlg.ValueType  # 0
    A256GCM_M: _EncryptionAlg.ValueType  # 1
    RSA: _EncryptionAlg.ValueType  # 2
    RSA_M: _EncryptionAlg.ValueType  # 3

class EncryptionAlg(_EncryptionAlg, metaclass=_EncryptionAlgEnumTypeWrapper): ...

A256GCM: EncryptionAlg.ValueType  # 0
A256GCM_M: EncryptionAlg.ValueType  # 1
RSA: EncryptionAlg.ValueType  # 2
RSA_M: EncryptionAlg.ValueType  # 3
global___EncryptionAlg = EncryptionAlg

@typing_extensions.final
class Encrypter(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    LOCAL_KEY_FIELD_NUMBER: builtins.int
    MANAGED_KEY_FIELD_NUMBER: builtins.int
    LOCAL_CERTIFICATE_FIELD_NUMBER: builtins.int
    MANAGED_CERTIFICATE_FIELD_NUMBER: builtins.int
    ACCESS_CONTROL_FIELD_NUMBER: builtins.int
    @property
    def local_key(self) -> bloock_keys_entities_pb2.LocalKey: ...
    @property
    def managed_key(self) -> bloock_keys_entities_pb2.ManagedKey: ...
    @property
    def local_certificate(self) -> bloock_keys_entities_pb2.LocalCertificate: ...
    @property
    def managed_certificate(self) -> bloock_keys_entities_pb2.ManagedCertificate: ...
    @property
    def access_control(self) -> bloock_keys_entities_pb2.AccessControl: ...
    def __init__(
        self,
        *,
        local_key: bloock_keys_entities_pb2.LocalKey | None = ...,
        managed_key: bloock_keys_entities_pb2.ManagedKey | None = ...,
        local_certificate: bloock_keys_entities_pb2.LocalCertificate | None = ...,
        managed_certificate: bloock_keys_entities_pb2.ManagedCertificate | None = ...,
        access_control: bloock_keys_entities_pb2.AccessControl | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_access_control", b"_access_control", "_local_certificate", b"_local_certificate", "_local_key", b"_local_key", "_managed_certificate", b"_managed_certificate", "_managed_key", b"_managed_key", "access_control", b"access_control", "local_certificate", b"local_certificate", "local_key", b"local_key", "managed_certificate", b"managed_certificate", "managed_key", b"managed_key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_access_control", b"_access_control", "_local_certificate", b"_local_certificate", "_local_key", b"_local_key", "_managed_certificate", b"_managed_certificate", "_managed_key", b"_managed_key", "access_control", b"access_control", "local_certificate", b"local_certificate", "local_key", b"local_key", "managed_certificate", b"managed_certificate", "managed_key", b"managed_key"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_access_control", b"_access_control"]) -> typing_extensions.Literal["access_control"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_local_certificate", b"_local_certificate"]) -> typing_extensions.Literal["local_certificate"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_local_key", b"_local_key"]) -> typing_extensions.Literal["local_key"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_managed_certificate", b"_managed_certificate"]) -> typing_extensions.Literal["managed_certificate"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_managed_key", b"_managed_key"]) -> typing_extensions.Literal["managed_key"] | None: ...

global___Encrypter = Encrypter