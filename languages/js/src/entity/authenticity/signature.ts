import * as proto from "../../bridge/proto/authenticity_entities";
import { SignatureAlg } from "./signature_alg";
import { SignatureHeader } from "./signature_header";

export class Signature {
  signature: string;
  protected: string;
  header: SignatureHeader;
  messageHash: string;

  constructor(
    messageHash: string,
    signature: string,
    prot: string,
    header: SignatureHeader
  ) {
    this.signature = signature;
    this.protected = prot;
    this.header = header;
    this.messageHash = messageHash;
  }

  static fromProto(s: proto.Signature): Signature {
    return new Signature(
      s.messageHash,
      s.signature,
      s.protected,
      SignatureHeader.fromProto(s.header!)
    );
  }

  toProto(): proto.Signature {
    return proto.Signature.fromPartial({
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
