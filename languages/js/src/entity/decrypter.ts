import * as proto from "../bridge/proto/record";

export interface Decrypter {
  alg: proto.EncryptionAlg;
  args: DecrypterArgs;
  toProto(): proto.Decrypter;
}

export class AesDecrypter implements Decrypter {
  alg: proto.EncryptionAlg;
  args: DecrypterArgs;

  constructor(privateKey: string) {
    this.alg = proto.EncryptionAlg.A256GCM;
    this.args = new DecrypterArgs(privateKey);
  }

  public toProto(): proto.Decrypter {
    return proto.Decrypter.fromPartial({
      alg: this.alg,
      args: this.args.toProto()
    });
  }
}

export class DecrypterArgs {
  password: string;
  constructor(password: string) {
    this.password = password;
  }

  public toProto(): proto.DecrypterArgs {
    return proto.DecrypterArgs.fromPartial({ password: this.password });
  }
}
