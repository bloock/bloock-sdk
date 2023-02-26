from abc import abstractmethod

import bloock._bridge.proto.availability_entities_pb2 as proto
from bloock.entity.availability.loader_args import LoaderArgs


class Loader:
    def __init__(
            self, type: proto.DataAvailabilityType.ValueType, args: LoaderArgs
    ) -> None:
        self.type = type
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError
