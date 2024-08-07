import bloock._bridge.proto.bloock_availability_entities_pb2 as proto
from bloock.entity.availability.publisher import Publisher
from bloock.entity.availability.publisher_args import PublisherArgs


class IpfsPublisher(Publisher):
    """
    Represents a publisher for IPFS data availability.
    """
    def __init__(self) -> None:
        """
        Constructs a IpfsPublisher object with the specified parameters.
        :rtype: object
        """
        super().__init__(type=proto.IPFS, args=PublisherArgs())

    def to_proto(self) -> proto.Publisher:
        return proto.Publisher(type=self.type, args=self.args.to_proto())
