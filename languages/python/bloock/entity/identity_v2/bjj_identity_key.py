import bloock._bridge.proto.identity_entities_v2_pb2 as proto
from bloock.entity.identity_v2.identity_key_args import IdentityKeyArgs
from bloock.entity.identity_v2.identity_key import IdentityKey


class BjjIdentityKey(IdentityKey):

    def __init__(self, args: IdentityKeyArgs) -> None:
        self.args = args

    def to_proto(self) -> proto.IdentityKey:
        local_key = None
        if self.args.local_key is not None:
            local_key = self.args.local_key.to_proto()

        managed_key = None
        if self.args.managed_key is not None:
            managed_key = self.args.managed_key.to_proto()

        return proto.IdentityKey(
            local_key=local_key,
            managed_key=managed_key,
        )
