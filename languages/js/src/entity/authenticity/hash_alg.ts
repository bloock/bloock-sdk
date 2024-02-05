import * as proto from "../../bridge/proto/authenticity_entities";

/**
 * Represents different hash algorithms.
 */
export enum HashAlg {
  /**
   * Represents an unrecognized hash algorithm.
   */
  UNRECOGNIZED = -1,
  /**
   * Represents the SHA-256 hash algorithm.
   */
  Sha256 = 0,
  /**
   * Represents the Keccak-256 hash algorithm.
   */
  Keccak256 = 1,
  /**
   * Represents the Poseidon hash algorithm.
   */
  Poseidon = 2,
  /**
   * Represents no hash algorithm.
   */
  None = 3
}

export namespace HashAlg {
  export function fromProto(alg: proto.HashAlg): HashAlg {
    switch (alg) {
      case proto.HashAlg.SHA_256:
        return HashAlg.Sha256;
      case proto.HashAlg.KECCAK_256:
        return HashAlg.Keccak256;
      case proto.HashAlg.POSEIDON:
        return HashAlg.Poseidon;
      case proto.HashAlg.NONE:
        return HashAlg.None;
      default:
        return HashAlg.UNRECOGNIZED;
    }
  }

  export function toProto(alg: HashAlg): proto.HashAlg {
    switch (alg) {
      case HashAlg.Sha256:
        return proto.HashAlg.SHA_256;
      case HashAlg.Keccak256:
        return proto.HashAlg.KECCAK_256;
      case HashAlg.Poseidon:
        return proto.HashAlg.POSEIDON;
      case HashAlg.None:
        return proto.HashAlg.NONE;
      default:
        return proto.HashAlg.UNRECOGNIZED;
    }
  }
}
