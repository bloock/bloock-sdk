package com.bloock.sdk.entity;

public enum SignatureAlg {
  ECDSA,
  UNRECOGNIZED;

  public static SignatureAlg fromString(String alg) {
    switch (alg) {
      case "ES256K":
        return SignatureAlg.ECDSA;
      default:
        return SignatureAlg.UNRECOGNIZED;
    }
  }
}
