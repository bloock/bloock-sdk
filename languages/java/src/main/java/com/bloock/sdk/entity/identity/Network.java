package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents an enumeration of network identifiers.
 */
public enum Network {
  GOERLI,
  MAIN,
  MUMBAI,
  NO_NETWORK,
  UNKNOWN_NETWORK;

  public IdentityEntities.NetworkId toProto() {
    switch (this) {
      case GOERLI:
        return IdentityEntities.NetworkId.GOERLI;
      case MAIN:
        return IdentityEntities.NetworkId.MAIN;
      case MUMBAI:
        return IdentityEntities.NetworkId.MUMBAI;
      case NO_NETWORK:
        return IdentityEntities.NetworkId.NO_NETWORK;
      case UNKNOWN_NETWORK:
        return IdentityEntities.NetworkId.UNKNOWN_NETWORK;
      default:
        return IdentityEntities.NetworkId.MUMBAI;
    }
  }
}
