from abc import abstractmethod

import bloock._bridge.proto.authenticity_entities_pb2 as proto
from bloock.entity.authenticity.signer_args import SignerArgs


class Signer:
    def __init__(self, alg: proto.SignerAlg.ValueType, args: SignerArgs) -> None:
        self.alg = alg
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError
