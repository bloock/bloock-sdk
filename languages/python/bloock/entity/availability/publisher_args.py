import bloock._bridge.proto.bloock_availability_entities_pb2 as proto
from bloock.entity.availability.ipns_key import IpnsKey


class PublisherArgs:
    ipns_key = None

    def __init__(self, ipns_key = None) -> None:
        """
        Constructs a PublisherArgs object with the specified parameters.
        :type ipns_key: object
        :rtype: object
        """
        if isinstance(ipns_key, IpnsKey):
            self.ipns_key = ipns_key
            """
            Is a ManagedKey or ManagedCertificate object.
            """
    """
    Represents the arguments for a data publisher.
    """
    def to_proto(self) -> proto.PublisherArgs:

        ipns_key = None
        if self.ipns_key is not None:
            ipns_key = self.ipns_key.to_proto()

        return proto.PublisherArgs(
            ipns_key=ipns_key
        )
