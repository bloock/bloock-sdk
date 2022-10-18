from __future__ import annotations
from enum import Enum
from bloock._bridge.proto.config_pb2 import Network as NetworkProto


class Network(Enum):
    ETHEREUM_MAINNET = 0
    ETHEREUM_RINKEBY = 1
    ETHEREUM_GOERLI = 2
    GNOSIS_CHAIN = 3
    BLOOCK_CHAIN = 4

    def __int__(self):
        return self.value

    @staticmethod
    def to_proto(network: Network) -> NetworkProto.ValueType:
        if network == Network.ETHEREUM_MAINNET:
            return NetworkProto.ETHEREUM_MAINNET
        elif network == Network.ETHEREUM_RINKEBY:
            return NetworkProto.ETHEREUM_RINKEBY
        elif network == Network.ETHEREUM_GOERLI:
            return NetworkProto.ETHEREUM_GOERLI
        elif network == Network.GNOSIS_CHAIN:
            return NetworkProto.GNOSIS_CHAIN
        elif network == Network.BLOOCK_CHAIN:
            return NetworkProto.BLOOCK_CHAIN
