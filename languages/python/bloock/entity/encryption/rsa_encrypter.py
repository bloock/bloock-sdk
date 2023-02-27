import bloock._bridge.proto.encryption_entities_pb2 as proto
from bloock.entity.encryption.encrypter import Encrypter
from bloock.entity.encryption.encrypter_args import EncrypterArgs


class RsaEncrypter(Encrypter):
    def __init__(self, public_key: str) -> None:
        super().__init__(alg=proto.RSA, args=EncrypterArgs(public_key))

    def to_proto(self) -> proto.Encrypter:
        return proto.Encrypter(alg=self.alg, args=self.args.to_proto())
