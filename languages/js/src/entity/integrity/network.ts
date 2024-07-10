import * as proto from "../../bridge/proto/bloock_config";

/**
 * Represents a network.
 */
export enum Network {
  UNRECOGNIZED = -1,
  ETHEREUM_MAINNET = 0,
  ETHEREUM_SEPOLIA = 1,
  GNOSIS_CHAIN = 2,
  POLYGON_CHAIN = 4
}

export namespace Network {
  export function toProto(network: Network): proto.Network {
    switch (network) {
      case Network.ETHEREUM_MAINNET:
        return proto.Network.ETHEREUM_MAINNET;
      case Network.ETHEREUM_SEPOLIA:
        return proto.Network.ETHEREUM_SEPOLIA;
      case Network.GNOSIS_CHAIN:
        return proto.Network.GNOSIS_CHAIN;
      case Network.POLYGON_CHAIN:
        return proto.Network.POLYGON_CHAIN;
      default:
        return proto.Network.UNRECOGNIZED;
    }
  }

  export function fromProto(network: proto.Network | undefined): Network {
    switch (network) {
      case proto.Network.ETHEREUM_MAINNET:
        return Network.ETHEREUM_MAINNET;
      case proto.Network.ETHEREUM_SEPOLIA:
        return Network.ETHEREUM_SEPOLIA;
      case proto.Network.GNOSIS_CHAIN:
        return Network.GNOSIS_CHAIN;
      case proto.Network.POLYGON_CHAIN:
        return Network.POLYGON_CHAIN;
      default:
        return Network.UNRECOGNIZED;
    }
  }
}
