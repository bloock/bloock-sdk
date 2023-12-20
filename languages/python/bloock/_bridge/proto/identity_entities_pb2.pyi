"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import collections.abc
import google.protobuf.descriptor
import google.protobuf.internal.containers
import google.protobuf.message
import integrity_entities_pb2
import sys

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class Identity(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    MNEMONIC_FIELD_NUMBER: builtins.int
    KEY_FIELD_NUMBER: builtins.int
    PRIVATE_KEY_FIELD_NUMBER: builtins.int
    mnemonic: builtins.str
    key: builtins.str
    private_key: builtins.str
    def __init__(
        self,
        *,
        mnemonic: builtins.str = ...,
        key: builtins.str = ...,
        private_key: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["key", b"key", "mnemonic", b"mnemonic", "private_key", b"private_key"]) -> None: ...

global___Identity = Identity

class BooleanAttributeDefinition(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    DISPLAY_NAME_FIELD_NUMBER: builtins.int
    ID_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    display_name: builtins.str
    id: builtins.str
    description: builtins.str
    def __init__(
        self,
        *,
        display_name: builtins.str = ...,
        id: builtins.str = ...,
        description: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["description", b"description", "display_name", b"display_name", "id", b"id"]) -> None: ...

global___BooleanAttributeDefinition = BooleanAttributeDefinition

class DateAttributeDefinition(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    DISPLAY_NAME_FIELD_NUMBER: builtins.int
    ID_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    display_name: builtins.str
    id: builtins.str
    description: builtins.str
    def __init__(
        self,
        *,
        display_name: builtins.str = ...,
        id: builtins.str = ...,
        description: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["description", b"description", "display_name", b"display_name", "id", b"id"]) -> None: ...

global___DateAttributeDefinition = DateAttributeDefinition

class DateTimeAttributeDefinition(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    DISPLAY_NAME_FIELD_NUMBER: builtins.int
    ID_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    display_name: builtins.str
    id: builtins.str
    description: builtins.str
    def __init__(
        self,
        *,
        display_name: builtins.str = ...,
        id: builtins.str = ...,
        description: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["description", b"description", "display_name", b"display_name", "id", b"id"]) -> None: ...

global___DateTimeAttributeDefinition = DateTimeAttributeDefinition

class StringAttributeDefinition(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    DISPLAY_NAME_FIELD_NUMBER: builtins.int
    ID_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    display_name: builtins.str
    id: builtins.str
    description: builtins.str
    def __init__(
        self,
        *,
        display_name: builtins.str = ...,
        id: builtins.str = ...,
        description: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["description", b"description", "display_name", b"display_name", "id", b"id"]) -> None: ...

global___StringAttributeDefinition = StringAttributeDefinition

class NumberAttributeDefinition(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    DISPLAY_NAME_FIELD_NUMBER: builtins.int
    ID_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    display_name: builtins.str
    id: builtins.str
    description: builtins.str
    def __init__(
        self,
        *,
        display_name: builtins.str = ...,
        id: builtins.str = ...,
        description: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["description", b"description", "display_name", b"display_name", "id", b"id"]) -> None: ...

global___NumberAttributeDefinition = NumberAttributeDefinition

class BooleanAttribute(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    VALUE_FIELD_NUMBER: builtins.int
    id: builtins.str
    value: builtins.bool
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        value: builtins.bool = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "value", b"value"]) -> None: ...

global___BooleanAttribute = BooleanAttribute

class DateAttribute(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    VALUE_FIELD_NUMBER: builtins.int
    id: builtins.str
    value: builtins.int
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        value: builtins.int = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "value", b"value"]) -> None: ...

global___DateAttribute = DateAttribute

class DateTimeAttribute(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    VALUE_FIELD_NUMBER: builtins.int
    id: builtins.str
    value: builtins.int
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        value: builtins.int = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "value", b"value"]) -> None: ...

global___DateTimeAttribute = DateTimeAttribute

class StringAttribute(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    VALUE_FIELD_NUMBER: builtins.int
    id: builtins.str
    value: builtins.str
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        value: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "value", b"value"]) -> None: ...

global___StringAttribute = StringAttribute

class NumberAttribute(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    VALUE_FIELD_NUMBER: builtins.int
    id: builtins.str
    value: builtins.int
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        value: builtins.int = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "value", b"value"]) -> None: ...

global___NumberAttribute = NumberAttribute

class Schema(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    JSON_LD_FIELD_NUMBER: builtins.int
    id: builtins.str
    json_ld: builtins.str
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        json_ld: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "json_ld", b"json_ld"]) -> None: ...

global___Schema = Schema

class CredentialOffer(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    THID_FIELD_NUMBER: builtins.int
    BODY_FIELD_NUMBER: builtins.int
    _FROM_FIELD_NUMBER: builtins.int
    _TO_FIELD_NUMBER: builtins.int
    thid: builtins.str
    @property
    def body(self) -> global___CredentialOfferBody: ...
    _from: builtins.str
    _to: builtins.str
    def __init__(
        self,
        *,
        thid: builtins.str = ...,
        body: global___CredentialOfferBody | None = ...,
        _from: builtins.str = ...,
        _to: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["body", b"body"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_from", b"_from", "_to", b"_to", "body", b"body", "thid", b"thid"]) -> None: ...

global___CredentialOffer = CredentialOffer

class CredentialOfferBody(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    URL_FIELD_NUMBER: builtins.int
    CREDENTIALS_FIELD_NUMBER: builtins.int
    url: builtins.str
    @property
    def credentials(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[global___CredentialOfferBodyCredentials]: ...
    def __init__(
        self,
        *,
        url: builtins.str = ...,
        credentials: collections.abc.Iterable[global___CredentialOfferBodyCredentials] | None = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["credentials", b"credentials", "url", b"url"]) -> None: ...

global___CredentialOfferBody = CredentialOfferBody

class CredentialOfferBodyCredentials(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    id: builtins.str
    description: builtins.str
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        description: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["description", b"description", "id", b"id"]) -> None: ...

global___CredentialOfferBodyCredentials = CredentialOfferBodyCredentials

class CredentialReceipt(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    ANCHOR_ID_FIELD_NUMBER: builtins.int
    id: builtins.str
    anchor_id: builtins.int
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        anchor_id: builtins.int = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["anchor_id", b"anchor_id", "id", b"id"]) -> None: ...

global___CredentialReceipt = CredentialReceipt

class Credential(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONTEXT_FIELD_NUMBER: builtins.int
    ID_FIELD_NUMBER: builtins.int
    TYPE_FIELD_NUMBER: builtins.int
    ISSUANCE_DATE_FIELD_NUMBER: builtins.int
    CREDENTIAL_SUBJECT_FIELD_NUMBER: builtins.int
    CREDENTIAL_STATUS_FIELD_NUMBER: builtins.int
    ISSUER_FIELD_NUMBER: builtins.int
    CREDENTIAL_SCHEMA_FIELD_NUMBER: builtins.int
    PROOF_FIELD_NUMBER: builtins.int
    @property
    def context(self) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[builtins.str]: ...
    id: builtins.str
    @property
    def type(self) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[builtins.str]: ...
    issuance_date: builtins.str
    credential_subject: builtins.str
    @property
    def credential_status(self) -> global___CredentialStatus: ...
    issuer: builtins.str
    @property
    def credential_schema(self) -> global___CredentialSchema: ...
    @property
    def proof(self) -> global___CredentialProof: ...
    def __init__(
        self,
        *,
        context: collections.abc.Iterable[builtins.str] | None = ...,
        id: builtins.str = ...,
        type: collections.abc.Iterable[builtins.str] | None = ...,
        issuance_date: builtins.str = ...,
        credential_subject: builtins.str = ...,
        credential_status: global___CredentialStatus | None = ...,
        issuer: builtins.str = ...,
        credential_schema: global___CredentialSchema | None = ...,
        proof: global___CredentialProof | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["credential_schema", b"credential_schema", "credential_status", b"credential_status", "proof", b"proof"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["context", b"context", "credential_schema", b"credential_schema", "credential_status", b"credential_status", "credential_subject", b"credential_subject", "id", b"id", "issuance_date", b"issuance_date", "issuer", b"issuer", "proof", b"proof", "type", b"type"]) -> None: ...

global___Credential = Credential

class CredentialStatus(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    REVOCATION_NONCE_FIELD_NUMBER: builtins.int
    TYPE_FIELD_NUMBER: builtins.int
    id: builtins.str
    revocation_nonce: builtins.int
    type: builtins.str
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        revocation_nonce: builtins.int = ...,
        type: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "revocation_nonce", b"revocation_nonce", "type", b"type"]) -> None: ...

global___CredentialStatus = CredentialStatus

class CredentialSchema(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    TYPE_FIELD_NUMBER: builtins.int
    id: builtins.str
    type: builtins.str
    def __init__(
        self,
        *,
        id: builtins.str = ...,
        type: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "type", b"type"]) -> None: ...

global___CredentialSchema = CredentialSchema

class CredentialProof(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    BLOOCK_PROOF_FIELD_NUMBER: builtins.int
    SIGNATURE_PROOF_FIELD_NUMBER: builtins.int
    @property
    def bloock_proof(self) -> integrity_entities_pb2.Proof: ...
    @property
    def signature_proof(self) -> global___SignatureJWS: ...
    def __init__(
        self,
        *,
        bloock_proof: integrity_entities_pb2.Proof | None = ...,
        signature_proof: global___SignatureJWS | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["bloock_proof", b"bloock_proof", "signature_proof", b"signature_proof"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["bloock_proof", b"bloock_proof", "signature_proof", b"signature_proof"]) -> None: ...

global___CredentialProof = CredentialProof

class CredentialVerification(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TIMESTAMP_FIELD_NUMBER: builtins.int
    ISSUER_FIELD_NUMBER: builtins.int
    REVOCATION_FIELD_NUMBER: builtins.int
    timestamp: builtins.int
    issuer: builtins.str
    revocation: builtins.int
    def __init__(
        self,
        *,
        timestamp: builtins.int = ...,
        issuer: builtins.str = ...,
        revocation: builtins.int = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["issuer", b"issuer", "revocation", b"revocation", "timestamp", b"timestamp"]) -> None: ...

global___CredentialVerification = CredentialVerification

class CredentialRevocation(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    SUCCESS_FIELD_NUMBER: builtins.int
    success: builtins.bool
    def __init__(
        self,
        *,
        success: builtins.bool = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["success", b"success"]) -> None: ...

global___CredentialRevocation = CredentialRevocation

class SignatureJWS(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    SIGNATURE_FIELD_NUMBER: builtins.int
    PROTECTED_FIELD_NUMBER: builtins.int
    HEADER_FIELD_NUMBER: builtins.int
    MESSAGE_HASH_FIELD_NUMBER: builtins.int
    signature: builtins.str
    protected: builtins.str
    @property
    def header(self) -> global___SignatureHeaderJWS: ...
    message_hash: builtins.str
    def __init__(
        self,
        *,
        signature: builtins.str = ...,
        protected: builtins.str = ...,
        header: global___SignatureHeaderJWS | None = ...,
        message_hash: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["header", b"header"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["header", b"header", "message_hash", b"message_hash", "protected", b"protected", "signature", b"signature"]) -> None: ...

global___SignatureJWS = SignatureJWS

class SignatureHeaderJWS(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ALG_FIELD_NUMBER: builtins.int
    KID_FIELD_NUMBER: builtins.int
    SUBJECT_FIELD_NUMBER: builtins.int
    alg: builtins.str
    kid: builtins.str
    subject: builtins.str
    def __init__(
        self,
        *,
        alg: builtins.str = ...,
        kid: builtins.str = ...,
        subject: builtins.str | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_subject", b"_subject", "subject", b"subject"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_subject", b"_subject", "alg", b"alg", "kid", b"kid", "subject", b"subject"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_subject", b"_subject"]) -> typing_extensions.Literal["subject"] | None: ...

global___SignatureHeaderJWS = SignatureHeaderJWS
