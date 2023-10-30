import * as proto from "../../bridge/proto/identity_entities";
import { SignatureAlg } from "./signature_alg";
import { SignatureHeaderJws } from "./signature_header_jws";

export class SignatureJws {
  signature: string;
  protected: string;
  header: SignatureHeaderJws;
  messageHash: string;

  constructor(
    messageHash: string,
    signature: string,
    prot: string,
    header: SignatureHeaderJws
  ) {
    this.signature = signature;
    this.protected = prot;
    this.header = header;
    this.messageHash = messageHash;
  }

  static fromProto(s: proto.SignatureJWS): SignatureJws {
    return new SignatureJws(
      s.messageHash,
      s.signature,
      s.protected,
      SignatureHeaderJws.fromProto(s.header!)
    );
  }

  toProto(): proto.SignatureJWS {
    return proto.SignatureJWS.fromPartial({
      signature: this.signature,
      protected: this.protected,
      header: this.header.toProto(),
      messageHash: this.messageHash
    });
  }

  getAlg(): SignatureAlg {
    return SignatureAlg.fromString(this.header.alg);
  }
}
