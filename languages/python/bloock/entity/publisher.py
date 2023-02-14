from abc import abstractmethod
import bloock._bridge.proto.availability_entities_pb2 as proto


class PublisherArgs:
    def to_proto(self) -> proto.PublisherArgs:
        return proto.PublisherArgs()


class Publisher:
    def __init__(
        self, type: proto.DataAvailabilityType.ValueType, args: PublisherArgs
    ) -> None:
        self.type = type
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError


class HostedPublisher(Publisher):
    def __init__(self) -> None:
        super().__init__(type=proto.HOSTED, args=PublisherArgs())

    def to_proto(self) -> proto.Publisher:
        return proto.Publisher(type=self.type, args=self.args.to_proto())


class IpfsPublisher(Publisher):
    def __init__(self) -> None:
        super().__init__(type=proto.IPFS, args=PublisherArgs())

    def to_proto(self) -> proto.Publisher:
        return proto.Publisher(type=self.type, args=self.args.to_proto())
