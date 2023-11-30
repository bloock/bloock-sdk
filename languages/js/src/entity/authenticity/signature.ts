import * as proto from "../../bridge/proto/authenticity_entities";
import { SignatureAlg } from "./signature_alg";

export class Signature {
  signature: string;
  alg: string;
  kid: string;
  messageHash: string;
  subject?: string;

  constructor(
    messageHash: string,
    signature: string,
    alg: string,
    kid: string,
    subject?: string
  ) {
    this.signature = signature;
    this.alg = alg;
    this.kid = kid;
    this.messageHash = messageHash;
    this.subject = subject;
  }

  static fromProto(s: proto.Signature): Signature {
    return new Signature(s.messageHash, s.signature, s.alg, s.kid, s.subject);
  }

  toProto(): proto.Signature {
    return proto.Signature.fromPartial({
      signature: this.signature,
      alg: this.alg,
      kid: this.kid,
      messageHash: this.messageHash,
      subject: this.subject
    });
  }

  getAlg(): SignatureAlg {
    return SignatureAlg.fromString(this.alg);
  }
}
