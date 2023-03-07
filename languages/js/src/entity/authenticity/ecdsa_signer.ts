import * as proto from "../../bridge/proto/authenticity_entities";
import { LocalKey, ManagedKey } from "../key";
import { Signer } from "./signer";
import { SignerArgs } from "./signer_args";

export class EcdsaSigner implements Signer {
  alg: proto.SignerAlg;
  args: SignerArgs;

  constructor(
    key: LocalKey | ManagedKey | string,
    options?: { commonName?: string }
  ) {
    this.alg = proto.SignerAlg.ES256K;
    this.args = new SignerArgs(key, options?.commonName);
  }

  public toProto(): proto.Signer {
    return proto.Signer.fromPartial({
      alg: this.alg,
      localKey: this.args.localKey?.toProto(),
      managedKey: this.args.managedKey?.toProto(),
      commonName: this.args.commonName
    });
  }
}
