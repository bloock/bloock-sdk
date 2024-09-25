from __future__ import annotations

import bloock._bridge.proto.bloock_availability_entities_pb2 as proto


class IpnsKey:
    """
    Represents an object with a key uuid identifier.
    """
    key_id = None

    def __init__(self, key_id: str) -> None:
        """
        Creates an IpnsKey instance with a key uuid identifier.
        :type key_id: object
        :rtype: object
        """
        self.key_id = key_id

    def to_proto(self) -> proto.IpnsKey:
        return proto.IpnsKey(
            key_id=self.key_id
        )
    
    @staticmethod
    def from_proto(res: proto.IpnsKey = None) -> IpnsKey:
        if isinstance(res, proto.IpnsKey):
            return IpnsKey(res.key_id)
        return None