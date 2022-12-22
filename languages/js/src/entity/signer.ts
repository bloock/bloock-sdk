import * as proto from "../bridge/proto/record";

export interface Signer {
  alg: proto.SignerAlg;
  args: SignerArgs;
  toProto(): proto.Signer;
}

export class EcsdaSigner implements Signer {
  alg: proto.SignerAlg;
  args: SignerArgs;

  constructor(privateKey: string, options?: { commonName?: string }) {
    this.alg = proto.SignerAlg.ES256K;
    this.args = new SignerArgs(privateKey, options?.commonName);
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
  commonName: string | undefined;

  constructor(privateKey: string, commonName?: string) {
    this.privateKey = privateKey;
    this.commonName = commonName;
  }

  public toProto(): proto.SignerArgs {
    return proto.SignerArgs.fromPartial({ privateKey: this.privateKey });
  }
}
