/**
 * Represents different signature algorithms.
 */
export enum SignatureAlg {
  /**
   * Represents an unrecognized signature algorithm.
   */
  UNRECOGNIZED = -1,
  /**
   * Represents the ECDSA signature algorithm with the "ES256K" name.
   */
  ECDSA = 0,
  /**
   * Represents the ENS (Ethereum Name Service) signature algorithm.
   */
  ENS = 1,
  /**
   * Represents the BJJ signature algorithm with the "BJJ" name.
   */
  BJJ = 2
}

/**
 * Converts a string representation of an algorithm to the corresponding SignatureAlg enum.
 */
export namespace SignatureAlg {
  export function fromString(alg: string): SignatureAlg {
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
