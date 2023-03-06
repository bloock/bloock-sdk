from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class Identity:
    def __init__(self, mnemonic: str, key: str, private_key: str) -> None:
        self.mnemonic = mnemonic
        self.key = key
        self.private_key = private_key

    @staticmethod
    def from_proto(c: proto.Identity) -> Identity:
        return Identity(
            mnemonic=c.mnemonic,
            key=c.key,
            private_key=c.private_key
        )

    def to_proto(self) -> proto.Identity:
        return proto.Identity(
            mnemonic=self.mnemonic,
            key=self.key,
            private_key=self.private_key,
        )
