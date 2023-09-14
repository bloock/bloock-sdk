package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public enum CertificateType {
  PEM,
  PFX,
  UNRECOGNIZED;

  public static CertificateType fromProto(KeysEntities.CertificateType type) {
    switch (type) {
      case PEM:
        return CertificateType.PEM;
      case PFX:
        return CertificateType.PFX;
      default:
        return CertificateType.UNRECOGNIZED;
    }
  }

  public KeysEntities.CertificateType toProto() {
    switch (this) {
      case PEM:
        return KeysEntities.CertificateType.PEM;
      case PFX:
        return KeysEntities.CertificateType.PFX;
      default:
        return KeysEntities.CertificateType.UNRECOGNIZED;
    }
  }
}
