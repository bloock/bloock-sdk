import bloock._bridge.proto.availability_entities_pb2 as proto
from bloock.entity.availability.publisher import Publisher
from bloock.entity.availability.publisher_args import PublisherArgs


class HostedPublisher(Publisher):
    def __init__(self) -> None:
        super().__init__(type=proto.HOSTED, args=PublisherArgs())

    def to_proto(self) -> proto.Publisher:
        return proto.Publisher(type=self.type, args=self.args.to_proto())
