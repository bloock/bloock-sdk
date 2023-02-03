import { BloockBridge } from "../bridge/bridge";
import * as proto from "../bridge/proto/record";
import { NewConfigData } from "../config/config";

export enum SignatureAlg {
  UNRECOGNIZED = -1,
  ECDSA = 0,
  ENS = 1
}

export namespace SignatureAlg {
  export function fromString(alg: string): SignatureAlg {
    switch (alg) {
      case "ES256K":
        return SignatureAlg.ECDSA;
      case "ENS":
        return SignatureAlg.ENS;
      default:
        return SignatureAlg.UNRECOGNIZED;
    }
  }
}

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

  async getCommonName(): Promise<string> {
    const bridge = new BloockBridge();
    return bridge
      .getRecord()
      .GetSignatureCommonName(
        proto.SignatureCommonNameRequest.fromPartial({
          configData: NewConfigData(),
          signature: this.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.commonName;
      });
  }

  getAlg(): SignatureAlg {
    return SignatureAlg.fromString(this.header.alg);
  }
}

export class SignatureHeader {
  alg: string;
  kid: string;
  constructor(alg: string, kid: string) {
    this.alg = alg;
    this.kid = kid;
  }

  public static fromProto(s: proto.SignatureHeader): SignatureHeader {
    return new SignatureHeader(s.alg, s.kid);
  }

  toProto(): proto.SignatureHeader {
    return proto.SignatureHeader.fromPartial({ alg: this.alg, kid: this.kid });
  }
}
