package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents an enumeration of methods used in the DID.
 */
public enum Method {
  IDEN3,
  POLYGONID;

  public IdentityEntities.Method toProto() {
    switch (this) {
      case IDEN3:
        return IdentityEntities.Method.IDEN3;
      case POLYGONID:
        return IdentityEntities.Method.POLYGON_ID;
      default:
        return IdentityEntities.Method.POLYGON_ID;
    }
  }
}
