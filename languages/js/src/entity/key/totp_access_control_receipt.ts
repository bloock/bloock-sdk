export class TotpAccessControlReceipt {
  secret: string;
  secretQr: string;
  recoveryCodes: string[];

  constructor(secret: string, secretQr: string, recoveryCodes: string[]) {
    this.secret = secret;
    this.secretQr = secretQr;
    this.recoveryCodes = recoveryCodes;
  }
}
