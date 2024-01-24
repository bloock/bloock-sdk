import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyType } from "./key_type";

export class LocalKey {
  public key: string;
  public privateKey?: string;
  public keyType: KeyType;

  constructor(key: string, keyType: KeyType, privateKey?: string) {
    this.key = key;
    this.privateKey = privateKey;
    this.keyType = keyType;
  }

  public toProto(): keysEntitiesProto.LocalKey {
    return keysEntitiesProto.LocalKey.fromPartial({
      key: this.key,
      privateKey: this.privateKey,
      keyType: KeyType.toProto(this.keyType)
    });
  }

  static fromProto(r: keysEntitiesProto.LocalKey): LocalKey {
    return new LocalKey(r.key, KeyType.fromProto(r.keyType), r.privateKey);
  }
}
