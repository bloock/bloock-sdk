import * as keysEntitiesProto from "../../bridge/proto/bloock_keys_entities";
import { AccessControlType } from "./access_control_type";
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
   * Is the access control type for the key.
   */
  public accessControlType: AccessControlType;

  /**
   * Constructs a ManagedKey object with the specified parameters.
   * @param id
   * @param protection
   * @param keyType
   * @param key
   * @param accessControlType
   * @param name
   * @param expiration
   */
  constructor(
    id: string,
    protection: KeyProtectionLevel,
    keyType: KeyType,
    key: string,
    accessControlType: AccessControlType,
    name?: string,
    expiration?: number
  ) {
    this.id = id;
    this.protection = protection;
    this.keyType = keyType;
    this.key = key;
    this.accessControlType = accessControlType;
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
      expiration: this.expiration,
      accessControlType: AccessControlType.toProto(this.accessControlType)
    });
  }

  static fromProto(r: keysEntitiesProto.ManagedKey): ManagedKey {
    return new ManagedKey(
      r.id,
      KeyProtectionLevel.fromProto(r.protection),
      KeyType.fromProto(r.keyType),
      r.key,
      AccessControlType.fromProto(r.accessControlType),
      r.name,
      r.expiration
    );
  }
}
