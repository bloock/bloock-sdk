import bloock._bridge.proto.identity_entities_pb2 as proto
from bloock.entity.identity.method import Method
from bloock.entity.identity.blockchain import Blockchain
from bloock.entity.identity.network import Network


class DidType:
    """
    Represents parameters used for generating DIDs.
    """
    def __init__(self, method: Method, blockchain: Blockchain, network: Network) -> None:
        """
        Constructs a DidType object with the specified parameters.
        :type network: object
        :type blockchain: object
        :type method: object
        :rtype: object
        """
        self.method = method
        self.blockchain = blockchain
        self.network = network

    def to_proto(self) -> proto.DidType:
        return proto.DidType(
            method=Method.to_proto(self.method),
            blockchain=Blockchain.to_proto(self.blockchain),
            network_id=Network.to_proto(self.network)
        )
