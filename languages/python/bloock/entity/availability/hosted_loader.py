import bloock._bridge.proto.availability_entities_pb2 as proto
from bloock.entity.availability.loader import Loader
from bloock.entity.availability.loader_args import LoaderArgs


class HostedLoader(Loader):
    def __init__(self, hash: str) -> None:
        super().__init__(type=proto.HOSTED, args=LoaderArgs(hash))

    def to_proto(self) -> proto.Loader:
        return proto.Loader(type=self.type, args=self.args.to_proto())
