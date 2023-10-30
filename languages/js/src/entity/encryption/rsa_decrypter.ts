import * as proto from "../../bridge/proto/encryption_entities";
import { KeyType, LocalKey, ManagedKey } from "../key";
import { Decrypter } from "./decrypter";
import { DecrypterArgs } from "./decrypter_args";

export class RsaDecrypter implements Decrypter {
  alg: proto.EncryptionAlg;
  args: DecrypterArgs;

  constructor(key: LocalKey | ManagedKey | string) {
    this.alg = proto.EncryptionAlg.RSA;

    let encrypter_key;
    if (key instanceof LocalKey) {
      encrypter_key = key;
    } else if (key instanceof ManagedKey) {
      encrypter_key = key;
    } else {
      encrypter_key = new LocalKey("", KeyType.Rsa2048, key);
    }
    this.args = new DecrypterArgs(encrypter_key);
  }

  public toProto(): proto.Decrypter {
    return proto.Decrypter.fromPartial({
      alg: this.alg,
      localKey: this.args.localKey?.toProto(),
      managedKey: this.args.managedKey?.toProto()
    });
  }
}
