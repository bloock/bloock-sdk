import * as proto from "../../bridge/proto/authenticity_entities";
import { LocalCertificate, LocalKey, ManagedCertificate, ManagedKey } from "../key";
import { SignerArgs } from "./signer_args";

export class Signer {
  args: SignerArgs;

  constructor(
    key: LocalKey | ManagedKey | ManagedCertificate | LocalCertificate | string,
    options?: { commonName?: string }
  ) {
    this.args = new SignerArgs(key, options?.commonName);
  }

  public toProto(): proto.Signer {
    return proto.Signer.fromPartial({
      localKey: this.args.localKey?.toProto(),
      managedKey: this.args.managedKey?.toProto(),
      managedCertificate: this.args.managedCertificate?.toProto(),
      localCertificate: this.args.localCertificate?.toProto(),
      commonName: this.args.commonName
    });
  }
}
