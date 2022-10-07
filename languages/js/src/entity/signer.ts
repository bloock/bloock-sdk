import * as proto from "../bridge/proto/record";

export interface Signer {
  alg: proto.SignerAlg;
  args: SignerArgs;
}

export class EcsdaSigner implements Signer {
  alg: proto.SignerAlg;
  args: SignerArgs;

  constructor(privateKey: string) {
    this.alg = proto.SignerAlg.ES256K;
    this.args = new SignerArgs(privateKey);
  }

  public toProto(): proto.Signer {
    return proto.Signer.fromPartial({
      alg: this.alg,
      args: this.args.toProto()
    });
  }
}

export class SignerArgs {
  privateKey: string;
  constructor(privateKey: string) {
    this.privateKey = privateKey;
  }

  public toProto(): proto.SignerArgs {
    return proto.SignerArgs.fromPartial({ privateKey: this.privateKey });
  }
}
