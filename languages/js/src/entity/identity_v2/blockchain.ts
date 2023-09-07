import { Blockchain as BlockchainProto } from "../../bridge/proto/identity_entities_v2";

export enum Blockchain {
  UNRECOGNIZED = -1,
  ETHEREUM = 0,
  POLYGON = 1,
  NO_CHAIN = 2,
  UNKNOWN_CHAIN = 3
}

export namespace Blockchain {
  export function toProto(blockchain: Blockchain): BlockchainProto {
    switch (blockchain) {
      case Blockchain.ETHEREUM:
        return BlockchainProto.ETHEREUM;
      case Blockchain.POLYGON:
        return BlockchainProto.POLYGON;
      case Blockchain.NO_CHAIN:
        return BlockchainProto.NO_CHAIN;
      case Blockchain.UNKNOWN_CHAIN:
        return BlockchainProto.UNKNOWN_CHAIN;
      default:
        return BlockchainProto.UNRECOGNIZED;
    }
  }

  export function fromProto(
    blockchain: BlockchainProto | undefined
  ): Blockchain {
    switch (blockchain) {
      case BlockchainProto.ETHEREUM:
        return Blockchain.ETHEREUM;
      case BlockchainProto.POLYGON:
        return Blockchain.POLYGON;
      case BlockchainProto.NO_CHAIN:
        return Blockchain.NO_CHAIN;
      case BlockchainProto.UNKNOWN_CHAIN:
        return Blockchain.UNKNOWN_CHAIN;
      default:
        return Blockchain.UNRECOGNIZED;
    }
  }
}
