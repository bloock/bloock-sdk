import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.issuer_key_args import IssuerKeyArgs
from bloock.entity.identity_v2.issuer_key import IssuerKey


class BjjIssuerKey(IssuerKey):

    def __init__(self, args: IssuerKeyArgs) -> None:
        self.args = args

    def to_proto(self) -> proto.IssuerKey:
        local_key = None
        if self.args.local_key is not None:
            local_key = self.args.local_key.to_proto()

        managed_key = None
        if self.args.managed_key is not None:
            managed_key = self.args.managed_key.to_proto()

        return proto.IssuerKey(
            local_key=local_key,
            managed_key=managed_key,
        )
