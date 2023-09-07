import { IssuerKey as IssuerKeyProto } from "../../bridge/proto/identity_entities_v2";
import { LocalKey, ManagedKey } from "../key";
import { IssuerKey } from "./issuer_key";
import { IssuerKeyArgs } from "./issuer_key_args";

export class BjjIssuerKey implements IssuerKey {
  args: IssuerKeyArgs;

  constructor(key: LocalKey | ManagedKey | string) {
    this.args = new IssuerKeyArgs(key);
  }

  public toProto(): IssuerKeyProto {
    return IssuerKeyProto.fromPartial({
      localKey: this.args.localKey?.toProto(),
      managedKey: this.args.managedKey?.toProto()
    });
  }
}
