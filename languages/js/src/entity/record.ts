import {BloockBridge} from '../bridge/bridge';
import * as proto from '../bridge/proto/record';
import {Proof} from './proof';

export class Record {
  headers?: RecordHeader;
  payload: Buffer;
  signatures: Signature[];
  encryption?: Encryption | undefined;
  proof?: Proof | undefined;

  constructor(
    headers: RecordHeader | undefined,
    payload: Buffer,
    signatures: Signature[],
    encryption: Encryption | undefined,
    proof: Proof | undefined
  ) {
    this.headers = headers;
    this.payload = payload;
    this.signatures = signatures;
    this.encryption = encryption;
    this.proof = proof;
  }

  static fromProto(r: proto.Record) {
    return new Record(
      r.headers === undefined ? undefined : RecordHeader.fromProto(r.headers),
      r.payload,
      r.signatures.map(x => Signature.fromProto(x)),
      r.encryption === undefined
        ? undefined
        : Encryption.fromProto(r.encryption),
      r.proof === undefined ? undefined : Proof.fromProto(r.proof)
    );
  }

  toProto(): proto.Record {
    return proto.Record.fromPartial({
      headers: this.headers,
      payload: this.payload,
      signatures: this.signatures.map(s => s.toProto()),
      encryption: this.encryption,
      proof: this.proof,
    });
  }

  async getHash(): Promise<string> {
    const bridge = new BloockBridge();
    return new Promise((resolve, reject) => {
      bridge.getRecord().getHash(this.toProto(), (err, res) => {
        if (err) {
          reject(err);
        }

        if (res.error) {
          reject(res.error.message);
        }

        resolve(res.hash);
      });
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
    return proto.RecordHeader.fromPartial({ty: this.ty});
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

  public static fromProto(s: proto.SignatureHeader): SignatureHeader {
    return new SignatureHeader(s.alg, s.kid);
  }

  toProto(): proto.SignatureHeader {
    return proto.SignatureHeader.fromPartial({alg: this.alg, kid: this.kid});
  }
}

export class Encryption {
  header: EncryptionHeader;
  protected: string;

  constructor(header: EncryptionHeader, prot: string) {
    this.header = header;
    this.protected = prot;
  }

  static fromProto(e: proto.Encryption): Encryption {
    return new Encryption(EncryptionHeader.fromProto(e.header!), e.protected);
  }

  toProto(): proto.Encryption {
    return proto.Encryption.fromPartial({
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

  static fromProto(e: proto.EncryptionHeader): EncryptionHeader {
    return new EncryptionHeader(e.alg);
  }

  toProto(): proto.EncryptionHeader {
    return proto.EncryptionHeader.fromPartial({alg: this.alg});
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
      status: this.status,
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
