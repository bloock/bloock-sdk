import bloock._bridge.proto.availability_entities_pb2 as proto


class PublisherArgs:
    def to_proto(self) -> proto.PublisherArgs:
        return proto.PublisherArgs()
