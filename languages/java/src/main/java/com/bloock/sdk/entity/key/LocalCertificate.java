package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;
import com.google.protobuf.ByteString;

public class LocalCertificate {
  byte[] pkcs12;
  String password;

  public LocalCertificate(byte[] pkcs12, String password) {
    this.pkcs12 = pkcs12;
    this.password = password;
  }

  public static LocalCertificate fromProto(KeysEntities.LocalCertificate certificate) {
    return new LocalCertificate(certificate.getPkcs12().toByteArray(), certificate.getPassword());
  }

  public KeysEntities.LocalCertificate toProto() {
    KeysEntities.LocalCertificate.Builder builder = KeysEntities.LocalCertificate.newBuilder();

    if (this.pkcs12 != null) builder.setPkcs12(ByteString.copyFrom(this.pkcs12));
    if (this.password != null) builder.setPassword(this.password);

    return builder.build();
  }

  public byte[] getPkcs12() {
    return pkcs12;
  }

  public String getPassword() {
    return password;
  }
}
