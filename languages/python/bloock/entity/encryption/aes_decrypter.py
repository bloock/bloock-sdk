import bloock._bridge.proto.encryption_entities_pb2 as proto
from bloock.entity.encryption.decrypter import Decrypter
from bloock.entity.encryption.decrypter_args import DecrypterArgs


class AesDecrypter(Decrypter):
    def __init__(self, password: str) -> None:
        super().__init__(alg=proto.A256GCM, args=DecrypterArgs(password))

    def to_proto(self) -> proto.Decrypter:
        return proto.Decrypter(alg=self.alg, args=self.args.to_proto())
