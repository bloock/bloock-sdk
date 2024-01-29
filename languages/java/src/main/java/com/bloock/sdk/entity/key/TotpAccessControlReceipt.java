package com.bloock.sdk.entity.key;

import java.util.List;

public class TotpAccessControlReceipt {
  String secret;
  String secretQr;
  List<String> recoveryCodes;

  public TotpAccessControlReceipt(String secret, String secretQr, List<String> recoveryCodes) {
    this.secret = secret;
    this.secretQr = secretQr;
    this.recoveryCodes = recoveryCodes;
  }

  public String getSecret() {
    return secret;
  }

  public String getSecretQr() {
    return secretQr;
  }

  public List<String> getRecoveryCodes() {
    return recoveryCodes;
  }
}
