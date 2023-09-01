from abc import abstractmethod
from bloock.entity.identity_v2.issuer_key_args import IssuerKeyArgs
import bloock._bridge.proto.identity_entities_v2_pb2 as proto


class IssuerKey:
    def __init__(self, args: IssuerKeyArgs) -> None:
        self.args = args

    @abstractmethod
    def to_proto(self) -> proto.IssuerKey:
        raise NotImplementedError