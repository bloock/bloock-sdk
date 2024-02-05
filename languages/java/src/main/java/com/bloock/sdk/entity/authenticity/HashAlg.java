package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

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

  public static HashAlg fromProto(AuthenticityEntities.HashAlg alg) {
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

  public AuthenticityEntities.HashAlg toProto() {
    switch (this) {
      case Sha256:
        return AuthenticityEntities.HashAlg.SHA_256;
      case Keccak256:
        return AuthenticityEntities.HashAlg.KECCAK_256;
      case Poseidon:
        return AuthenticityEntities.HashAlg.POSEIDON;
      case None:
        return AuthenticityEntities.HashAlg.NONE;
      default:
        return AuthenticityEntities.HashAlg.UNRECOGNIZED;
    }
  }
}
