import bloock._bridge.proto.authenticity_entities_pb2 as proto


class SignerArgs:
    def __init__(self, private_key: str, common_name=None) -> None:
        self.private_key = private_key
        self.common_name = common_name

    def to_proto(self) -> proto.SignerArgs:
        return proto.SignerArgs(
            private_key=self.private_key, common_name=self.common_name
        )
