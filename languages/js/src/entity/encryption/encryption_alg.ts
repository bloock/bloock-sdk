import * as proto from "../../bridge/proto/encryption_entities";

/**
 * Represents encryption algorithm types.
 */
export enum EncryptionAlg {
  /**
   * Represents the AES-256-GCM encryption algorithm.
   */
  AES256GCM = 0,
  /**
   * Represents the AES-256-GCM with managed key encryption algorithm.
   */
  AES256GCM_M = 1,
  /**
   * Represents the RSA encryption algorithm.
   */
  RSA = 2,
  /**
   * Represents the RSA with managed key encryption algorithm.
   */
  RSA_M = 3,
  /**
   * Represents an unrecognized encryption algorithm.
   */
  UNRECOGNIZED = -1
}

export namespace EncryptionAlg {
  export function toProto(alg: EncryptionAlg): proto.EncryptionAlg {
    switch (alg) {
      case EncryptionAlg.AES256GCM:
        return proto.EncryptionAlg.A256GCM;
      case EncryptionAlg.AES256GCM_M:
        return proto.EncryptionAlg.A256GCM_M;
      case EncryptionAlg.RSA:
        return proto.EncryptionAlg.RSA;
      case EncryptionAlg.RSA_M:
        return proto.EncryptionAlg.RSA_M;
      default:
        return proto.EncryptionAlg.UNRECOGNIZED;
    }
  }

  export function fromProto(
    alg: proto.EncryptionAlg | undefined
  ): EncryptionAlg {
    switch (alg) {
      case proto.EncryptionAlg.A256GCM:
        return EncryptionAlg.AES256GCM;
      case proto.EncryptionAlg.RSA:
        return EncryptionAlg.RSA;
      default:
        return EncryptionAlg.UNRECOGNIZED;
    }
  }
}
