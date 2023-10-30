import bloock._bridge.proto.authenticity_entities_pb2 as proto
from bloock.entity.authenticity.signer_args import SignerArgs


class Signer:
    def __init__(self, args: SignerArgs) -> None:
        self.args = args

    def to_proto(self) -> proto.Signer:
        local_key = None
        if self.args.local_key is not None:
            local_key = self.args.local_key.to_proto()

        managed_key = None
        if self.args.managed_key is not None:
            managed_key = self.args.managed_key.to_proto()

        common_name = None
        if self.args.common_name is not None:
            common_name = self.args.common_name

        managed_certificate = None
        if self.args.managed_certificate is not None:
            managed_certificate = self.args.managed_certificate.to_proto()

        local_certificate = None
        if self.args.local_certificate is not None:
            local_certificate = self.args.local_certificate.to_proto()

        return proto.Signer(
            local_key=local_key,
            managed_key=managed_key,
            managed_certificate=managed_certificate,
            local_certificate=local_certificate,
            common_name=common_name
        )
