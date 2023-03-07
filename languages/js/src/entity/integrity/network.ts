import * as proto from "../../bridge/proto/config";

export enum Network {
  UNRECOGNIZED = -1,
  ETHEREUM_MAINNET = 0,
  ETHEREUM_GOERLI = 1,
  GNOSIS_CHAIN = 2,
  BLOOCK_CHAIN = 3
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
      default:
        return Network.UNRECOGNIZED;
    }
  }
}
