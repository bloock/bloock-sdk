from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto


class AccessControlTotp:
    code = None

    def __init__(self, code) -> None:
        self.code = code

    def to_proto(self) -> proto.AccessControlTotp:
        return proto.AccessControlTotp(
            code=self.code
        )