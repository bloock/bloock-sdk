import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.method import Method
from bloock.entity.identity_v2.blockchain import Blockchain
from bloock.entity.identity_v2.network import Network


class IssuerParams:

    def __init__(self, method: Method, blockchain: Blockchain, network: Network) -> None:
        self.method = method,
        self.blockchain = blockchain
        self.network = network

    def to_proto(self) -> proto.IssuerParams:
        return proto.IssuerParams(
            method=self.method.to_proto()
            blockchain=self.blockchain.to_proto()
            network_id=self.network.to_proto()
        )