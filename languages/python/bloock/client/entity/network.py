from enum import Enum
from bloock._bridge.proto.config_pb2 import Network as NetworkProto


class Network(Enum):
    ETHEREUM_MAINNET = 1
    ETHEREUM_RINKEBY = 2
    ETHEREUM_GOERLI = 3
    GNOSIS_CHAIN = 4
    BLOOCK_CHAIN = 5

    @classmethod
    def from_proto(cls, network: NetworkProto):
        return cls(network)

    def __int__(self):
        return self.value
