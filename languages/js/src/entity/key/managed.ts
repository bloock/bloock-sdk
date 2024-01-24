import { ManagedCertificate, ManagedKey } from "../key";

export class Managed {
  managedKey?: ManagedKey;
  managedCertificate?: ManagedCertificate;

  constructor(key: ManagedKey | ManagedCertificate) {
    if (key instanceof ManagedKey) {
      this.managedKey = key;
    } else if (key instanceof ManagedCertificate) {
      this.managedCertificate = key;
    } else {
      throw new Error("invalid key provided");
    }
  }
}
