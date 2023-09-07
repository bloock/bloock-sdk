from __future__ import annotations

from enum import Enum
from bloock._bridge.proto.identity_entities_v2_pb2 import Method as MethodProto


class Method(Enum):
    IDEN3 = 0
    POLYGON_ID = 1

    def __int__(self):
        return self.value

    @staticmethod
    def to_proto(method: Method) -> MethodProto.ValueType:
        if method == Method.IDEN3:
            return MethodProto.IDEN3
        elif method == Method.POLYGON_ID:
            return MethodProto.POLYGON_ID
