package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.Config;

public enum Network {
  ETHEREUM_MAINNET,
  ETHEREUM_GOERLI,
  GNOSIS_CHAIN,
  BLOOCK_CHAIN;

  public Config.Network toProto() {
    switch (this) {
      case BLOOCK_CHAIN:
        return Config.Network.BLOOCK_CHAIN;
      case ETHEREUM_GOERLI:
        return Config.Network.ETHEREUM_GOERLI;
      case ETHEREUM_MAINNET:
        return Config.Network.ETHEREUM_MAINNET;
      case GNOSIS_CHAIN:
        return Config.Network.GNOSIS_CHAIN;
      default:
        return Config.Network.ETHEREUM_MAINNET;
    }
  }
}
