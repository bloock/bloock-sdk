"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import anchor_pb2
import builtins
import collections.abc
import config_pb2
import google.protobuf.descriptor
import google.protobuf.internal.containers
import google.protobuf.message
import shared_pb2
import sys
import typing

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class Proof(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    LEAVES_FIELD_NUMBER: builtins.int
    NODES_FIELD_NUMBER: builtins.int
    DEPTH_FIELD_NUMBER: builtins.int
    BITMAP_FIELD_NUMBER: builtins.int
    ANCHOR_FIELD_NUMBER: builtins.int
    @property
    def leaves(
        self,
    ) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[
        builtins.str
    ]: ...
    @property
    def nodes(
        self,
    ) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[
        builtins.str
    ]: ...
    depth: builtins.str
    bitmap: builtins.str
    @property
    def anchor(self) -> global___ProofAnchor: ...
    def __init__(
        self,
        *,
        leaves: collections.abc.Iterable[builtins.str] | None = ...,
        nodes: collections.abc.Iterable[builtins.str] | None = ...,
        depth: builtins.str = ...,
        bitmap: builtins.str = ...,
        anchor: global___ProofAnchor | None = ...,
    ) -> None: ...
    def HasField(
        self, field_name: typing_extensions.Literal["anchor", b"anchor"]
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "anchor",
            b"anchor",
            "bitmap",
            b"bitmap",
            "depth",
            b"depth",
            "leaves",
            b"leaves",
            "nodes",
            b"nodes",
        ],
    ) -> None: ...

global___Proof = Proof

class ProofAnchor(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ANCHOR_ID_FIELD_NUMBER: builtins.int
    NETWORKS_FIELD_NUMBER: builtins.int
    ROOT_FIELD_NUMBER: builtins.int
    STATUS_FIELD_NUMBER: builtins.int
    anchor_id: builtins.int
    @property
    def networks(
        self,
    ) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[
        anchor_pb2.AnchorNetwork
    ]: ...
    root: builtins.str
    status: builtins.str
    def __init__(
        self,
        *,
        anchor_id: builtins.int = ...,
        networks: collections.abc.Iterable[anchor_pb2.AnchorNetwork] | None = ...,
        root: builtins.str = ...,
        status: builtins.str = ...,
    ) -> None: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "anchor_id",
            b"anchor_id",
            "networks",
            b"networks",
            "root",
            b"root",
            "status",
            b"status",
        ],
    ) -> None: ...

global___ProofAnchor = ProofAnchor

class GetProofRequest(google.protobuf.message.Message):
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

global___GetProofRequest = GetProofRequest

class GetProofResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PROOF_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    @property
    def proof(self) -> global___Proof: ...
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        proof: global___Proof | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "proof", b"proof"
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "proof", b"proof"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___GetProofResponse = GetProofResponse

class ValidateRootRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    ROOT_FIELD_NUMBER: builtins.int
    NETWORK_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    root: builtins.str
    network: config_pb2.Network.ValueType
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        root: builtins.str = ...,
        network: config_pb2.Network.ValueType = ...,
    ) -> None: ...
    def HasField(
        self, field_name: typing_extensions.Literal["config_data", b"config_data"]
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "config_data", b"config_data", "network", b"network", "root", b"root"
        ],
    ) -> None: ...

global___ValidateRootRequest = ValidateRootRequest

class ValidateRootResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TIMESTAMP_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    timestamp: builtins.int
    """TODO Should be u128"""
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        timestamp: builtins.int = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "timestamp", b"timestamp"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___ValidateRootResponse = ValidateRootResponse

class VerifyProofRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    PROOF_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def proof(self) -> global___Proof: ...
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        proof: global___Proof | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "config_data", b"config_data", "proof", b"proof"
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "config_data", b"config_data", "proof", b"proof"
        ],
    ) -> None: ...

global___VerifyProofRequest = VerifyProofRequest

class VerifyProofResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    RECORD_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    record: builtins.str
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        record: builtins.str | None = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_error",
            b"_error",
            "_record",
            b"_record",
            "error",
            b"error",
            "record",
            b"record",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error",
            b"_error",
            "_record",
            b"_record",
            "error",
            b"error",
            "record",
            b"record",
        ],
    ) -> None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...
    @typing.overload
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_record", b"_record"]
    ) -> typing_extensions.Literal["record"] | None: ...

global___VerifyProofResponse = VerifyProofResponse

class VerifyRecordsRequest(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONFIG_DATA_FIELD_NUMBER: builtins.int
    RECORDS_FIELD_NUMBER: builtins.int
    NETWORK_FIELD_NUMBER: builtins.int
    @property
    def config_data(self) -> config_pb2.ConfigData: ...
    @property
    def records(
        self,
    ) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[
        builtins.str
    ]: ...
    network: config_pb2.Network.ValueType
    def __init__(
        self,
        *,
        config_data: config_pb2.ConfigData | None = ...,
        records: collections.abc.Iterable[builtins.str] | None = ...,
        network: config_pb2.Network.ValueType | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal[
            "_network",
            b"_network",
            "config_data",
            b"config_data",
            "network",
            b"network",
        ],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_network",
            b"_network",
            "config_data",
            b"config_data",
            "network",
            b"network",
            "records",
            b"records",
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_network", b"_network"]
    ) -> typing_extensions.Literal["network"] | None: ...

global___VerifyRecordsRequest = VerifyRecordsRequest

class VerifyRecordsResponse(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TIMESTAMP_FIELD_NUMBER: builtins.int
    ERROR_FIELD_NUMBER: builtins.int
    timestamp: builtins.int
    """TODO Should be u128"""
    @property
    def error(self) -> shared_pb2.Error: ...
    def __init__(
        self,
        *,
        timestamp: builtins.int = ...,
        error: shared_pb2.Error | None = ...,
    ) -> None: ...
    def HasField(
        self,
        field_name: typing_extensions.Literal["_error", b"_error", "error", b"error"],
    ) -> builtins.bool: ...
    def ClearField(
        self,
        field_name: typing_extensions.Literal[
            "_error", b"_error", "error", b"error", "timestamp", b"timestamp"
        ],
    ) -> None: ...
    def WhichOneof(
        self, oneof_group: typing_extensions.Literal["_error", b"_error"]
    ) -> typing_extensions.Literal["error"] | None: ...

global___VerifyRecordsResponse = VerifyRecordsResponse
