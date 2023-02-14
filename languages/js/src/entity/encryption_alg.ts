import * as proto from "../bridge/proto/encryption_entities";

export enum EncryptionAlg {
  AES256GCM = 0,
  RSA = 1,
  ECIES = 2,
  UNRECOGNIZED = -1
}

export namespace EncryptionAlg {
  export function toProto(alg: EncryptionAlg): proto.EncryptionAlg {
    switch (alg) {
      case EncryptionAlg.AES256GCM:
        return proto.EncryptionAlg.A256GCM;
      case EncryptionAlg.RSA:
        return proto.EncryptionAlg.RSA;
      case EncryptionAlg.ECIES:
        return proto.EncryptionAlg.ECIES;
      case EncryptionAlg.UNRECOGNIZED:
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
      case proto.EncryptionAlg.ECIES:
        return EncryptionAlg.ECIES;
      case proto.EncryptionAlg.UNRECOGNIZED:
      case undefined:
        return EncryptionAlg.UNRECOGNIZED;
    }
  }
}
