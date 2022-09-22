import {
  Record as RecordProto,
  RecordReceipt as RecordReceiptProto,
  RecordHeader as RecordHeaderProto,
  Signature as SignatureProto,
  SignatureHeader as SignatureHeaderProto,
  Encryption as EncryptionProto,
  EncryptionHeader as EncryptionHeaderProto,
} from "../bridge/proto/record";
import { Proof } from "./proof";

export class Record {
  headers?: RecordHeader;
  payload: Buffer;
  signatures: Signature[];
  encryption?: Encryption | undefined;
  proof?: Proof | undefined;

  constructor(
    headers: RecordHeader,
    payload: Buffer,
    signatures: Signature[],
    encryption: Encryption,
    proof: Proof
  ) {
    this.headers = headers;
    this.payload = payload;
    this.signatures = signatures;
    this.encryption = encryption;
    this.proof = proof;
  }

  static fromProto(r: RecordProto) {
    return new Record(
      RecordHeader.fromProto(r.headers!),
      r.payload,
      r.signatures.map((x) => Signature.fromProto(x)),
      Encryption.fromProto(r.encryption!),
      Proof.fromProto(r.proof!)
    );
  }

  toProto(): RecordProto {
    return RecordProto.fromPartial({});
  }
}

export class RecordHeader {
  ty: string;
  constructor(ty: string) {
    this.ty = ty;
  }

  static fromProto(recordHeader: RecordHeaderProto): RecordHeader {
    return new RecordHeader(recordHeader.ty);
  }

  toProto(): RecordHeaderProto {
    return RecordHeaderProto.fromPartial({ ty: this.ty });
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

  static fromProto(s: SignatureProto): Signature {
    return new Signature(
      s.signature,
      s.protected,
      SignatureHeader.fromProto(s.header!)
    );
  }

  toProto(): SignatureProto {
    return SignatureProto.fromPartial({
      signature: this.signature,
      protected: this.protected,
      header: this.header.toProto(),
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

  public static fromProto(s: SignatureHeaderProto): SignatureHeader {
    return new SignatureHeader(s.alg, s.kid);
  }

  toProto(): SignatureHeaderProto {
    return SignatureHeaderProto.fromPartial({ alg: this.alg, kid: this.kid });
  }
}

export class Encryption {
  header: EncryptionHeader;
  protected: string;

  constructor(header: EncryptionHeader, prot: string) {
    this.header = header;
    this.protected = prot;
  }

  static fromProto(e: EncryptionProto): Encryption {
    return new Encryption(EncryptionHeader.fromProto(e.header!), e.protected);
  }

  toProto(): EncryptionProto {
    return EncryptionProto.fromPartial({
      header: this.header.toProto(),
      protected: this.protected,
    });
  }
}

export class EncryptionHeader {
  alg: string;

  constructor(alg: string) {
    this.alg = alg;
  }

  static fromProto(e: EncryptionHeaderProto): EncryptionHeader {
    return new EncryptionHeader(e.alg);
  }

  toProto(): EncryptionHeaderProto {
    return EncryptionHeaderProto.fromPartial({ alg: this.alg });
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

  static fromProto(r: RecordReceiptProto): RecordReceipt {
    return new RecordReceipt(r.anchor, r.client, r.record, r.status);
  }

  toProto(): RecordReceiptProto {
    return RecordReceiptProto.fromPartial({
      anchor: this.anchor,
      client: this.client,
      record: this.record,
      status: this.status,
    });
  }
}
