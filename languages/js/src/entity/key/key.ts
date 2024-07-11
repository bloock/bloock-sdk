import * as keysEntitiesProto from "../../bridge/proto/bloock_keys_entities";
import { LocalKey } from "./local_key";
import { ManagedKey } from "./managed_key";

/**
 * Represents a key entity that can be either a LocalKey or a ManagedKey.
 */
export class Key {
  localKey?: LocalKey;
  managedKey?: ManagedKey;

  /**
   * Constructs a Key object for a given managed or local key object.
   * @param key
   */
  constructor(key: LocalKey | ManagedKey) {
    if (key instanceof LocalKey) {
      this.localKey = key;
    } else if (key instanceof ManagedKey) {
      this.managedKey = key;
    } else {
      throw new Error("invalid key provided");
    }
  }

  public toProto(): keysEntitiesProto.Key {
    let localKey: keysEntitiesProto.LocalKey | undefined;
    if (this.localKey) {
      localKey = this.localKey.toProto();
    }
    let managedKey: keysEntitiesProto.ManagedKey | undefined;
    if (this.managedKey) {
      managedKey = this.managedKey.toProto();
    }

    return keysEntitiesProto.Key.fromPartial({
      localKey: localKey,
      managedKey: managedKey
    });
  }
}
