"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import collections.abc
import google.protobuf.descriptor
import google.protobuf.internal.containers
import google.protobuf.internal.enum_type_wrapper
import google.protobuf.message
import sys
import typing

if sys.version_info >= (3, 10):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class _Network:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _NetworkEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_Network.ValueType], builtins.type):  # noqa: F821
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    ETHEREUM_MAINNET: _Network.ValueType  # 0
    ETHEREUM_RINKEBY: _Network.ValueType  # 1
    BLOOCK_CHAIN: _Network.ValueType  # 2

class Network(_Network, metaclass=_NetworkEnumTypeWrapper): ...

ETHEREUM_MAINNET: Network.ValueType  # 0
ETHEREUM_RINKEBY: Network.ValueType  # 1
BLOOCK_CHAIN: Network.ValueType  # 2
global___Network = Network

class ConfigData(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    class NetworksConfigEntry(google.protobuf.message.Message):
        DESCRIPTOR: google.protobuf.descriptor.Descriptor

        KEY_FIELD_NUMBER: builtins.int
        VALUE_FIELD_NUMBER: builtins.int
        key: builtins.int
        @property
        def value(self) -> global___NetworkConfig: ...
        def __init__(
            self,
            *,
            key: builtins.int = ...,
            value: global___NetworkConfig | None = ...,
        ) -> None: ...
        def HasField(self, field_name: typing_extensions.Literal["value", b"value"]) -> builtins.bool: ...
        def ClearField(self, field_name: typing_extensions.Literal["key", b"key", "value", b"value"]) -> None: ...

    CONFIG_FIELD_NUMBER: builtins.int
    NETWORKS_CONFIG_FIELD_NUMBER: builtins.int
    @property
    def config(self) -> global___Configuration: ...
    @property
    def networks_config(self) -> google.protobuf.internal.containers.MessageMap[builtins.int, global___NetworkConfig]: ...
    def __init__(
        self,
        *,
        config: global___Configuration | None = ...,
        networks_config: collections.abc.Mapping[builtins.int, global___NetworkConfig] | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["config", b"config"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["config", b"config", "networks_config", b"networks_config"]) -> None: ...

global___ConfigData = ConfigData

class Configuration(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    HOST_FIELD_NUMBER: builtins.int
    API_KEY_FIELD_NUMBER: builtins.int
    WAIT_MESSAGE_INTERVAL_FACTOR_FIELD_NUMBER: builtins.int
    WAIT_MESSAGE_INTERVAL_DEFAULT_FIELD_NUMBER: builtins.int
    KEY_TYPE_ALGORITHM_FIELD_NUMBER: builtins.int
    ELLIPTIC_CURVE_KEY_FIELD_NUMBER: builtins.int
    SIGNATURE_ALGORITHM_FIELD_NUMBER: builtins.int
    host: builtins.str
    api_key: builtins.str
    wait_message_interval_factor: builtins.int
    wait_message_interval_default: builtins.int
    key_type_algorithm: builtins.str
    elliptic_curve_key: builtins.str
    signature_algorithm: builtins.str
    def __init__(
        self,
        *,
        host: builtins.str = ...,
        api_key: builtins.str = ...,
        wait_message_interval_factor: builtins.int = ...,
        wait_message_interval_default: builtins.int = ...,
        key_type_algorithm: builtins.str = ...,
        elliptic_curve_key: builtins.str = ...,
        signature_algorithm: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["api_key", b"api_key", "elliptic_curve_key", b"elliptic_curve_key", "host", b"host", "key_type_algorithm", b"key_type_algorithm", "signature_algorithm", b"signature_algorithm", "wait_message_interval_default", b"wait_message_interval_default", "wait_message_interval_factor", b"wait_message_interval_factor"]) -> None: ...

global___Configuration = Configuration

class NetworkConfig(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    CONTRACTADDRESS_FIELD_NUMBER: builtins.int
    CONTRACTABI_FIELD_NUMBER: builtins.int
    HTTPPROVIDER_FIELD_NUMBER: builtins.int
    ContractAddress: builtins.str
    ContractAbi: builtins.str
    HttpProvider: builtins.str
    def __init__(
        self,
        *,
        ContractAddress: builtins.str = ...,
        ContractAbi: builtins.str = ...,
        HttpProvider: builtins.str = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["ContractAbi", b"ContractAbi", "ContractAddress", b"ContractAddress", "HttpProvider", b"HttpProvider"]) -> None: ...

global___NetworkConfig = NetworkConfig
