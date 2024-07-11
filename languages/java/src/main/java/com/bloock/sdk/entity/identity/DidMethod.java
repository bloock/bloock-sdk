package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents the type of method did.
 */
public enum DidMethod {
  /**
   * Represents the polygon id method did.
   */
  PolygonID,
  /**
   * Represents the polygon id test method did.
   */
  PolygonIDTest;

  public static DidMethod fromProto(BloockIdentityEntities.DidMethod method) {
    switch (method) {
      case POLYGON_ID:
        return DidMethod.PolygonID;
      case POLYGON_ID_TEST:
        return DidMethod.PolygonIDTest;
      default:
        return DidMethod.PolygonID;
    }
  }

  public BloockIdentityEntities.DidMethod toProto() {
    switch (this) {
      case PolygonID:
        return BloockIdentityEntities.DidMethod.POLYGON_ID;
      case PolygonIDTest:
        return BloockIdentityEntities.DidMethod.POLYGON_ID_TEST;
      default:
        return BloockIdentityEntities.DidMethod.POLYGON_ID;
    }
  }
}
