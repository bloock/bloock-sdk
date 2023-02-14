import * as proto from "../bridge/proto/encryption_entities";

export interface Decrypter {
  alg: proto.EncryptionAlg;
  args: DecrypterArgs;
  toProto(): proto.Decrypter;
}

export class AesDecrypter implements Decrypter {
  alg: proto.EncryptionAlg;
  args: DecrypterArgs;

  constructor(password: string) {
    this.alg = proto.EncryptionAlg.A256GCM;
    this.args = new DecrypterArgs(password);
  }

  public toProto(): proto.Decrypter {
    return proto.Decrypter.fromPartial({
      alg: this.alg,
      args: this.args.toProto()
    });
  }
}

export class RsaDecrypter implements Decrypter {
  alg: proto.EncryptionAlg;
  args: DecrypterArgs;

  constructor(private_key: string) {
    this.alg = proto.EncryptionAlg.RSA;
    this.args = new DecrypterArgs(private_key);
  }

  public toProto(): proto.Decrypter {
    return proto.Decrypter.fromPartial({
      alg: this.alg,
      args: this.args.toProto()
    });
  }
}

export class EciesDecrypter implements Decrypter {
  alg: proto.EncryptionAlg;
  args: DecrypterArgs;

  constructor(private_key: string) {
    this.alg = proto.EncryptionAlg.ECIES;
    this.args = new DecrypterArgs(private_key);
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
    return proto.DecrypterArgs.fromPartial({ key: this.password });
  }
}
