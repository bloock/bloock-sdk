import { IdentityKey as IdentityKeyProto } from "../../bridge/proto/identity_entities_v2";
import { LocalKey, ManagedKey } from "../key";
import { IdentityKey } from "./identity_key";
import { IdentityKeyArgs } from "./identity_key_args";

/**
 * Represents an identity BJJ key used.
 */
export class BjjIdentityKey implements IdentityKey {
  args: IdentityKeyArgs;

  /**
   * Creates a new BjjIdentityKey instance with the provided issuer key arguments.
   * @param key 
   */
  constructor(key: LocalKey | ManagedKey) {
    this.args = new IdentityKeyArgs(key);
  }

  public toProto(): IdentityKeyProto {
    return IdentityKeyProto.fromPartial({
      localKey: this.args.localKey?.toProto(),
      managedKey: this.args.managedKey?.toProto()
    });
  }
}
