import bloock._bridge.proto.encryption_entities_pb2 as proto


class DecrypterArgs:
    def __init__(self, key: str) -> None:
        self.key = key

    def to_proto(self) -> proto.DecrypterArgs:
        return proto.DecrypterArgs(key=self.key)
