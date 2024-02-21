import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

/**
 * Represents the type of method did.
 */
export enum DidMethod {
  /**
   * Represents the polygon id method did.
   */
  PolygonID,
  /**
   * Represents the polygon id test method did.
   */
  PolygonIDTest,
}

export namespace DidMethod {
  export function toProto(method: DidMethod): identityEntitiesProto.DidMethod {
    switch (method) {
      case DidMethod.PolygonID:
        return identityEntitiesProto.DidMethod.POLYGON_ID
      case DidMethod.PolygonIDTest:
        return identityEntitiesProto.DidMethod.POLYGON_ID_TEST
    }
  }

  export function fromProto(
    method: identityEntitiesProto.DidMethod | undefined
  ): DidMethod {
    switch (method) {
      case identityEntitiesProto.DidMethod.POLYGON_ID:
        return DidMethod.PolygonID;
      case identityEntitiesProto.DidMethod.POLYGON_ID_TEST:
        return DidMethod.PolygonIDTest;
      default:
        return DidMethod.PolygonID;
    }
  }
}
