from abc import abstractmethod
import bloock._bridge.proto.availability_entities_pb2 as proto


class LoaderArgs:
    def __init__(self, id: str) -> None:
        self.id = id

    def to_proto(self) -> proto.LoaderArgs:
        return proto.LoaderArgs(id=self.id)


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


class IpfsLoader(Loader):
    def __init__(self, hash: str) -> None:
        super().__init__(type=proto.IPFS, args=LoaderArgs(hash))

    def to_proto(self) -> proto.Loader:
        return proto.Loader(type=self.type, args=self.args.to_proto())
