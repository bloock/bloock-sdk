from enum import Enum
from bloock._bridge.proto.config_pb2 import Network as NetworkProto


class Network(Enum):
    ETHEREUM_MAINNET = 0
    ETHEREUM_RINKEBY = 1
    ETHEREUM_GOERLI = 2
    GNOSIS_CHAIN = 3
    BLOOCK_CHAIN = 4

    @classmethod
    def from_proto(cls, network: NetworkProto):
        return cls(network)

    def __int__(self):
        return self.value
