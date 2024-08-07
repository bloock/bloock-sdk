"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
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
class Anchor(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ID_FIELD_NUMBER: builtins.int
    BLOCK_ROOTS_FIELD_NUMBER: builtins.int
    NETWORKS_FIELD_NUMBER: builtins.int
    ROOT_FIELD_NUMBER: builtins.int
    STATUS_FIELD_NUMBER: builtins.int
    id: builtins.int
    @property
    def block_roots(self) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[builtins.str]: ...
    @property
    def networks(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[global___AnchorNetwork]: ...
    root: builtins.str
    status: builtins.str
    def __init__(
        self,
        *,
        id: builtins.int = ...,
        block_roots: collections.abc.Iterable[builtins.str] | None = ...,
        networks: collections.abc.Iterable[global___AnchorNetwork] | None = ...,
        root: builtins.str = ...,
        status: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["block_roots", b"block_roots", "id", b"id", "networks", b"networks", "root", b"root", "status", b"status"]) -> None: ...

global___Anchor = Anchor

@typing_extensions.final
class AnchorNetwork(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    NAME_FIELD_NUMBER: builtins.int
    STATE_FIELD_NUMBER: builtins.int
    TX_HASH_FIELD_NUMBER: builtins.int
    ROOT_FIELD_NUMBER: builtins.int
    name: builtins.str
    state: builtins.str
    tx_hash: builtins.str
    root: builtins.str
    def __init__(
        self,
        *,
        name: builtins.str = ...,
        state: builtins.str = ...,
        tx_hash: builtins.str = ...,
        root: builtins.str | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["_root", b"_root", "root", b"root"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["_root", b"_root", "name", b"name", "root", b"root", "state", b"state", "tx_hash", b"tx_hash"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["_root", b"_root"]) -> typing_extensions.Literal["root"] | None: ...

global___AnchorNetwork = AnchorNetwork

@typing_extensions.final
class Proof(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    LEAVES_FIELD_NUMBER: builtins.int
    NODES_FIELD_NUMBER: builtins.int
    DEPTH_FIELD_NUMBER: builtins.int
    BITMAP_FIELD_NUMBER: builtins.int
    ANCHOR_FIELD_NUMBER: builtins.int
    @property
    def leaves(self) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[builtins.str]: ...
    @property
    def nodes(self) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[builtins.str]: ...
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
    def HasField(self, field_name: typing_extensions.Literal["anchor", b"anchor"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["anchor", b"anchor", "bitmap", b"bitmap", "depth", b"depth", "leaves", b"leaves", "nodes", b"nodes"]) -> None: ...

global___Proof = Proof

@typing_extensions.final
class ProofAnchor(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    ANCHOR_ID_FIELD_NUMBER: builtins.int
    NETWORKS_FIELD_NUMBER: builtins.int
    ROOT_FIELD_NUMBER: builtins.int
    STATUS_FIELD_NUMBER: builtins.int
    anchor_id: builtins.int
    @property
    def networks(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[global___AnchorNetwork]: ...
    root: builtins.str
    status: builtins.str
    def __init__(
        self,
        *,
        anchor_id: builtins.int = ...,
        networks: collections.abc.Iterable[global___AnchorNetwork] | None = ...,
        root: builtins.str = ...,
        status: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["anchor_id", b"anchor_id", "networks", b"networks", "root", b"root", "status", b"status"]) -> None: ...

global___ProofAnchor = ProofAnchor

@typing_extensions.final
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
    def ClearField(self, field_name: typing_extensions.Literal["anchor", b"anchor", "client", b"client", "record", b"record", "status", b"status"]) -> None: ...

global___RecordReceipt = RecordReceipt
