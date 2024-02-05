/**
 * Represents a receipt for a Time-based One-Time Password (TOTP) access control.
 */
export class TotpAccessControlReceipt {
  secret: string;
  secretQr: string;
  recoveryCodes: string[];

  /**
   * Creates a new TotpAccessControlReceipt with the provided secret, secret QR code, and recovery codes.
   * @param secret 
   * @param secretQr 
   * @param recoveryCodes 
   */
  constructor(secret: string, secretQr: string, recoveryCodes: string[]) {
    this.secret = secret;
    this.secretQr = secretQr;
    this.recoveryCodes = recoveryCodes;
  }
}
