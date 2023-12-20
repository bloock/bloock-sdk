import * as proto from "../../bridge/proto/encryption_entities";

export enum EncryptionAlg {
  AES256GCM = 0,
  AES256GCM_M = 1,
  RSA = 2,
  RSA_M = 3,
  UNRECOGNIZED = -1
}

export namespace EncryptionAlg {
  export function toProto(alg: EncryptionAlg): proto.EncryptionAlg {
    switch (alg) {
      case EncryptionAlg.AES256GCM:
        return proto.EncryptionAlg.A256GCM;
      case EncryptionAlg.AES256GCM_M:
        return proto.EncryptionAlg.A256GCM_M;
      case EncryptionAlg.RSA:
        return proto.EncryptionAlg.RSA;
      case EncryptionAlg.RSA_M:
        return proto.EncryptionAlg.RSA_M;
      default:
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
      default:
        return EncryptionAlg.UNRECOGNIZED;
    }
  }
}
