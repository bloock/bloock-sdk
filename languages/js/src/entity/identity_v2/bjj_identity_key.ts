import { IdentityKey as IdentityKeyProto } from "../../bridge/proto/identity_entities_v2";
import { LocalKey, ManagedKey } from "../key";
import { IdentityKey } from "./identity_key";
import { IdentityKeyArgs } from "./identity_key_args";

export class BjjIdentityKey implements IdentityKey {
  args: IdentityKeyArgs;

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
