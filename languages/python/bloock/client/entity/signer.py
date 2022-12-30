from abc import abstractmethod
import bloock._bridge.proto.record_pb2 as proto


class SignerArgs:
    def __init__(self, private_key: str, common_name=None) -> None:
        self.private_key = private_key
        self.common_name = common_name

    def to_proto(self) -> proto.SignerArgs:
        return proto.SignerArgs(
            private_key=self.private_key, common_name=self.common_name
        )


class Signer:
    def __init__(self, alg: proto.SignerAlg.ValueType, args: SignerArgs) -> None:
        self.alg = alg
        self.args = args

    @abstractmethod
    def to_proto(self):
        raise NotImplementedError


class EcdsaSigner(Signer):
    def __init__(self, private_key: str, common_name=None) -> None:
        super().__init__(alg=proto.ES256K, args=SignerArgs(private_key, common_name))

    def to_proto(self) -> proto.Signer:
        return proto.Signer(alg=self.alg, args=self.args.to_proto())
