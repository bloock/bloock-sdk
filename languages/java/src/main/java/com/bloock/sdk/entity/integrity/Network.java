package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.Config;

/**
 * Represents a network.
 */
public enum Network {
  ETHEREUM_MAINNET,
  /**
   *  @deprecated Test networks will be deleted in future versions. If you have been
   * integrating with an existent test API key and you want to start a free trial
   * period please contact support@bloock.com.
   */
  @Deprecated
  ETHEREUM_GOERLI,
  GNOSIS_CHAIN,
  /**
   * @deprecated Test networks will be deleted in future versions. If you have been
   * integrating with an existent test API key and you want to start a free trial
   * period please contact support@bloock.com.
   */
  @Deprecated
  BLOOCK_CHAIN,
  POLYGON_CHAIN;

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
      case POLYGON_CHAIN:
        return Config.Network.POLYGON_CHAIN;
      default:
        return Config.Network.ETHEREUM_MAINNET;
    }
  }
}
