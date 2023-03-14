import * as proto from "../../bridge/proto/authenticity_entities";
import { LocalKey, ManagedKey } from "../key";
import { Signer } from "./signer";
import { SignerArgs } from "./signer_args";

export class EnsSigner implements Signer {
  alg: proto.SignerAlg;
  args: SignerArgs;

  constructor(
    key: LocalKey | ManagedKey | string,
    options?: { commonName?: string }
  ) {
    this.alg = proto.SignerAlg.ENS;
    this.args = new SignerArgs(key, options?.commonName);
  }

  public toProto(): proto.Signer {
    return proto.Signer.fromPartial({
      alg: this.alg,
      localKey: this.args.localKey?.toProto(),
      managedKey: this.args.managedKey?.toProto()
    });
  }
}