package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.BloockConfig;

/**
 * Represents a network.
 */
public enum Network {
  ETHEREUM_MAINNET,
  ETHEREUM_SEPOLIA,
  GNOSIS_CHAIN,
  POLYGON_CHAIN;

  public BloockConfig.Network toProto() {
    switch (this) {
      case ETHEREUM_SEPOLIA:
        return BloockConfig.Network.ETHEREUM_SEPOLIA;
      case ETHEREUM_MAINNET:
        return BloockConfig.Network.ETHEREUM_MAINNET;
      case GNOSIS_CHAIN:
        return BloockConfig.Network.GNOSIS_CHAIN;
      case POLYGON_CHAIN:
        return BloockConfig.Network.POLYGON_CHAIN;
      default:
        return BloockConfig.Network.ETHEREUM_MAINNET;
    }
  }
}
