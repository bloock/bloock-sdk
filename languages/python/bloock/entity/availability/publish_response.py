from __future__ import annotations

import bloock._bridge.proto.bloock_availability_pb2 as proto
from bloock.entity.availability.ipns_key import IpnsKey


class PublishResponse:
    """
    Represents an object with a the publish response attributes.
    """
    id = None
    ipns_key = None

    def __init__(self, id: str, ipns_key: IpnsKey = None) -> None:
        """
        Creates an IpnsKey instance with a key uuid identifier.
        :type id: object
        :type ipns_key: object
        :rtype: object
        """
        self.id = id
        if isinstance(ipns_key, IpnsKey):
            self.ipns_key = ipns_key

    @staticmethod
    def from_proto(res: proto.PublishResponse) -> PublishResponse:
        return PublishResponse(res.id, IpnsKey.from_proto(res.ipns_key))