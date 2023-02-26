import bloock._bridge.proto.authenticity_entities_pb2 as proto
from bloock.entity.authenticity.signer import Signer
from bloock.entity.authenticity.signer_args import SignerArgs


class EcdsaSigner(Signer):
    def __init__(self, private_key: str, common_name=None) -> None:
        super().__init__(alg=proto.ES256K, args=SignerArgs(private_key, common_name))

    def to_proto(self) -> proto.Signer:
        return proto.Signer(alg=self.alg, args=self.args.to_proto())
