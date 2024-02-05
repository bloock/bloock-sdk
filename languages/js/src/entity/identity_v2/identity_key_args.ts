import { LocalKey, ManagedKey } from "../key";

/**
 * Represents arguments for configuring an issuer key.
 */
export class IdentityKeyArgs {
  localKey?: LocalKey;
  managedKey?: ManagedKey;

  /**
   * Constructs an IdentityKeyArgs object with a local or managed key.
   * @param key 
   */
  constructor(key: LocalKey | ManagedKey) {
    if (key instanceof LocalKey) {
      this.localKey = key;
    } else if (key instanceof ManagedKey) {
      this.managedKey = key;
    }
  }
}
