"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import collections.abc
import config_pb2
import google.protobuf.descriptor
import google.protobuf.internal.containers
import google.protobuf.internal.enum_type_wrapper
import google.protobuf.message
import proof_pb2
import shared_pb2
import sys
import typing

if sys.version_info >= (3, 10):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class _RecordTypes:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _RecordTypesEnumTypeWrapper(
    google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_RecordTypes.ValueType],
    builtins.type,
):  # noqa: F821
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    STRING: _RecordTypes.ValueType  # 0
    HEX: _RecordTypes.ValueType  # 1
    JSON: _RecordTypes.ValueType  # 2
    BYTES: _RecordTypes.ValueType  # 3
    FILE: _RecordTypes.ValueType  # 4
    RECORD: _RecordTypes.ValueType  # 5
    RAW: _RecordTypes.ValueType  # 6

class RecordTypes(_RecordTypes, metaclass=_RecordTypesEnumTypeWrapper): ...

STRING: RecordTypes.ValueType  # 0
HEX: RecordTypes.ValueType  # 1
JSON: RecordTypes.ValueType  # 2
BYTES: RecordTypes.ValueType  # 3
FILE: RecordTypes.ValueType  # 4
RECORD: RecordTypes.ValueType  # 5
RAW: RecordTypes.ValueType  # 6
global___RecordTypes = RecordTypes

class _SignerAlg:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _SignerAlgEnumTypeWrapper(
    google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_SignerAlg.ValueType],
    builtins.type,
):  # noqa: F821
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    ES256K: _SignerAlg.ValueType  # 0

class SignerAlg(_SignerAlg, metaclass=_SignerAlgEnumTypeWrapper): ...

ES256K: SignerAlg.ValueType  # 0
global___SignerAlg = SignerAlg

class _EncrypterAlg:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _EncrypterAlgEnumTypeWrapper(
    google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[
        _EncrypterAlg.ValueType
    ],
    builtins.type,
):  # noqa: F821
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    A256GCM: _EncrypterAlg.ValueType  # 0

class EncrypterAlg(_EncrypterAlg, metaclass=_EncrypterAlgEnumTypeWrapper): ...

A256GCM: EncrypterAlg.ValueType  # 0
global___EncrypterAlg = EncrypterAlg

class GenerateKeysRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    def __init__(
        self,
    ) -> None: ...

global___GenerateKeysRequest = GenerateKeysRequest

class GenerateKeysResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PRIVATEKEY_FIELD_NUMBER: builtins.int
    PUBLICKEY_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    privateKey: builtins.str
    publicKey: builtins.str
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        privateKey: builtins.str = ...,
        publicKey: builtins.str = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error",
            b"_error",
            "error",
            b"error",
            "privateKey",
            b"privateKey",
            "publicKey",
            b"publicKey",
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___GenerateKeysResponse = GenerateKeysResponse

class RecordHash(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    HASH_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    hash: builtins.str
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        hash: builtins.str = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "hash", b"hash"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___RecordHash = RecordHash

class RecordHeader(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TY_FIELD_NUMBER: builtins.int
    ty: builtins.str
    def __init__(
        self,
        *,
        ty: builtins.str = ...,
    ) -> None: ...
    def ClearField(
        self, field_name: typing_extensions.Literal["ty", b"ty"]
    ) -> None: ...

global___RecordHeader = RecordHeader

class Record(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    HEADERS_FIELD_NUMBER: builtins.int
    PAYLOAD_FIELD_NUMBER: builtins.int
    SIGNATURES_FIELD_NUMBER: builtins.int
    ENCRYPTION_FIELD_NUMBER: builtins.int
    PROOF_FIELD_NUMBER: builtins.int
    @property
    def headers(self) -> global___RecordHeader: ...
    payload: builtins.bytes
    @property
    def signatures(
        self,
    ) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[
        global___Signature
    ]: ...
    @property
    def encryption(self) -> global___Encryption: ...
    @property
    def proof(self) -> proof_pb2.Proof: ...
    def __init__(
        self,
        *,
        headers: global___RecordHeader | None = ...,
        payload: builtins.bytes = ...,
        signatures: collections.abc.Iterable[global___Signature] | None = ...,
        encryption: global___Encryption | None = ...,
        proof: proof_pb2.Proof | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_encryption",
            b"_encryption",
            "_proof",
            b"_proof",
            "encryption",
            b"encryption",
            "headers",
            b"headers",
            "proof",
            b"proof",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_encryption",
            b"_encryption",
            "_proof",
            b"_proof",
            "encryption",
            b"encryption",
            "headers",
            b"headers",
            "payload",
            b"payload",
            "proof",
            b"proof",
            "signatures",
            b"signatures",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_encryption", b"_encryption"]
    ) -> typing_extensions.Literal["encryption"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_proof", b"_proof"]
    ) -> typing_extensions.Literal["proof"] | None: ...

global___Record = Record

class Signer(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ALG_FIELD_NUMBER: builtins.int
    ARGS_FIELD_NUMBER: builtins.int
    alg: global___SignerAlg.ValueType
    @property
    def args(self) -> global___SignerArgs: ...
    def __init__(
        self,
        *,
        alg: global___SignerAlg.ValueType = ...,
        args: global___SignerArgs | None = ...,
    ) -> None: ...
    def HasField(
        self, field_name: typing_extensions.Literal["args", b"args"]
    ) -> builtins.bool: ...
    def ClearField(
        self, field_name: typing_extensions.Literal["alg", b"alg", "args", b"args"]
    ) -> None: ...

global___Signer = Signer

class SignerArgs(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PRIVATE_KEY_FIELD_NUMBER: builtins.int
    private_key: builtins.str
    def __init__(
        self,
        *,
        private_key: builtins.str | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_private_key", b"_private_key", "private_key", b"private_key"
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_private_key", b"_private_key", "private_key", b"private_key"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_private_key", b"_private_key"]
    ) -> typing_extensions.Literal["private_key"] | None: ...

global___SignerArgs = SignerArgs

class Encrypter(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ALG_FIELD_NUMBER: builtins.int
    ARGS_FIELD_NUMBER: builtins.int
    alg: global___EncrypterAlg.ValueType
    @property
    def args(self) -> global___EncrypterArgs: ...
    def __init__(
        self,
        *,
        alg: global___EncrypterAlg.ValueType = ...,
        args: global___EncrypterArgs | None = ...,
    ) -> None: ...
    def HasField(
        self, field_name: typing_extensions.Literal["args", b"args"]
    ) -> builtins.bool: ...
    def ClearField(
        self, field_name: typing_extensions.Literal["alg", b"alg", "args", b"args"]
    ) -> None: ...

global___Encrypter = Encrypter

class EncrypterArgs(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    SECRET_FIELD_NUMBER: builtins.int
    secret: builtins.str
    def __init__(
        self,
        *,
        secret: builtins.str | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_secret", b"_secret", "secret", b"secret"
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_secret", b"_secret", "secret", b"secret"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_secret", b"_secret"]
    ) -> typing_extensions.Literal["secret"] | None: ...

global___EncrypterArgs = EncrypterArgs

class Signature(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    SIGNATURE_FIELD_NUMBER: builtins.int
    PROTECTED_FIELD_NUMBER: builtins.int
    HEADER_FIELD_NUMBER: builtins.int
    signature: builtins.str
    protected: builtins.str
    @property
    def header(self) -> global___SignatureHeader: ...
    def __init__(
        self,
        *,
        signature: builtins.str = ...,
        protected: builtins.str = ...,
        header: global___SignatureHeader | None = ...,
    ) -> None: ...
    def HasField(
        self, field_name: typing_extensions.Literal["header", b"header"]
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "header", b"header", "protected", b"protected", "signature", b"signature"
        ],
    ) -> None: ...

global___Signature = Signature

class SignatureHeader(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ALG_FIELD_NUMBER: builtins.int
    KID_FIELD_NUMBER: builtins.int
    alg: builtins.str
    kid: builtins.str
    def __init__(
        self,
        *,
        alg: builtins.str = ...,
        kid: builtins.str = ...,
    ) -> None: ...
    def ClearField(
        self, field_name: typing_extensions.Literal["alg", b"alg", "kid", b"kid"]
    ) -> None: ...

global___SignatureHeader = SignatureHeader

class Encryption(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    HEADER_FIELD_NUMBER: builtins.int
    PROTECTED_FIELD_NUMBER: builtins.int
    @property
    def header(self) -> global___EncryptionHeader: ...
    protected: builtins.str
    def __init__(
        self,
        *,
        header: global___EncryptionHeader | None = ...,
        protected: builtins.str = ...,
    ) -> None: ...
    def HasField(
        self, field_name: typing_extensions.Literal["header", b"header"]
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "header", b"header", "protected", b"protected"
        ],
    ) -> None: ...

global___Encryption = Encryption

class EncryptionHeader(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ALG_FIELD_NUMBER: builtins.int
    alg: builtins.str
    def __init__(
        self,
        *,
        alg: builtins.str = ...,
    ) -> None: ...
    def ClearField(
        self, field_name: typing_extensions.Literal["alg", b"alg"]
    ) -> None: ...

global___EncryptionHeader = EncryptionHeader

class RecordReceipt(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ANCHOR_FIELD_NUMBER: builtins.int
    CLIENT_FIELD_NUMBER: builtins.int
    RECORD_FIELD_NUMBER: builtins.int
    STATUS_FIELD_NUMBER: builtins.int
    anchor: builtins.int
    client: builtins.str
    record: builtins.str
    status: builtins.str
    def __init__(
        self,
        *,
        anchor: builtins.int = ...,
        client: builtins.str = ...,
        record: builtins.str = ...,
        status: builtins.str = ...,
    ) -> None: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "anchor",
            b"anchor",
            "client",
            b"client",
            "record",
            b"record",
            "status",
            b"status",
        ],
    ) -> None: ...

global___RecordReceipt = RecordReceipt

class RecordBuilderFromStringRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PAYLOAD_FIELD_NUMBER: builtins.int
    SIGNER_FIELD_NUMBER: builtins.int
    ENCRYPTER_FIELD_NUMBER: builtins.int
    payload: builtins.str
    @property
    def signer(self) -> global___Signer: ...
    @property
    def encrypter(self) -> global___Encrypter: ...
    def __init__(
        self,
        *,
        payload: builtins.str = ...,
        signer: global___Signer | None = ...,
        encrypter: global___Encrypter | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "signer",
            b"signer",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "payload",
            b"payload",
            "signer",
            b"signer",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_encrypter", b"_encrypter"]
    ) -> typing_extensions.Literal["encrypter"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_signer", b"_signer"]
    ) -> typing_extensions.Literal["signer"] | None: ...

global___RecordBuilderFromStringRequest = RecordBuilderFromStringRequest

class RecordBuilderFromHexRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PAYLOAD_FIELD_NUMBER: builtins.int
    SIGNER_FIELD_NUMBER: builtins.int
    ENCRYPTER_FIELD_NUMBER: builtins.int
    payload: builtins.str
    @property
    def signer(self) -> global___Signer: ...
    @property
    def encrypter(self) -> global___Encrypter: ...
    def __init__(
        self,
        *,
        payload: builtins.str = ...,
        signer: global___Signer | None = ...,
        encrypter: global___Encrypter | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "signer",
            b"signer",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "payload",
            b"payload",
            "signer",
            b"signer",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_encrypter", b"_encrypter"]
    ) -> typing_extensions.Literal["encrypter"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_signer", b"_signer"]
    ) -> typing_extensions.Literal["signer"] | None: ...

global___RecordBuilderFromHexRequest = RecordBuilderFromHexRequest

class RecordBuilderFromJSONRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PAYLOAD_FIELD_NUMBER: builtins.int
    SIGNER_FIELD_NUMBER: builtins.int
    ENCRYPTER_FIELD_NUMBER: builtins.int
    payload: builtins.str
    @property
    def signer(self) -> global___Signer: ...
    @property
    def encrypter(self) -> global___Encrypter: ...
    def __init__(
        self,
        *,
        payload: builtins.str = ...,
        signer: global___Signer | None = ...,
        encrypter: global___Encrypter | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "signer",
            b"signer",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "payload",
            b"payload",
            "signer",
            b"signer",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_encrypter", b"_encrypter"]
    ) -> typing_extensions.Literal["encrypter"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_signer", b"_signer"]
    ) -> typing_extensions.Literal["signer"] | None: ...

global___RecordBuilderFromJSONRequest = RecordBuilderFromJSONRequest

class RecordBuilderFromBytesRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PAYLOAD_FIELD_NUMBER: builtins.int
    SIGNER_FIELD_NUMBER: builtins.int
    ENCRYPTER_FIELD_NUMBER: builtins.int
    payload: builtins.bytes
    @property
    def signer(self) -> global___Signer: ...
    @property
    def encrypter(self) -> global___Encrypter: ...
    def __init__(
        self,
        *,
        payload: builtins.bytes = ...,
        signer: global___Signer | None = ...,
        encrypter: global___Encrypter | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "signer",
            b"signer",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "payload",
            b"payload",
            "signer",
            b"signer",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_encrypter", b"_encrypter"]
    ) -> typing_extensions.Literal["encrypter"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_signer", b"_signer"]
    ) -> typing_extensions.Literal["signer"] | None: ...

global___RecordBuilderFromBytesRequest = RecordBuilderFromBytesRequest

class RecordBuilderFromFileRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PAYLOAD_FIELD_NUMBER: builtins.int
    SIGNER_FIELD_NUMBER: builtins.int
    ENCRYPTER_FIELD_NUMBER: builtins.int
    payload: builtins.bytes
    @property
    def signer(self) -> global___Signer: ...
    @property
    def encrypter(self) -> global___Encrypter: ...
    def __init__(
        self,
        *,
        payload: builtins.bytes = ...,
        signer: global___Signer | None = ...,
        encrypter: global___Encrypter | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "signer",
            b"signer",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "payload",
            b"payload",
            "signer",
            b"signer",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_encrypter", b"_encrypter"]
    ) -> typing_extensions.Literal["encrypter"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_signer", b"_signer"]
    ) -> typing_extensions.Literal["signer"] | None: ...

global___RecordBuilderFromFileRequest = RecordBuilderFromFileRequest

class RecordBuilderFromRecordRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PAYLOAD_FIELD_NUMBER: builtins.int
    SIGNER_FIELD_NUMBER: builtins.int
    ENCRYPTER_FIELD_NUMBER: builtins.int
    @property
    def payload(self) -> global___Record: ...
    @property
    def signer(self) -> global___Signer: ...
    @property
    def encrypter(self) -> global___Encrypter: ...
    def __init__(
        self,
        *,
        payload: global___Record | None = ...,
        signer: global___Signer | None = ...,
        encrypter: global___Encrypter | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "payload",
            b"payload",
            "signer",
            b"signer",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "payload",
            b"payload",
            "signer",
            b"signer",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_encrypter", b"_encrypter"]
    ) -> typing_extensions.Literal["encrypter"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_signer", b"_signer"]
    ) -> typing_extensions.Literal["signer"] | None: ...

global___RecordBuilderFromRecordRequest = RecordBuilderFromRecordRequest

class RecordBuilderFromRawRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PAYLOAD_FIELD_NUMBER: builtins.int
    SIGNER_FIELD_NUMBER: builtins.int
    ENCRYPTER_FIELD_NUMBER: builtins.int
    payload: builtins.str
    @property
    def signer(self) -> global___Signer: ...
    @property
    def encrypter(self) -> global___Encrypter: ...
    def __init__(
        self,
        *,
        payload: builtins.str = ...,
        signer: global___Signer | None = ...,
        encrypter: global___Encrypter | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "signer",
            b"signer",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_encrypter",
            b"_encrypter",
            "_signer",
            b"_signer",
            "encrypter",
            b"encrypter",
            "payload",
            b"payload",
            "signer",
            b"signer",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_encrypter", b"_encrypter"]
    ) -> typing_extensions.Literal["encrypter"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_signer", b"_signer"]
    ) -> typing_extensions.Literal["signer"] | None: ...

global___RecordBuilderFromRawRequest = RecordBuilderFromRawRequest

class RecordBuilderResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    RECORD_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def record(self) -> global___Record: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        record: global___Record | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "record", b"record"
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "record", b"record"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___RecordBuilderResponse = RecordBuilderResponse

class SendRecordsRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    RECORDS_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def records(
        self,
    ) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[
        builtins.str
    ]: ...
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        records: collections.abc.Iterable[builtins.str] | None = ...,
    ) -> None: ...
    def HasField(
        self, field_name: typing_extensions.Literal["config_data", b"config_data"]
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "config_data", b"config_data", "records", b"records"
        ],
    ) -> None: ...

global___SendRecordsRequest = SendRecordsRequest

class SendRecordsResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    RECORDS_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def records(
        self,
    ) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[
        global___RecordReceipt
    ]: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        records: collections.abc.Iterable[global___RecordReceipt] | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "records", b"records"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___SendRecordsResponse = SendRecordsResponse
