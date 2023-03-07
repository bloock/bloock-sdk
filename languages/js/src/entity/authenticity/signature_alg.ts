export enum SignatureAlg {
  UNRECOGNIZED = -1,
  ECDSA = 0,
  ENS = 1
}

export namespace SignatureAlg {
  export function fromString(alg: string): SignatureAlg {
    switch (alg) {
      case "ES256K":
        return SignatureAlg.ECDSA;
      case "ENS":
        return SignatureAlg.ENS;
      default:
        return SignatureAlg.UNRECOGNIZED;
    }
  }
}
