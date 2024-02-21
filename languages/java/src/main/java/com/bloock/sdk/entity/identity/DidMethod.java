package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

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

  public static DidMethod fromProto(IdentityEntities.DidMethod method) {
    switch (method) {
      case POLYGON_ID:
        return DidMethod.PolygonID;
      case POLYGON_ID_TEST:
        return DidMethod.PolygonIDTest;
      default:
        return DidMethod.PolygonID;
    }
  }

  public IdentityEntities.DidMethod toProto() {
    switch (this) {
      case PolygonID:
        return IdentityEntities.DidMethod.POLYGON_ID;
      case PolygonIDTest:
        return IdentityEntities.DidMethod.POLYGON_ID_TEST;
      default:
        return IdentityEntities.DidMethod.POLYGON_ID;
    }
  }
}
