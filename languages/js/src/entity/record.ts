import { BloockBridge } from "../bridge/bridge";
import * as proto from "../bridge/proto/record";

export class Record {
  payload: Uint8Array;

  constructor(
    payload: Uint8Array,
  ) {
    this.payload = payload;
  }

  static fromProto(r: proto.Record) {
    return new Record(
      r.payload
    );
  }

  toProto(): proto.Record {
    return proto.Record.fromPartial({
      payload: this.payload
    });
  }

  async getHash(): Promise<string> {
    const bridge = new BloockBridge();
    return bridge
      .getRecord()
      .GetHash(this.toProto())
      .then(res => {
        return res.hash;
      });
  }
}

export class RecordHeader {
  ty: string;
  constructor(ty: string) {
    this.ty = ty;
  }

  static fromProto(recordHeader: proto.RecordHeader): RecordHeader {
    return new RecordHeader(recordHeader.ty);
  }

  toProto(): proto.RecordHeader {
    return proto.RecordHeader.fromPartial({ ty: this.ty });
  }
}

export class Signature {
  signature: string;
  protected: string;
  header: SignatureHeader;

  constructor(signature: string, prot: string, header: SignatureHeader) {
    this.signature = signature;
    this.protected = prot;
    this.header = header;
  }

  static fromProto(s: proto.Signature): Signature {
    return new Signature(
      s.signature,
      s.protected,
      SignatureHeader.fromProto(s.header!)
    );
  }

  toProto(): proto.Signature {
    return proto.Signature.fromPartial({
      signature: this.signature,
      protected: this.protected,
      header: this.header.toProto()
    });
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

export class RecordReceipt {
  anchor: number;
  client: string;
  record: string;
  status: string;

  constructor(anchor: number, client: string, record: string, status: string) {
    this.anchor = anchor;
    this.client = client;
    this.record = record;
    this.status = status;
  }

  static fromProto(r: proto.RecordReceipt): RecordReceipt {
    return new RecordReceipt(r.anchor, r.client, r.record, r.status);
  }

  toProto(): proto.RecordReceipt {
    return proto.RecordReceipt.fromPartial({
      anchor: this.anchor,
      client: this.client,
      record: this.record,
      status: this.status
    });
  }
}

export class Keys {
  publicKey: string;
  privateKey: string;

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  static fromProto(k: proto.GenerateKeysResponse): Keys {
    return new Keys(k.publicKey, k.privateKey);
  }
}
