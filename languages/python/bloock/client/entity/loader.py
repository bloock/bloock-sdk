from abc import abstractmethod
import bloock._bridge.proto.record_pb2 as proto


class LoaderArgs:
    def __init__(self, hash: str) -> None:
        self.hash = hash

    def to_proto(self) -> proto.LoaderArgs:
        return proto.LoaderArgs(hash=self.hash)


class Loader:
    def __init__(
        self, type: proto.DataAvailabilityType.ValueType, args: LoaderArgs
    ) -> None:
        self.type = type
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError


class HostedLoader(Loader):
    def __init__(self, hash: str) -> None:
        super().__init__(type=proto.HOSTED, args=LoaderArgs(hash))

    def to_proto(self) -> proto.Loader:
        return proto.Loader(type=self.type, args=self.args.to_proto())
