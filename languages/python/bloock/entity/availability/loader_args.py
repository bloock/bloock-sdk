import bloock._bridge.proto.availability_entities_pb2 as proto


class LoaderArgs:
    """
    Represents the arguments for a data loader.
    """
    def __init__(self, id: str) -> None:
        """
        Constructs a LoaderArgs object with the specified parameters.
        :type id: object
        :rtype: object
        """
        self.id = id
        """
        Is a unique identifier associated with the loader.
        """

    def to_proto(self) -> proto.LoaderArgs:
        return proto.LoaderArgs(id=self.id)
