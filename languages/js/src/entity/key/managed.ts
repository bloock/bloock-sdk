import { ManagedCertificate, ManagedKey } from "../key";

/**
 * Represents a managed entity that can be either a ManagedKey or a ManagedCertificate.
 */
export class Managed {
  managedKey?: ManagedKey;
  managedCertificate?: ManagedCertificate;

  /**
   * Constructs a Managed object for a given managed key or certificate object.
   * @param key 
   */
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
