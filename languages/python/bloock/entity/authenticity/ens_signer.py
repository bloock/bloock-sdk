import bloock._bridge.proto.authenticity_entities_pb2 as proto
from bloock.entity.authenticity.signer import Signer
from bloock.entity.authenticity.signer_args import SignerArgs


class EnsSigner(Signer):
    def __init__(self, args: SignerArgs) -> None:
        super().__init__(alg=proto.ENS, args=args)

    def to_proto(self) -> proto.Signer:
        local_key = None
        if self.args.local_key is not None:
            local_key = self.args.local_key.to_proto()

        managed_key = None
        if self.args.managed_key is not None:
            managed_key = self.args.managed_key.to_proto()

        common_name = None
        if self.args.common_name is not None:
            common_name = self.args.common_name.to_proto()

        return proto.Signer(
            alg=self.alg,
            local_key=local_key,
            managed_key=managed_key,
            common_name=common_name
        )
