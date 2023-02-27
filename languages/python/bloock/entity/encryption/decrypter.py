from abc import abstractmethod

import bloock._bridge.proto.encryption_entities_pb2 as proto
from bloock.entity.encryption.decrypter_args import DecrypterArgs


class Decrypter:
    def __init__(self, alg: proto.EncryptionAlg.ValueType, args: DecrypterArgs) -> None:
        self.alg = alg
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError
