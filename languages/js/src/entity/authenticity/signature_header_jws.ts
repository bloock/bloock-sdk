import * as proto from "../../bridge/proto/identity_entities";

/**
 * Represents the header of a JSON Web Signature (JWS). [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515).
 */
export class SignatureHeaderJws {
  alg: string;
  kid: string;

  /**
   * Constructs a SignatureHeaderJws object with the specified algorithm and key identifier.
   * @param alg 
   * @param kid 
   */
  constructor(alg: string, kid: string) {
    this.alg = alg;
    this.kid = kid;
  }

  public static fromProto(s: proto.SignatureHeaderJWS): SignatureHeaderJws {
    return new SignatureHeaderJws(s.alg, s.kid);
  }

  toProto(): proto.SignatureHeaderJWS {
    return proto.SignatureHeaderJWS.fromPartial({
      alg: this.alg,
      kid: this.kid
    });
  }
}
