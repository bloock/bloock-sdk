package com.bloock.sdk.entity.authenticity;

/**
 * Represents different signature algorithms.
 */
public enum SignatureAlg {
  /**
   * Represents the ECDSA signature algorithm with the "ES256K" name.
   */
  ECDSA,
  /**
   * Represents the ENS (Ethereum Name Service) signature algorithm.
   */
  ENS,
  /**
   * Represents the BJJ signature algorithm with the "BJJ" name.
   */
  BJJ,
  /**
   * Represents an unrecognized signature algorithm.
   */
  UNRECOGNIZED;

  /**
   * Converts a string representation of an algorithm to the corresponding SignatureAlg enum.
   * @param alg
   * @return
   */
  public static SignatureAlg fromString(String alg) {
    switch (alg) {
      case "ES256K":
        return SignatureAlg.ECDSA;
      case "ENS":
        return SignatureAlg.ENS;
      case "BJJ":
        return SignatureAlg.BJJ;
      default:
        return SignatureAlg.UNRECOGNIZED;
    }
  }
}
