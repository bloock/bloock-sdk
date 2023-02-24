import * as keysEntitiesProto from "../bridge/proto/keys_entities";

export class LocalKey {
  public key: string;
  public privateKey?: string;

  constructor(key: string, privateKey?: string) {
    this.key = key;
    this.privateKey = privateKey;
  }

  public toProto(): keysEntitiesProto.LocalKey {
    return keysEntitiesProto.LocalKey.fromPartial({
      key: this.key,
      privateKey: this.privateKey
    });
  }

  static fromProto(r: keysEntitiesProto.LocalKey): LocalKey {
    return new LocalKey(r.key, r.privateKey);
  }
}
