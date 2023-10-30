import { LocalKey, ManagedKey, ManagedCertificate, LocalCertificate, KeyType } from "../key";

export class SignerArgs {
  localKey?: LocalKey;
  managedKey?: ManagedKey;
  managedCertificate?: ManagedCertificate;
  localCertificate?: LocalCertificate;
  commonName?: string;

  constructor(key: LocalKey | ManagedKey | ManagedCertificate | LocalCertificate | string, commonName?: string) {
    if (key instanceof LocalKey) {
      this.localKey = key;
    } else if (key instanceof ManagedKey) {
      this.managedKey = key;
    } else if (key instanceof ManagedCertificate) {
      this.managedCertificate = key;
    } else if (key instanceof LocalCertificate) {
      this.localCertificate = key;
    } else {
      this.localKey = new LocalKey("", KeyType.Aes256, key);
    }

    this.commonName = commonName;
  }
}
