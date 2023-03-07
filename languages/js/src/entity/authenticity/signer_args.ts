import { LocalKey, ManagedKey } from "../key";

export class SignerArgs {
  localKey?: LocalKey;
  managedKey?: ManagedKey;
  commonName?: string;

  constructor(key: LocalKey | ManagedKey | string, commonName?: string) {
    if (key instanceof LocalKey) {
      this.localKey = key;
    } else if (key instanceof ManagedKey) {
      this.managedKey = key;
    } else {
      this.localKey = new LocalKey("", key);
    }

    this.commonName = commonName;
  }
}
