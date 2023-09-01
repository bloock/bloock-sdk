from __future__ import annotations

from enum import Enum
from bloock._bridge.proto.identity_entities_v2_pb2 import Blockchain as BlockchainProto


class Blockchain(Enum):
    POLYGON = 0
    ETHEREUM = 1
    NO_CHAIN = 2
    UNKNOWN_CHAIN = 3

    def __int__(self):
        return self.value

    @staticmethod
    def to_proto(blockchain: Blockchain) -> BlockchainProto.ValueType:
        if blockchain == Blockchain.POLYGON:
            return BlockchainProto.POLYGON
        elif blockchain == Blockchain.ETHEREUM:
            return BlockchainProto.ETHEREUM
        elif blockchain == Blockchain.NO_CHAIN:
            return BlockchainProto.NO_CHAIN
        elif blockchain == Blockchain.UNKNOWN_CHAIN:
            return BlockchainProto.UNKNOWN_CHAIN