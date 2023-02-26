import bloock._bridge.proto.encryption_entities_pb2 as proto


class EncrypterArgs:
    def __init__(self, key: str) -> None:
        self.key = key

    def to_proto(self) -> proto.EncrypterArgs:
        return proto.EncrypterArgs(key=self.key)