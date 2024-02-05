import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyType } from "./key_type";

/**
 * Represents a local key with its public and private components.
 */
export class LocalKey {
  /**
   * Is the public key.
   */
  public key: string;
  /**
   * Is the private key.
   */
  public privateKey?: string;
  /**
   * Is the type of the key.
   */
  public keyType: KeyType;

  /**
   * Constructs a LocalKey object with the specified parameters.
   * @param key 
   * @param keyType 
   * @param privateKey 
   */
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
