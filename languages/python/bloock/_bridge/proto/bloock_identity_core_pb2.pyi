"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import bloock_config_pb2
import bloock_identity_entities_pb2
import bloock_keys_entities_pb2
import bloock_shared_pb2
import builtins
import collections.abc
import google.protobuf.descriptor
import google.protobuf.internal.containers
import google.protobuf.message
import sys

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class CreateCoreCredentialRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    SCHEMA_ID_FIELD_NUMBER: builtins.int
    ISSUER_DID_FIELD_NUMBER: builtins.int
    HOLDER_DID_FIELD_NUMBER: builtins.int
    EXPIRATION_FIELD_NUMBER: builtins.int
    VERSION_FIELD_NUMBER: builtins.int
    KEY_FIELD_NUMBER: builtins.int
    STRING_ATTRIBUTES_FIELD_NUMBER: builtins.int
    INTEGER_ATTRIBUTES_FIELD_NUMBER: builtins.int
    DECIMAL_ATTRIBUTES_FIELD_NUMBER: builtins.int
    BOOLEAN_ATTRIBUTES_FIELD_NUMBER: builtins.int
    DATE_ATTRIBUTES_FIELD_NUMBER: builtins.int
    DATETIME_ATTRIBUTES_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    schema_id: builtins.str
    issuer_did: builtins.str
    holder_did: builtins.str
    expiration: builtins.int
    version: builtins.int
    @property
    def key(self) -> bloock_keys_entities_pb2.Key: ...
    @property
    def string_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.StringAttribute]: ...
    @property
    def integer_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.IntegerAttribute]: ...
    @property
    def decimal_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.DecimalAttribute]: ...
    @property
    def boolean_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.BooleanAttribute]: ...
    @property
    def date_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.DateAttribute]: ...
    @property
    def datetime_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.DateTimeAttribute]: ...
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        schema_id: builtins.str = ...,
        issuer_did: builtins.str = ...,
        holder_did: builtins.str = ...,
        expiration: builtins.int = ...,
        version: builtins.int | None = ...,
        key: bloock_keys_entities_pb2.Key | None = ...,
        string_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.StringAttribute] | None = ...,
        integer_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.IntegerAttribute] | None = ...,
        decimal_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.DecimalAttribute] | None = ...,
        boolean_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.BooleanAttribute] | None = ...,
        date_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.DateAttribute] | None = ...,
        datetime_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.DateTimeAttribute] | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_version", b"_version", "config_data", b"config_data", "key", b"key", "version", b"version"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_version", b"_version", "boolean_attributes", b"boolean_attributes", "config_data", b"config_data", "date_attributes", b"date_attributes", "datetime_attributes", b"datetime_attributes", "decimal_attributes", b"decimal_attributes", "expiration", b"expiration", "holder_did", b"holder_did", "integer_attributes", b"integer_attributes", "issuer_did", b"issuer_did", "key", b"key", "schema_id", b"schema_id", "string_attributes", b"string_attributes", "version", b"version"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_version", b"_version"]) -> typing_extensions.Literal["version"] | None: ...

global___CreateCoreCredentialRequest = CreateCoreCredentialRequest

@typing_extensions.final
class CreateCoreCredentialResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CREDENTIAL_RECEIPT_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def credential_receipt(self) -> bloock_identity_entities_pb2.CredentialReceipt: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        credential_receipt: bloock_identity_entities_pb2.CredentialReceipt | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "credential_receipt", b"credential_receipt", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "credential_receipt", b"credential_receipt", "error", b"error"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___CreateCoreCredentialResponse = CreateCoreCredentialResponse
