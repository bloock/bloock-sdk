import * as proto from "../../bridge/proto/identity_entities";

export class SignatureHeaderJws {
  alg: string;
  kid: string;
  constructor(alg: string, kid: string) {
    this.alg = alg;
    this.kid = kid;
  }

  public static fromProto(s: proto.SignatureHeaderJWS): SignatureHeaderJws {
    return new SignatureHeaderJws(s.alg, s.kid);
  }

  toProto(): proto.SignatureHeaderJWS {
    return proto.SignatureHeaderJWS.fromPartial({ alg: this.alg, kid: this.kid });
  }
}
