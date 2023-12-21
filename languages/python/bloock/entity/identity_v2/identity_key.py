from abc import abstractmethod
from bloock.entity.identity_v2.identity_key_args import IdentityKeyArgs
import bloock._bridge.proto.identity_entities_v2_pb2 as proto


class IdentityKey:
    def __init__(self, args: IdentityKeyArgs) -> None:
        self.args = args

    @abstractmethod
    def to_proto(self) -> proto.IdentityKey:
        raise NotImplementedError