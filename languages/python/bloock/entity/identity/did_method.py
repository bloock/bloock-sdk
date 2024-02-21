from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.identity_entities_pb2 as proto


class DidMethod(Enum):
    """
    Represents the type of method did.
    """
    PolygonID = 0
    """
    Represents the polygon id method did.
    """
    PolygonIDTest = 1
    """
    Represents the polygon id test method did.
    """

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(method: proto.DidMethod.ValueType | None) -> DidMethod:
        if method == proto.DidMethod.POLYGON_ID:
            return DidMethod.PolygonID
        elif method == proto.DidMethod.POLYGON_ID_TEST:
            return DidMethod.PolygonIDTest
        else:
            return DidMethod.PolygonIDTest

    def to_proto(self) -> proto.DidMethod:
        if self == DidMethod.PolygonID:
            return proto.DidMethod.POLYGON_ID
        elif self == DidMethod.PolygonIDTest:
            return proto.DidMethod.POLYGON_ID_TEST
        else:
            return proto.DidMethod.POLYGON_ID
