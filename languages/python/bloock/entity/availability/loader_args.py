import bloock._bridge.proto.availability_entities_pb2 as proto


class LoaderArgs:
    def __init__(self, id: str) -> None:
        self.id = id

    def to_proto(self) -> proto.LoaderArgs:
        return proto.LoaderArgs(id=self.id)
