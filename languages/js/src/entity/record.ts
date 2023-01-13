import { BloockBridge } from "../bridge/bridge";
import * as proto from "../bridge/proto/record";
import { SetProofRequest } from "../bridge/proto/proof";
import { NewConfigData } from "../config/config";
import { Proof } from "./proof";
import { Publisher } from "./publisher";

export class Record {
  payload: Uint8Array;

  constructor(payload: Uint8Array) {
    this.payload = payload;
  }

  static fromProto(r: proto.Record) {
    return new Record(r.payload);
  }

  toProto(): proto.Record {
    return proto.Record.fromPartial({
      configData: NewConfigData(),
      payload: this.payload
    });
  }

  async getHash(): Promise<string> {
    const bridge = new BloockBridge();
    return bridge
      .getRecord()
      .GetHash(this.toProto())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.hash;
      });
  }

  async getSignatures(): Promise<Signature[]> {
    const bridge = new BloockBridge();
    return bridge
      .getRecord()
      .GetSignatures(this.toProto())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.signatures.map(x => Signature.fromProto(x));
      });
  }

  async publish(publisher: Publisher): Promise<string> {
    const bridge = new BloockBridge();
    const request = proto.PublishRequest.fromPartial({
      configData: NewConfigData(),
      publisher: publisher.toProto(),
      record: this.toProto()
    });
    return bridge
      .getRecord()
      .Publish(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.hash;
      });
  }

  public retrieve(): Uint8Array {
    return this.payload;
  }

  async setProof(proof: Proof) {
    const bridge = new BloockBridge();

    const req = SetProofRequest.fromPartial({
      configData: NewConfigData(),
      record: this.toProto(),
      proof: proof.toProto()
    });

    return bridge
      .getProof()
      .SetProof(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        this.payload = res.record?.payload!;
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

export class KeyPair {
  publicKey: string;
  privateKey: string;

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}

export class EcdsaKeyPair extends KeyPair {
  static fromProto(k: proto.GenerateKeysResponse): KeyPair {
    return new KeyPair(k.publicKey, k.privateKey);
  }
}

export class RsaKeyPair extends KeyPair {
  static fromProto(k: proto.GenerateRsaKeyPairResponse): KeyPair {
    return new KeyPair(k.publicKey, k.privateKey);
  }
}

export class EciesKeyPair extends KeyPair {
  static fromProto(k: proto.GenerateEciesKeyPairResponse): KeyPair {
    return new KeyPair(k.publicKey, k.privateKey);
  }
}
