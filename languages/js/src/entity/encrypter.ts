import * as proto from "../bridge/proto/record";

export interface Encrypter {
  alg: proto.EncryptionAlg;
  args: EncrypterArgs;
  toProto(): proto.Encrypter;
}

export class AesEncrypter implements Encrypter {
  alg: proto.EncryptionAlg;
  args: EncrypterArgs;

  constructor(password: string) {
    this.alg = proto.EncryptionAlg.A256GCM;
    this.args = new EncrypterArgs(password);
  }

  public toProto(): proto.Encrypter {
    return proto.Encrypter.fromPartial({
      alg: this.alg,
      args: this.args.toProto()
    });
  }
}

export class RsaEncrypter implements Encrypter {
  alg: proto.EncryptionAlg;
  args: EncrypterArgs;

  constructor(password: string) {
    this.alg = proto.EncryptionAlg.RSA;
    this.args = new EncrypterArgs(password);
  }

  public toProto(): proto.Encrypter {
    return proto.Encrypter.fromPartial({
      alg: this.alg,
      args: this.args.toProto()
    });
  }
}

export class EncrypterArgs {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  public toProto(): proto.EncrypterArgs {
    return proto.EncrypterArgs.fromPartial({ key: this.key });
  }
}
