import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.method import Method
from bloock.entity.identity_v2.blockchain import Blockchain
from bloock.entity.identity_v2.network import Network


class DidParams:

    def __init__(self, method: Method, blockchain: Blockchain, network: Network) -> None:
        self.method = method
        self.blockchain = blockchain
        self.network = network

    def to_proto(self) -> proto.DidParams:
        return proto.DidParams(
            method=Method.to_proto(self.method),
            blockchain=Blockchain.to_proto(self.blockchain),
            network_id=Network.to_proto(self.network)
        )
