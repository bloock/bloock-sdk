import bloock._bridge.proto.encryption_entities_pb2 as proto
from bloock.entity.encryption.encrypter import Encrypter
from bloock.entity.encryption.encrypter_args import EncrypterArgs


class AesEncrypter(Encrypter):
    def __init__(self, args: EncrypterArgs) -> None:
        super().__init__(alg=proto.A256GCM, args=args)

    def to_proto(self) -> proto.Encrypter:
        local_key = None
        if self.args.local_key is not None:
            local_key = self.args.local_key.to_proto()

        managed_key = None
        if self.args.managed_key is not None:
            managed_key = self.args.managed_key.to_proto()

        return proto.Encrypter(
            alg=self.alg,
            local_key=local_key,
            managed_key=managed_key,
        )
