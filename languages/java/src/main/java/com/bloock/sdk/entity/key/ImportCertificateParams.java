package com.bloock.sdk.entity.key;

public class ImportCertificateParams {
  String password;

  public ImportCertificateParams(String password) {
    this.password = password;
  }

  public ImportCertificateParams() {}

  public String getPassword() {
    return password;
  }
}
