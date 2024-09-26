import bloock._bridge.proto.bloock_availability_entities_pb2 as proto
from bloock.entity.availability.publisher import Publisher
from bloock.entity.availability.publisher_args import PublisherArgs


class IpnsPublisher(Publisher):
    """
    Represents a publisher for IPNS data availability.
    """
    def __init__(self, ipns_key = None) -> None:
        """
        Constructs a IpnsPublisher object with the specified parameters.
        :rtype: object
        """
        super().__init__(type=proto.IPNS, args=PublisherArgs(ipns_key))

    def to_proto(self) -> proto.Publisher:
        return proto.Publisher(type=self.type, args=self.args.to_proto())