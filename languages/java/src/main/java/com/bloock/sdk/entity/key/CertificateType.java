package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents the type of certificate.
 */
public enum CertificateType {
  PEM,
  PFX,
  UNRECOGNIZED;

  public static CertificateType fromProto(BloockKeysEntities.CertificateType type) {
    switch (type) {
      case PEM:
        return CertificateType.PEM;
      case PFX:
        return CertificateType.PFX;
      default:
        return CertificateType.UNRECOGNIZED;
    }
  }

  public BloockKeysEntities.CertificateType toProto() {
    switch (this) {
      case PEM:
        return BloockKeysEntities.CertificateType.PEM;
      case PFX:
        return BloockKeysEntities.CertificateType.PFX;
      default:
        return BloockKeysEntities.CertificateType.UNRECOGNIZED;
    }
  }
}
