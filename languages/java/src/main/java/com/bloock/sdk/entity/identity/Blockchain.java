package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents an enumeration of blockchains used in the DID.
 */
public enum Blockchain {
  EHTHEREUM,
  POLYGON,
  NO_CHAIN,
  UNKNOWN_CHAIN;

  public IdentityEntities.Blockchain toProto() {
    switch (this) {
      case EHTHEREUM:
        return IdentityEntities.Blockchain.ETHEREUM;
      case POLYGON:
        return IdentityEntities.Blockchain.POLYGON;
      case NO_CHAIN:
        return IdentityEntities.Blockchain.NO_CHAIN;
      case UNKNOWN_CHAIN:
        return IdentityEntities.Blockchain.UNKNOWN_CHAIN;
      default:
        return IdentityEntities.Blockchain.POLYGON;
    }
  }
}
