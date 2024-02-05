import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyProtectionLevel } from "./key_protection_level";
import { KeyType } from "./key_type";

/**
 * Represents a managed key.
 */
export class ManagedKey {
  /**
   * Is the unique identifier of the managed key (ex: 46c49ee7-ef44-472c-a873-ce81a2d5d764).
   */
  public id: string;
  /**
   * Is the name of the managed key.
   */
  public name?: string;
  /**
   * Is the protection level for the key.
   */
  public protection: KeyProtectionLevel;
  /**
   * Is the type of the key.
   */
  public keyType: KeyType;
  /**
   * Is the timestamp indicating when the key expires.
   */
  public expiration?: number;
  /**
   * Is the actual public key.
   */
  public key: string;

  /**
   * Constructs a ManagedKey object with the specified parameters.
   * @param id 
   * @param protection 
   * @param keyType 
   * @param key 
   * @param name 
   * @param expiration 
   */
  constructor(
    id: string,
    protection: KeyProtectionLevel,
    keyType: KeyType,
    key: string,
    name?: string,
    expiration?: number
  ) {
    this.id = id;
    this.protection = protection;
    this.keyType = keyType;
    this.key = key;
    this.name = name;
    this.expiration = expiration;
  }

  public toProto(): keysEntitiesProto.ManagedKey {
    return keysEntitiesProto.ManagedKey.fromPartial({
      id: this.id,
      protection: KeyProtectionLevel.toProto(this.protection),
      keyType: KeyType.toProto(this.keyType),
      key: this.key,
      name: this.name,
      expiration: this.expiration
    });
  }

  static fromProto(r: keysEntitiesProto.ManagedKey): ManagedKey {
    return new ManagedKey(
      r.id,
      KeyProtectionLevel.fromProto(r.protection),
      KeyType.fromProto(r.keyType),
      r.key,
      r.name,
      r.expiration
    );
  }
}
