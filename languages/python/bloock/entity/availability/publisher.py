from abc import abstractmethod

import bloock._bridge.proto.availability_entities_pb2 as proto
from bloock.entity.availability.publisher_args import PublisherArgs


class Publisher:
    def __init__(
            self, type: proto.DataAvailabilityType.ValueType, args: PublisherArgs
    ) -> None:
        self.type = type
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError
