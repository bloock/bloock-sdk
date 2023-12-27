package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

public enum HashAlg {
  Sha256,
  Keccak256,
  Poseidon,
  UNRECOGNIZED;

  public static HashAlg fromProto(AuthenticityEntities.HashAlg alg) {
    switch (alg) {
      case SHA_256:
        return HashAlg.Sha256;
      case KECCAK_256:
        return HashAlg.Keccak256;
      case POSEIDON:
        return HashAlg.Poseidon;
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
      default:
        return AuthenticityEntities.HashAlg.UNRECOGNIZED;
    }
  }
}
