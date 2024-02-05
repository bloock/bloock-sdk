package com.bloock.sdk.entity.key;

import java.util.List;

/**
 * Represents a receipt for a Time-based One-Time Password (TOTP) access control.
 */
public class TotpAccessControlReceipt {
  String secret;
  String secretQr;
  List<String> recoveryCodes;

  /**
   * Creates a new TotpAccessControlReceipt with the provided secret, secret QR code, and recovery codes.
   * @param secret
   * @param secretQr
   * @param recoveryCodes
   */
  public TotpAccessControlReceipt(String secret, String secretQr, List<String> recoveryCodes) {
    this.secret = secret;
    this.secretQr = secretQr;
    this.recoveryCodes = recoveryCodes;
  }

  /**
   * Gets the secret of the totp access control receipt.
   * @return
   */
  public String getSecret() {
    return secret;
  }

  /**
   * Gets the secret qr of the totp access control receipt.
   * @return
   */
  public String getSecretQr() {
    return secretQr;
  }

  /**
   * Gets the recovery codes of the totp access control receipt.
   * @return
   */
  public List<String> getRecoveryCodes() {
    return recoveryCodes;
  }
}
