import * as proto from "../../bridge/proto/authenticity_entities";

export enum HashAlg {
  UNRECOGNIZED = -1,
  Sha256 = 0,
  Keccak256 = 1,
  Poseidon = 2
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
      default:
        return proto.HashAlg.UNRECOGNIZED;
    }
  }
}
