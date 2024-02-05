package com.bloock.sdk.entity.key;

/**
 * Represents the parameters for importing a certificate.
 */
public class ImportCertificateParams {
  String password;

  /**
   * Constructs a new ImportCertificateParams object with the specified password.
   * @param password
   */
  public ImportCertificateParams(String password) {
    this.password = password;
  }

  /**
   * Constructs a new ImportCertificateParams object with no specified password.
   */
  public ImportCertificateParams() {}

  /**
   * Gets the password associated with the certificate.
   * @return
   */
  public String getPassword() {
    return password;
  }
}
