import bloock._bridge.proto.bloock_availability_entities_pb2 as proto
from bloock.entity.availability.loader import Loader
from bloock.entity.availability.loader_args import LoaderArgs


class IpnsLoader(Loader):
    """
    Represents a loader for IPNS data availability.
    """
    def __init__(self, hash: str) -> None:
        """
        Constructs a IpnsLoader object with the specified parameters.
        :type hash: object
        :rtype: object
        """
        super().__init__(type=proto.IPNS, args=LoaderArgs(hash))

    def to_proto(self) -> proto.Loader:
        return proto.Loader(type=self.type, args=self.args.to_proto())