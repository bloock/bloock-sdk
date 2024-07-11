package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;
import com.google.protobuf.ByteString;

/**
 * Represents a local certificate along with its password.
 */
public class LocalCertificate {
  byte[] pkcs12;
  String password;

  /**
   * Constructs a LocalCertificate object with the specified parameters.
   * 
   * @param pkcs12
   * @param password
   */
  public LocalCertificate(byte[] pkcs12, String password) {
    this.pkcs12 = pkcs12;
    this.password = password;
  }

  public static LocalCertificate fromProto(BloockKeysEntities.LocalCertificate certificate) {
    return new LocalCertificate(certificate.getPkcs12().toByteArray(), certificate.getPassword());
  }

  public BloockKeysEntities.LocalCertificate toProto() {
    BloockKeysEntities.LocalCertificate.Builder builder = BloockKeysEntities.LocalCertificate.newBuilder();

    if (this.pkcs12 != null)
      builder.setPkcs12(ByteString.copyFrom(this.pkcs12));
    if (this.password != null)
      builder.setPassword(this.password);

    return builder.build();
  }

  /**
   * Gets the pkcs12 of the local certificate.
   * 
   * @return
   */
  public byte[] getPkcs12() {
    return pkcs12;
  }

  /**
   * Gets the password of the local certificate.
   * 
   * @return
   */
  public String getPassword() {
    return password;
  }
}
