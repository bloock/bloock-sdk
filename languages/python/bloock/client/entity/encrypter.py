from abc import abstractmethod
import bloock._bridge.proto.record_pb2 as proto


class EncrypterArgs:
    def __init__(self, password: str) -> None:
        self.password = password

    def to_proto(self) -> proto.EncrypterArgs:
        return proto.EncrypterArgs(password=self.password)


class Encrypter:
    def __init__(self, alg: proto.EncryptionAlg.ValueType, args: EncrypterArgs) -> None:
        self.alg = alg
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError


class AesEncrypter(Encrypter):
    def __init__(self, secret: str) -> None:
        super().__init__(alg=proto.A256GCM, args=EncrypterArgs(secret))

    def to_proto(self) -> proto.Encrypter:
        return proto.Encrypter(alg=self.alg, args=self.args.to_proto())
