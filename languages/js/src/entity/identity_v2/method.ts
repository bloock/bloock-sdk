import { Method as MethodProto } from "../../bridge/proto/identity_entities_v2";

export enum Method {
  UNRECOGNIZED = -1,
  POLYGON_ID = 0,
  IDEN3 = 1
}

export namespace Method {
  export function toProto(method: Method): MethodProto {
    switch (method) {
      case Method.POLYGON_ID:
        return MethodProto.POLYGON_ID;
      case Method.IDEN3:
        return MethodProto.IDEN3;
      default:
        return MethodProto.UNRECOGNIZED;
    }
  }

  export function fromProto(method: MethodProto | undefined): Method {
    switch (method) {
      case MethodProto.POLYGON_ID:
        return Method.POLYGON_ID;
      case MethodProto.IDEN3:
        return Method.IDEN3;
      default:
        return Method.UNRECOGNIZED;
    }
  }
}
