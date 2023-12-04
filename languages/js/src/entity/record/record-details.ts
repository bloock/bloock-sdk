import * as proto from "../../bridge/proto/record_entities";
import { Proof } from "../integrity";
import { Signature } from "../authenticity";
import { EncryptionAlg } from "../../bridge/proto/encryption_entities";

export class IntegrityDetails {
  hash: string;
  proof?: Proof;

  constructor(hash: string, proof?: Proof) {
    this.hash = hash;
    this.proof = proof;
  }

  static fromProto(r: proto.IntegrityDetails) {
    return new IntegrityDetails(
      r.hash,
      r.proof ? Proof.fromProto(r.proof) : undefined
    );
  }

  toProto(): proto.IntegrityDetails {
    return proto.IntegrityDetails.fromPartial({
      hash: this.hash,
      proof: this.proof?.toProto()
    });
  }
}

export class AuthenticityDetails {
  signatures: Signature[];

  constructor(signatures: Signature[]) {
    this.signatures = signatures;
  }

  static fromProto(r: proto.AuthenticityDetails) {
    return new AuthenticityDetails(
      r.signatures.map(s => Signature.fromProto(s))
    );
  }

  toProto(): proto.AuthenticityDetails {
    return proto.AuthenticityDetails.fromPartial({
      signatures: this.signatures.map(s => s.toProto())
    });
  }
}

export class EncryptionDetails {
  alg?: string;
  key?: string;
  subject?: string;

  constructor(alg?: string, key?: string, subject?: string) {
    this.alg = alg;
    this.key = key;
    this.subject = subject;
  }

  static fromProto(r: proto.EncryptionDetails) {
    return new EncryptionDetails(r.alg, r.key, r.subject);
  }

  toProto(): proto.EncryptionDetails {
    return proto.EncryptionDetails.fromPartial({
      alg: this.alg,
      key: this.key,
      subject: this.subject
    });
  }
}

export class AvailabilityDetails {
  contentType?: string;
  size: number;

  constructor(size: number, contentType?: string) {
    this.size = size;
    this.contentType = contentType;
  }

  static fromProto(r: proto.AvailabilityDetails) {
    return new AvailabilityDetails(r.size, r.type);
  }

  toProto(): proto.AvailabilityDetails {
    return proto.AvailabilityDetails.fromPartial({
      type: this.contentType,
      size: this.size
    });
  }
}

export class RecordDetails {
  integrity?: IntegrityDetails;
  authenticity?: AuthenticityDetails;
  encryption?: EncryptionDetails;
  availability?: AvailabilityDetails;

  constructor(
    integrity?: IntegrityDetails,
    authenticity?: AuthenticityDetails,
    encryption?: EncryptionDetails,
    availability?: AvailabilityDetails
  ) {
    this.integrity = integrity;
    this.authenticity = authenticity;
    this.encryption = encryption;
    this.availability = availability;
  }

  static fromProto(r: proto.RecordDetails) {
    return new RecordDetails(
      r.integrity ? IntegrityDetails.fromProto(r.integrity) : undefined,
      r.authenticity
        ? AuthenticityDetails.fromProto(r.authenticity)
        : undefined,
      r.encryption ? EncryptionDetails.fromProto(r.encryption) : undefined,
      r.availability ? AvailabilityDetails.fromProto(r.availability) : undefined
    );
  }

  toProto(): proto.RecordDetails {
    return proto.RecordDetails.fromPartial({
      integrity: this.integrity?.toProto(),
      authenticity: this.authenticity?.toProto(),
      encryption: this.encryption?.toProto(),
      availability: this.availability?.toProto()
    });
  }
}
