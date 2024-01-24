import * as keysEntitiesProto from "../../bridge/proto/keys_entities";

export enum CertificateType {
  PEM,
  PFX
}

export namespace CertificateType {
  export function toProto(
    type: CertificateType
  ): keysEntitiesProto.CertificateType {
    switch (type) {
      case CertificateType.PEM:
        return keysEntitiesProto.CertificateType.PEM;
      case CertificateType.PFX:
        return keysEntitiesProto.CertificateType.PFX;
    }
  }

  export function fromProto(
    type: keysEntitiesProto.CertificateType | undefined
  ): CertificateType {
    switch (type) {
      case keysEntitiesProto.CertificateType.PEM:
        return CertificateType.PEM;
      case keysEntitiesProto.CertificateType.PFX:
        return CertificateType.PFX;
      default:
        return CertificateType.PEM;
    }
  }
}
