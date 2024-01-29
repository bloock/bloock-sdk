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
    Bjj: _KeyType.ValueType  # 6

class KeyType(_KeyType, metaclass=_KeyTypeEnumTypeWrapper): ...

EcP256k: KeyType.ValueType  # 0
Rsa2048: KeyType.ValueType  # 1
Rsa3072: KeyType.ValueType  # 2
Rsa4096: KeyType.ValueType  # 3
Aes128: KeyType.ValueType  # 4
Aes256: KeyType.ValueType  # 5
Bjj: KeyType.ValueType  # 6
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

class _CertificateType:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _CertificateTypeEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_CertificateType.ValueType], builtins.type):
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    PEM: _CertificateType.ValueType  # 0
    PFX: _CertificateType.ValueType  # 1

class CertificateType(_CertificateType, metaclass=_CertificateTypeEnumTypeWrapper): ...

PEM: CertificateType.ValueType  # 0
PFX: CertificateType.ValueType  # 1
global___CertificateType = CertificateType

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

@typing_extensions.final
class CertificateSubject(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    COMMON_NAME_FIELD_NUMBER: builtins.int
    ORGANIZATIONAL_UNIT_FIELD_NUMBER: builtins.int
    ORGANIZATION_FIELD_NUMBER: builtins.int
    LOCATION_FIELD_NUMBER: builtins.int
    STATE_FIELD_NUMBER: builtins.int
    COUNTRY_FIELD_NUMBER: builtins.int
    common_name: builtins.str
    organizational_unit: builtins.str
    organization: builtins.str
    location: builtins.str
    state: builtins.str
    country: builtins.str
    def __init__(
        self,
        *,
        common_name: builtins.str = ...,
        organizational_unit: builtins.str | None = ...,
        organization: builtins.str | None = ...,
        location: builtins.str | None = ...,
        state: builtins.str | None = ...,
        country: builtins.str | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_country", b"_country", "_location", b"_location", "_organization", b"_organization", "_organizational_unit", b"_organizational_unit", "_state", b"_state", "country", b"country", "location", b"location", "organization", b"organization", "organizational_unit", b"organizational_unit", "state", b"state"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_country", b"_country", "_location", b"_location", "_organization", b"_organization", "_organizational_unit", b"_organizational_unit", "_state", b"_state", "common_name", b"common_name", "country", b"country", "location", b"location", "organization", b"organization", "organizational_unit", b"organizational_unit", "state", b"state"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_country", b"_country"]) -> typing_extensions.Literal["country"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_location", b"_location"]) -> typing_extensions.Literal["location"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_organization", b"_organization"]) -> typing_extensions.Literal["organization"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_organizational_unit", b"_organizational_unit"]) -> typing_extensions.Literal["organizational_unit"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_state", b"_state"]) -> typing_extensions.Literal["state"] | None: ...

global___CertificateSubject = CertificateSubject

@typing_extensions.final
class LocalCertificateParams(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    KEY_TYPE_FIELD_NUMBER: builtins.int
    PASSWORD_FIELD_NUMBER: builtins.int
    SUBJECT_FIELD_NUMBER: builtins.int
    EXPIRATION_FIELD_NUMBER: builtins.int
    key_type: global___KeyType.ValueType
    password: builtins.str
    @property
    def subject(self) -> global___CertificateSubject: ...
    expiration: builtins.int
    def __init__(
        self,
        *,
        key_type: global___KeyType.ValueType = ...,
        password: builtins.str = ...,
        subject: global___CertificateSubject | None = ...,
        expiration: builtins.int = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["subject", b"subject"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["expiration", b"expiration", "key_type", b"key_type", "password", b"password", "subject", b"subject"]) -> None: ...

global___LocalCertificateParams = LocalCertificateParams

@typing_extensions.final
class LocalCertificate(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PKCS12_FIELD_NUMBER: builtins.int
    PASSWORD_FIELD_NUMBER: builtins.int
    pkcs12: builtins.bytes
    password: builtins.str
    def __init__(
        self,
        *,
        pkcs12: builtins.bytes = ...,
        password: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["password", b"password", "pkcs12", b"pkcs12"]) -> None: ...

global___LocalCertificate = LocalCertificate

@typing_extensions.final
class ManagedCertificateParams(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    KEY_TYPE_FIELD_NUMBER: builtins.int
    EXPIRATION_FIELD_NUMBER: builtins.int
    SUBJECT_FIELD_NUMBER: builtins.int
    key_type: global___KeyType.ValueType
    expiration: builtins.int
    @property
    def subject(self) -> global___CertificateSubject: ...
    def __init__(
        self,
        *,
        key_type: global___KeyType.ValueType = ...,
        expiration: builtins.int = ...,
        subject: global___CertificateSubject | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["subject", b"subject"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["expiration", b"expiration", "key_type", b"key_type", "subject", b"subject"]) -> None: ...

global___ManagedCertificateParams = ManagedCertificateParams

@typing_extensions.final
class ManagedCertificate(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    KEY_FIELD_NUMBER: builtins.int
    PROTECTION_FIELD_NUMBER: builtins.int
    KEY_TYPE_FIELD_NUMBER: builtins.int
    EXPIRATION_FIELD_NUMBER: builtins.int
    id: builtins.str
    key: builtins.str
    protection: global___KeyProtectionLevel.ValueType
    key_type: global___KeyType.ValueType
    expiration: builtins.int
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        key: builtins.str = ...,
        protection: global___KeyProtectionLevel.ValueType = ...,
        key_type: global___KeyType.ValueType = ...,
        expiration: builtins.int = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["expiration", b"expiration", "id", b"id", "key", b"key", "key_type", b"key_type", "protection", b"protection"]) -> None: ...

global___ManagedCertificate = ManagedCertificate

@typing_extensions.final
class AccessControl(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ACCESS_CONTROL_TOTP_FIELD_NUMBER: builtins.int
    ACCESS_CONTROL_SECRET_FIELD_NUMBER: builtins.int
    @property
    def access_control_totp(self) -> global___AccessControlTotp: ...
    @property
    def access_control_secret(self) -> global___AccessControlSecret: ...
    def __init__(
        self,
        *,
        access_control_totp: global___AccessControlTotp | None = ...,
        access_control_secret: global___AccessControlSecret | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_access_control_secret", b"_access_control_secret", "_access_control_totp", b"_access_control_totp", "access_control_secret", b"access_control_secret", "access_control_totp", b"access_control_totp"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_access_control_secret", b"_access_control_secret", "_access_control_totp", b"_access_control_totp", "access_control_secret", b"access_control_secret", "access_control_totp", b"access_control_totp"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_access_control_secret", b"_access_control_secret"]) -> typing_extensions.Literal["access_control_secret"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_access_control_totp", b"_access_control_totp"]) -> typing_extensions.Literal["access_control_totp"] | None: ...

global___AccessControl = AccessControl

@typing_extensions.final
class AccessControlTotp(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CODE_FIELD_NUMBER: builtins.int
    code: builtins.str
    def __init__(
        self,
        *,
        code: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["code", b"code"]) -> None: ...

global___AccessControlTotp = AccessControlTotp

@typing_extensions.final
class AccessControlSecret(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    SECRET_FIELD_NUMBER: builtins.int
    secret: builtins.str
    def __init__(
        self,
        *,
        secret: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["secret", b"secret"]) -> None: ...

global___AccessControlSecret = AccessControlSecret
