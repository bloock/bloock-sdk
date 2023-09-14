import { LocalKey, ManagedKey, ManagedCertificate } from "../key";

export class SignerArgs {
  localKey?: LocalKey;
  managedKey?: ManagedKey;
  managedCertificate?: ManagedCertificate;
  commonName?: string;

  constructor(key: LocalKey | ManagedKey | ManagedCertificate | string, commonName?: string) {
    if (key instanceof LocalKey) {
      this.localKey = key;
    } else if (key instanceof ManagedKey) {
      this.managedKey = key;
    } else if (key instanceof ManagedCertificate) {
      this.managedCertificate = key;
    } else {
      this.localKey = new LocalKey("", key);
    }

    this.commonName = commonName;
  }
}
