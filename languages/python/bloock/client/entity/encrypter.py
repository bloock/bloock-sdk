from abc import abstractmethod
import bloock._bridge.proto.record_pb2 as proto


class EncrypterArgs:
    def __init__(self, key: str) -> None:
        self.key = key

    def to_proto(self) -> proto.EncrypterArgs:
        return proto.EncrypterArgs(key=self.key)


class Encrypter:
    def __init__(self, alg: proto.EncryptionAlg.ValueType, args: EncrypterArgs) -> None:
        self.alg = alg
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError


class AesEncrypter(Encrypter):
    def __init__(self, password: str) -> None:
        super().__init__(alg=proto.A256GCM, args=EncrypterArgs(password))

    def to_proto(self) -> proto.Encrypter:
        return proto.Encrypter(alg=self.alg, args=self.args.to_proto())


class RsaEncrypter(Encrypter):
    def __init__(self, public_key: str) -> None:
        super().__init__(alg=proto.RSA, args=EncrypterArgs(public_key))

    def to_proto(self) -> proto.Encrypter:
        return proto.Encrypter(alg=self.alg, args=self.args.to_proto())


class EciesEncrypter(Encrypter):
    def __init__(self, public_key: str) -> None:
        super().__init__(alg=proto.ECIES, args=EncrypterArgs(public_key))

    def to_proto(self) -> proto.Encrypter:
        return proto.Encrypter(alg=self.alg, args=self.args.to_proto())
