from abc import abstractmethod
import bloock._bridge.proto.record_pb2 as proto


class DecrypterArgs:
    def __init__(self, password: str) -> None:
        self.password = password

    def to_proto(self) -> proto.DecrypterArgs:
        return proto.DecrypterArgs(password=self.password)


class Decrypter:
    def __init__(self, alg: proto.EncryptionAlg.ValueType, args: DecrypterArgs) -> None:
        self.alg = alg
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError


class AesDecrypter(Decrypter):
    def __init__(self, password: str) -> None:
        super().__init__(alg=proto.A256GCM, args=DecrypterArgs(password))

    def to_proto(self) -> proto.Decrypter:
        return proto.Decrypter(alg=self.alg, args=self.args.to_proto())
