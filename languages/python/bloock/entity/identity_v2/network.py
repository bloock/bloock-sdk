from __future__ import annotations

from enum import Enum
from bloock._bridge.proto.identity_entities_v2_pb2 import NetworkId as NetworkProto


class Network(Enum):
    MAIN = 0
    MUMBAI = 1
    GOERLI = 2
    NO_NETWORK = 3
    UNKNOWN_NETWORK = 4

    def __int__(self):
        return self.value

    @staticmethod
    def to_proto(network: Network) -> NetworkProto.ValueType:
        if network == Network.MAIN:
            return NetworkProto.MAIN
        elif network == Network.MUMBAI:
            return NetworkProto.MUMBAI
        elif network == Network.GOERLI:
            return NetworkProto.GOERLI
        elif network == Network.NO_NETWORK:
            return NetworkProto.NO_NETWORK
        elif network == Network.UNKNOWN_NETWORK:
            return NetworkProto.UNKNOWN_NETWORK
