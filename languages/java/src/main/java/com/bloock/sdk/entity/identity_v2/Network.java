package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public enum Network {
  GOERLI,
  MAIN,
  MUMBAI,
  NO_NETWORK,
  UNKNOWN_NETWORK;

  public IdentityEntitiesV2.NetworkId toProto() {
    switch (this) {
      case GOERLI:
        return IdentityEntitiesV2.NetworkId.GOERLI;
      case MAIN:
        return IdentityEntitiesV2.NetworkId.MAIN;
      case MUMBAI:
        return IdentityEntitiesV2.NetworkId.MUMBAI;
      case NO_NETWORK:
        return IdentityEntitiesV2.NetworkId.NO_NETWORK;
      case UNKNOWN_NETWORK:
        return IdentityEntitiesV2.NetworkId.UNKNOWN_NETWORK;
      default:
        return IdentityEntitiesV2.NetworkId.MUMBAI;
    }
  }
}
