package com.bloock.sdk.entity.key;

public class SubjectCertificateParams {
  String cn;
  String c;
  String ou;
  String o;

  public SubjectCertificateParams(String cn, String c, String ou, String o) {
    this.cn = cn;
    this.c = c;
    this.ou = ou;
    this.o = o;
  }

  public String getCn() {
    return cn;
  }

  public String getC() {
    return c;
  }

  public String getOu() {
    return ou;
  }

  public String getO() {
    return o;
  }
}
