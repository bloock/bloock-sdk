import * as proto from "../../bridge/proto/bloock_config";

/**
 * Represents a network.
 */
export enum Network {
  UNRECOGNIZED = -1,
  ETHEREUM_MAINNET = 0,
  /**
   * @deprecated Test networks will be deleted in future versions. If you have been integrating with an existent test API key and you want to start a free trial period please contact support@bloock.com.
   */
  ETHEREUM_GOERLI = 1,
  GNOSIS_CHAIN = 2,
  /**
   * @deprecated Test networks will be deleted in future versions. If you have been integrating with an existent test API key and you want to start a free trial period please contact support@bloock.com.
   */
  BLOOCK_CHAIN = 3,
  POLYGON_CHAIN = 4
}

export namespace Network {
  export function toProto(network: Network): proto.Network {
    switch (network) {
      case Network.ETHEREUM_MAINNET:
        return proto.Network.ETHEREUM_MAINNET;
      case Network.ETHEREUM_GOERLI:
        return proto.Network.ETHEREUM_GOERLI;
      case Network.GNOSIS_CHAIN:
        return proto.Network.GNOSIS_CHAIN;
      case Network.BLOOCK_CHAIN:
        return proto.Network.BLOOCK_CHAIN;
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
      case proto.Network.ETHEREUM_GOERLI:
        return Network.ETHEREUM_GOERLI;
      case proto.Network.GNOSIS_CHAIN:
        return Network.GNOSIS_CHAIN;
      case proto.Network.BLOOCK_CHAIN:
        return Network.BLOOCK_CHAIN;
      case proto.Network.POLYGON_CHAIN:
        return Network.POLYGON_CHAIN;
      default:
        return Network.UNRECOGNIZED;
    }
  }
}
