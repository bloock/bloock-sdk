from __future__ import annotations
from warnings import warn

from enum import Enum

from bloock._bridge.proto.bloock_config_pb2 import Network as NetworkProto


class Network(Enum):
    """
    Represents a network.
    """
    ETHEREUM_MAINNET = 0
    ETHEREUM_SEPOLIA = 1
    GNOSIS_CHAIN = 2
    POLYGON_CHAIN = 3

    def __int__(self):
        return self.value

    @staticmethod
    def to_proto(network: Network) -> NetworkProto.ValueType:
        if network == Network.ETHEREUM_MAINNET:
            return NetworkProto.ETHEREUM_MAINNET
        elif network == Network.ETHEREUM_SEPOLIA:
            return NetworkProto.ETHEREUM_SEPOLIA
        elif network == Network.GNOSIS_CHAIN:
            return NetworkProto.GNOSIS_CHAIN
        elif network == Network.POLYGON_CHAIN:
            return NetworkProto.POLYGON_CHAIN
