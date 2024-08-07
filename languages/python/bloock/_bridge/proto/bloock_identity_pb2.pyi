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
import typing

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class GetSchemaRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    ID_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    id: builtins.str
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        id: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "id", b"id"]) -> None: ...

global___GetSchemaRequest = GetSchemaRequest

@typing_extensions.final
class GetSchemaResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    SCHEMA_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def schema(self) -> bloock_identity_entities_pb2.Schema: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        schema: bloock_identity_entities_pb2.Schema | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "schema", b"schema"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "schema", b"schema"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GetSchemaResponse = GetSchemaResponse

@typing_extensions.final
class ImportIssuerResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    DID_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    did: builtins.str
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        did: builtins.str = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "did", b"did", "error", b"error"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___ImportIssuerResponse = ImportIssuerResponse

@typing_extensions.final
class GetCredentialProofRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    ISSUER_DID_FIELD_NUMBER: builtins.int
    CREDENTIAL_ID_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    issuer_did: builtins.str
    credential_id: builtins.str
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        issuer_did: builtins.str = ...,
        credential_id: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "credential_id", b"credential_id", "issuer_did", b"issuer_did"]) -> None: ...

global___GetCredentialProofRequest = GetCredentialProofRequest

@typing_extensions.final
class GetCredentialProofResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PROOF_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def proof(self) -> bloock_identity_entities_pb2.CredentialProof: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        proof: bloock_identity_entities_pb2.CredentialProof | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "proof", b"proof"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "proof", b"proof"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GetCredentialProofResponse = GetCredentialProofResponse

@typing_extensions.final
class CredentialToJsonRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    CREDENTIAL_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    @property
    def credential(self) -> bloock_identity_entities_pb2.Credential: ...
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        credential: bloock_identity_entities_pb2.Credential | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "credential", b"credential"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "credential", b"credential"]) -> None: ...

global___CredentialToJsonRequest = CredentialToJsonRequest

@typing_extensions.final
class CredentialToJsonResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    JSON_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    json: builtins.str
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        json: builtins.str = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "json", b"json"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___CredentialToJsonResponse = CredentialToJsonResponse

@typing_extensions.final
class CredentialFromJsonRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    JSON_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    json: builtins.str
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        json: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "json", b"json"]) -> None: ...

global___CredentialFromJsonRequest = CredentialFromJsonRequest

@typing_extensions.final
class CredentialFromJsonResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CREDENTIAL_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def credential(self) -> bloock_identity_entities_pb2.Credential: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        credential: bloock_identity_entities_pb2.Credential | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "credential", b"credential", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "credential", b"credential", "error", b"error"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___CredentialFromJsonResponse = CredentialFromJsonResponse

@typing_extensions.final
class CreateCredentialRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    SCHEMA_ID_FIELD_NUMBER: builtins.int
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
    def ClearField(self, field_name: typing_extensions.Literal["_version", b"_version", "boolean_attributes", b"boolean_attributes", "config_data", b"config_data", "date_attributes", b"date_attributes", "datetime_attributes", b"datetime_attributes", "decimal_attributes", b"decimal_attributes", "expiration", b"expiration", "holder_did", b"holder_did", "integer_attributes", b"integer_attributes", "key", b"key", "schema_id", b"schema_id", "string_attributes", b"string_attributes", "version", b"version"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_version", b"_version"]) -> typing_extensions.Literal["version"] | None: ...

global___CreateCredentialRequest = CreateCredentialRequest

@typing_extensions.final
class BuildSchemaRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    DISPLAY_NAME_FIELD_NUMBER: builtins.int
    SCHEMA_TYPE_FIELD_NUMBER: builtins.int
    VERSION_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    STRING_ATTRIBUTES_FIELD_NUMBER: builtins.int
    INTEGER_ATTRIBUTES_FIELD_NUMBER: builtins.int
    DECIMAL_ATTRIBUTES_FIELD_NUMBER: builtins.int
    BOOLEAN_ATTRIBUTES_FIELD_NUMBER: builtins.int
    DATE_ATTRIBUTES_FIELD_NUMBER: builtins.int
    DATETIME_ATTRIBUTES_FIELD_NUMBER: builtins.int
    STRING_ENUM_ATTRIBUTES_FIELD_NUMBER: builtins.int
    INTEGER_ENUM_ATTRIBUTES_FIELD_NUMBER: builtins.int
    DECIMAL_ENUM_ATTRIBUTES_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    display_name: builtins.str
    schema_type: builtins.str
    version: builtins.str
    description: builtins.str
    @property
    def string_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.StringAttributeDefinition]: ...
    @property
    def integer_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.IntegerAttributeDefinition]: ...
    @property
    def decimal_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.DecimalAttributeDefinition]: ...
    @property
    def boolean_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.BooleanAttributeDefinition]: ...
    @property
    def date_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.DateAttributeDefinition]: ...
    @property
    def datetime_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.DateTimeAttributeDefinition]: ...
    @property
    def string_enum_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.StringEnumAttributeDefinition]: ...
    @property
    def integer_enum_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.IntegerEnumAttributeDefinition]: ...
    @property
    def decimal_enum_attributes(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[bloock_identity_entities_pb2.DecimalEnumAttributeDefinition]: ...
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        display_name: builtins.str = ...,
        schema_type: builtins.str = ...,
        version: builtins.str = ...,
        description: builtins.str = ...,
        string_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.StringAttributeDefinition] | None = ...,
        integer_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.IntegerAttributeDefinition] | None = ...,
        decimal_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.DecimalAttributeDefinition] | None = ...,
        boolean_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.BooleanAttributeDefinition] | None = ...,
        date_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.DateAttributeDefinition] | None = ...,
        datetime_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.DateTimeAttributeDefinition] | None = ...,
        string_enum_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.StringEnumAttributeDefinition] | None = ...,
        integer_enum_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.IntegerEnumAttributeDefinition] | None = ...,
        decimal_enum_attributes: collections.abc.Iterable[bloock_identity_entities_pb2.DecimalEnumAttributeDefinition] | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["boolean_attributes", b"boolean_attributes", "config_data", b"config_data", "date_attributes", b"date_attributes", "datetime_attributes", b"datetime_attributes", "decimal_attributes", b"decimal_attributes", "decimal_enum_attributes", b"decimal_enum_attributes", "description", b"description", "display_name", b"display_name", "integer_attributes", b"integer_attributes", "integer_enum_attributes", b"integer_enum_attributes", "schema_type", b"schema_type", "string_attributes", b"string_attributes", "string_enum_attributes", b"string_enum_attributes", "version", b"version"]) -> None: ...

global___BuildSchemaRequest = BuildSchemaRequest

@typing_extensions.final
class CreateHolderRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    KEY_FIELD_NUMBER: builtins.int
    CONFIG_DATA_FIELD_NUMBER: builtins.int
    DID_METHOD_FIELD_NUMBER: builtins.int
    @property
    def key(self) -> bloock_keys_entities_pb2.Key: ...
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    did_method: bloock_identity_entities_pb2.DidMethod.ValueType
    def __init__(
        self,
        *,
        key: bloock_keys_entities_pb2.Key | None = ...,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        did_method: bloock_identity_entities_pb2.DidMethod.ValueType = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "key", b"key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "did_method", b"did_method", "key", b"key"]) -> None: ...

global___CreateHolderRequest = CreateHolderRequest

@typing_extensions.final
class CreateIssuerRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    KEY_FIELD_NUMBER: builtins.int
    CONFIG_DATA_FIELD_NUMBER: builtins.int
    DID_METHOD_FIELD_NUMBER: builtins.int
    NAME_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    IMAGE_FIELD_NUMBER: builtins.int
    PUBLISH_INTERVAL_FIELD_NUMBER: builtins.int
    @property
    def key(self) -> bloock_keys_entities_pb2.Key: ...
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    did_method: bloock_identity_entities_pb2.DidMethod.ValueType
    name: builtins.str
    description: builtins.str
    image: builtins.str
    publish_interval: bloock_identity_entities_pb2.PublishInterval.ValueType
    def __init__(
        self,
        *,
        key: bloock_keys_entities_pb2.Key | None = ...,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        did_method: bloock_identity_entities_pb2.DidMethod.ValueType = ...,
        name: builtins.str | None = ...,
        description: builtins.str | None = ...,
        image: builtins.str | None = ...,
        publish_interval: bloock_identity_entities_pb2.PublishInterval.ValueType = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_description", b"_description", "_image", b"_image", "_name", b"_name", "config_data", b"config_data", "description", b"description", "image", b"image", "key", b"key", "name", b"name"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_description", b"_description", "_image", b"_image", "_name", b"_name", "config_data", b"config_data", "description", b"description", "did_method", b"did_method", "image", b"image", "key", b"key", "name", b"name", "publish_interval", b"publish_interval"]) -> None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_description", b"_description"]) -> typing_extensions.Literal["description"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_image", b"_image"]) -> typing_extensions.Literal["image"] | None: ...
    @typing.overload
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_name", b"_name"]) -> typing_extensions.Literal["name"] | None: ...

global___CreateIssuerRequest = CreateIssuerRequest

@typing_extensions.final
class ImportIssuerRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    KEY_FIELD_NUMBER: builtins.int
    CONFIG_DATA_FIELD_NUMBER: builtins.int
    DID_METHOD_FIELD_NUMBER: builtins.int
    @property
    def key(self) -> bloock_keys_entities_pb2.Key: ...
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    did_method: bloock_identity_entities_pb2.DidMethod.ValueType
    def __init__(
        self,
        *,
        key: bloock_keys_entities_pb2.Key | None = ...,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        did_method: bloock_identity_entities_pb2.DidMethod.ValueType = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "key", b"key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "did_method", b"did_method", "key", b"key"]) -> None: ...

global___ImportIssuerRequest = ImportIssuerRequest

@typing_extensions.final
class ForcePublishIssuerStateRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    ISSUER_DID_FIELD_NUMBER: builtins.int
    KEY_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    issuer_did: builtins.str
    @property
    def key(self) -> bloock_keys_entities_pb2.Key: ...
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        issuer_did: builtins.str = ...,
        key: bloock_keys_entities_pb2.Key | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "key", b"key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "issuer_did", b"issuer_did", "key", b"key"]) -> None: ...

global___ForcePublishIssuerStateRequest = ForcePublishIssuerStateRequest

@typing_extensions.final
class CreateCredentialResponse(google.protobuf.message.Message):
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

global___CreateCredentialResponse = CreateCredentialResponse

@typing_extensions.final
class CreateHolderResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    DID_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    did: builtins.str
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        did: builtins.str = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "did", b"did", "error", b"error"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___CreateHolderResponse = CreateHolderResponse

@typing_extensions.final
class CreateIssuerResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    DID_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    did: builtins.str
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        did: builtins.str = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "did", b"did", "error", b"error"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___CreateIssuerResponse = CreateIssuerResponse

@typing_extensions.final
class BuildSchemaResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    SCHEMA_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def schema(self) -> bloock_identity_entities_pb2.Schema: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        schema: bloock_identity_entities_pb2.Schema | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "schema", b"schema"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "schema", b"schema"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___BuildSchemaResponse = BuildSchemaResponse

@typing_extensions.final
class ForcePublishIssuerStateResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    STATE_RECEIPT_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def state_receipt(self) -> bloock_identity_entities_pb2.IssuerStateReceipt: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        state_receipt: bloock_identity_entities_pb2.IssuerStateReceipt | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "state_receipt", b"state_receipt"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "state_receipt", b"state_receipt"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___ForcePublishIssuerStateResponse = ForcePublishIssuerStateResponse

@typing_extensions.final
class RevokeCredentialRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    CREDENTIAL_FIELD_NUMBER: builtins.int
    KEY_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    @property
    def credential(self) -> bloock_identity_entities_pb2.Credential: ...
    @property
    def key(self) -> bloock_keys_entities_pb2.Key: ...
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        credential: bloock_identity_entities_pb2.Credential | None = ...,
        key: bloock_keys_entities_pb2.Key | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "credential", b"credential", "key", b"key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "credential", b"credential", "key", b"key"]) -> None: ...

global___RevokeCredentialRequest = RevokeCredentialRequest

@typing_extensions.final
class RevokeCredentialResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    RESULT_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def result(self) -> bloock_identity_entities_pb2.CredentialRevocation: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        result: bloock_identity_entities_pb2.CredentialRevocation | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "result", b"result"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "result", b"result"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___RevokeCredentialResponse = RevokeCredentialResponse

@typing_extensions.final
class CreateVerificationRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    PROOF_REQUEST_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    proof_request: builtins.str
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        proof_request: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "proof_request", b"proof_request"]) -> None: ...

global___CreateVerificationRequest = CreateVerificationRequest

@typing_extensions.final
class CreateVerificationResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    RESULT_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def result(self) -> bloock_identity_entities_pb2.VerificationReceipt: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        result: bloock_identity_entities_pb2.VerificationReceipt | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "result", b"result"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "result", b"result"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___CreateVerificationResponse = CreateVerificationResponse

@typing_extensions.final
class WaitVerificationRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    SESSION_ID_FIELD_NUMBER: builtins.int
    TIMEOUT_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    session_id: builtins.int
    timeout: builtins.int
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        session_id: builtins.int = ...,
        timeout: builtins.int = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "session_id", b"session_id", "timeout", b"timeout"]) -> None: ...

global___WaitVerificationRequest = WaitVerificationRequest

@typing_extensions.final
class WaitVerificationResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    STATUS_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    status: builtins.bool
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        status: builtins.bool = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "status", b"status"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___WaitVerificationResponse = WaitVerificationResponse

@typing_extensions.final
class GetVerificationStatusRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    SESSION_ID_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    session_id: builtins.int
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        session_id: builtins.int = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "session_id", b"session_id"]) -> None: ...

global___GetVerificationStatusRequest = GetVerificationStatusRequest

@typing_extensions.final
class GetVerificationStatusResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    STATUS_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    status: builtins.bool
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        status: builtins.bool = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error", "status", b"status"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GetVerificationStatusResponse = GetVerificationStatusResponse

@typing_extensions.final
class GetCredentialRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    CREDENTIAL_ID_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    credential_id: builtins.str
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        credential_id: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "credential_id", b"credential_id"]) -> None: ...

global___GetCredentialRequest = GetCredentialRequest

@typing_extensions.final
class GetCredentialResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CREDENTIAL_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def credential(self) -> bloock_identity_entities_pb2.Credential: ...
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        credential: bloock_identity_entities_pb2.Credential | None = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "credential", b"credential", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "credential", b"credential", "error", b"error"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GetCredentialResponse = GetCredentialResponse

@typing_extensions.final
class GetCredentialOfferRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    CREDENTIAL_ID_FIELD_NUMBER: builtins.int
    KEY_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> bloock_config_pb2.ConfigData: ...
    credential_id: builtins.str
    @property
    def key(self) -> bloock_keys_entities_pb2.Key: ...
    def __init__(
        self,
        *,
        config_data: bloock_config_pb2.ConfigData | None = ...,
        credential_id: builtins.str = ...,
        key: bloock_keys_entities_pb2.Key | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "key", b"key"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config_data", b"config_data", "credential_id", b"credential_id", "key", b"key"]) -> None: ...

global___GetCredentialOfferRequest = GetCredentialOfferRequest

@typing_extensions.final
class GetCredentialOfferResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CREDENTIAL_OFFER_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    credential_offer: builtins.str
    @property
    def error(self) -> bloock_shared_pb2.Error: ...
    def __init__(
        self,
        *,
        credential_offer: builtins.str = ...,
        error: bloock_shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_error", b"_error", "credential_offer", b"credential_offer", "error", b"error"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_error", b"_error"]) -> typing_extensions.Literal["error"] | None: ...

global___GetCredentialOfferResponse = GetCredentialOfferResponse
