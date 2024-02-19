import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.local_key import LocalKey
from bloock.entity.key.managed_key import ManagedKey


class Key:
    """
    Represents a key entity that can be either a ManagedKey or a LocalKey.
    """
    local_key = None
    managed_key = None

    def __init__(self, key) -> None:
        """
        Constructs a Key object for a given managed or local key object.
        :type key: object
        :rtype: object
        """
        if isinstance(key, LocalKey):
            self.local_key = key
        elif isinstance(key, ManagedKey):
            self.managed_key = key
        else:
            raise Exception(
                "Invalid key provided. Must be of type LocalKey or ManagedKey")

    def to_proto(self) -> proto.Key:
        local_key = None
        if self.local_key is not None:
            local_key = self.local_key.to_proto()

        managed_key = None
        if self.managed_key is not None:
            managed_key = self.managed_key.to_proto()

        return proto.Key(
            local_key=local_key,
            managed_key=managed_key,
        )
