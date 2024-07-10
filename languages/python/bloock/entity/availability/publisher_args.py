import bloock._bridge.proto.bloock_availability_entities_pb2 as proto


class PublisherArgs:
    """
    Represents the arguments for a data publisher.
    """
    def to_proto(self) -> proto.PublisherArgs:
        return proto.PublisherArgs()
