package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.BloockAuthenticityEntities;

/**
 * Represents different hash algorithms.
 */
public enum HashAlg {
  /**
   * Represents the SHA-256 hash algorithm.
   */
  Sha256,
  /**
   * Represents the Keccak-256 hash algorithm.
   */
  Keccak256,
  /**
   * Represents the Poseidon hash algorithm.
   */
  Poseidon,
  /**
   * Represents no hash algorithm.
   */
  None,
  /**
   * Represents an unrecognized hash algorithm.
   */
  UNRECOGNIZED;

  public static HashAlg fromProto(BloockAuthenticityEntities.HashAlg alg) {
    switch (alg) {
      case SHA_256:
        return HashAlg.Sha256;
      case KECCAK_256:
        return HashAlg.Keccak256;
      case POSEIDON:
        return HashAlg.Poseidon;
      case NONE:
        return HashAlg.None;
      default:
        return HashAlg.UNRECOGNIZED;
    }
  }

  public BloockAuthenticityEntities.HashAlg toProto() {
    switch (this) {
      case Sha256:
        return BloockAuthenticityEntities.HashAlg.SHA_256;
      case Keccak256:
        return BloockAuthenticityEntities.HashAlg.KECCAK_256;
      case Poseidon:
        return BloockAuthenticityEntities.HashAlg.POSEIDON;
      case None:
        return BloockAuthenticityEntities.HashAlg.NONE;
      default:
        return BloockAuthenticityEntities.HashAlg.UNRECOGNIZED;
    }
  }
}
