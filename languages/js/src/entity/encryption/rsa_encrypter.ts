import * as proto from "../../bridge/proto/encryption_entities";
import { KeyType, LocalKey, ManagedKey } from "../key";
import { Encrypter } from "./encrypter";
import { EncrypterArgs } from "./encrypter_args";

export class RsaEncrypter implements Encrypter {
  alg: proto.EncryptionAlg;
  args: EncrypterArgs;

  constructor(key: LocalKey | ManagedKey | string) {
    this.alg = proto.EncryptionAlg.RSA;

    let encrypter_key;
    if (key instanceof LocalKey) {
      encrypter_key = key;
    } else if (key instanceof ManagedKey) {
      encrypter_key = key;
    } else {
      encrypter_key = new LocalKey(key, KeyType.Rsa2048);
    }
    this.args = new EncrypterArgs(encrypter_key);
  }

  public toProto(): proto.Encrypter {
    return proto.Encrypter.fromPartial({
      alg: this.alg,
      localKey: this.args.localKey?.toProto(),
      managedKey: this.args.managedKey?.toProto()
    });
  }
}
