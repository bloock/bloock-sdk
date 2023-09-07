package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public enum Blockchain {
  EHTHEREUM,
  POLYGON,
  NO_CHAIN,
  UNKNOWN_CHAIN;

  public IdentityEntitiesV2.Blockchain toProto() {
    switch (this) {
      case EHTHEREUM:
        return IdentityEntitiesV2.Blockchain.ETHEREUM;
      case POLYGON:
        return IdentityEntitiesV2.Blockchain.POLYGON;
      case NO_CHAIN:
        return IdentityEntitiesV2.Blockchain.NO_CHAIN;
      case UNKNOWN_CHAIN:
        return IdentityEntitiesV2.Blockchain.UNKNOWN_CHAIN;
      default:
        return IdentityEntitiesV2.Blockchain.POLYGON;
    }
  }
}
