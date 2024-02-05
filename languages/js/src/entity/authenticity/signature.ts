import * as proto from "../../bridge/proto/authenticity_entities";
import { SignatureAlg } from "./signature_alg";

/**
 * Represents a cryptographic signature along with additional metadata.
 */
export class Signature {
  /**
   * Is the cryptographic signature.
   */
  signature: string;
  /**
   * Is the algorithm used for the signature.
   */
  alg: string;
  /**
   * Is the key identifier associated with the signature. (public key or key ID).
   */
  kid: string;
  /**
   * Is the hash of the message that was signed.
   */
  messageHash: string;
  /**
   * Is an optional field representing the subject of the signature.
   */
  subject?: string;

  /**
   * Constructs a Signature object with the specified parameters.
   * @param messageHash 
   * @param signature 
   * @param alg 
   * @param kid 
   * @param subject 
   */
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

  /**
   * Returns the SignatureAlg based on the algorithm specified in the Alg field.
   * @returns 
   */
  getAlg(): SignatureAlg {
    return SignatureAlg.fromString(this.alg);
  }
}
