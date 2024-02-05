import * as proto from "../../bridge/proto/record_entities";
import { Proof } from "../integrity";
import { Signature } from "../authenticity";

/**
 * Represents details related to the integrity of a record, including hash and proof.
 */
export class IntegrityDetails {
  hash: string;
  proof?: Proof;

  /**
   * Constructs a IntegrityDetails object with the specified parameters.
   * @param hash 
   * @param proof 
   */
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

/**
 * Represents details related to the authenticity of a record, including signatures.
 */
export class AuthenticityDetails {
  signatures: Signature[];

  /**
   * Constructs a AuthenticityDetails object with the specified parameters.
   * @param signatures 
   */
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

/**
 * Represents details related to the encryption of a record, including algorithm, key, and subject.
 */
export class EncryptionDetails {
  alg?: string;
  key?: string;
  subject?: string;

  /**
   * Constructs a EncryptionDetails object with the specified parameters.
   * @param alg 
   * @param key 
   * @param subject 
   */
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

/**
 * Represents details related to the availability of a record, including content type and size.
 */
export class AvailabilityDetails {
  contentType?: string;
  size: number;

  /**
   * Constructs a AvailabilityDetails object with the specified parameters.
   * @param size 
   * @param contentType 
   */
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

/**
 * Represents all details related to a record, including integrity, authenticity, encryption, and availability details.
 */
export class RecordDetails {
  integrity?: IntegrityDetails;
  authenticity?: AuthenticityDetails;
  encryption?: EncryptionDetails;
  availability?: AvailabilityDetails;

  /**
   * Constructs a RecordDetails object with the specified parameters.
   * @param integrity 
   * @param authenticity 
   * @param encryption 
   * @param availability 
   */
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
