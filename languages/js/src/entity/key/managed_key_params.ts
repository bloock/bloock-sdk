import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyProtectionLevel } from "./key_protection_level";
import { KeyType } from "./key_type";

/**
 * Represents the parameters for creating a managed key.
 */
export class ManagedKeyParams {
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
   * Constructs a ManagedKeyParams object for a given managed key object.
   * @param protection 
   * @param keyType 
   * @param name 
   * @param expiration 
   */
  constructor(
    protection: KeyProtectionLevel,
    keyType: KeyType,
    name?: string,
    expiration?: number
  ) {
    this.protection = protection;
    this.keyType = keyType;
    this.name = name;
    this.expiration = expiration;
  }

  public toProto(): keysEntitiesProto.ManagedKeyParams {
    return keysEntitiesProto.ManagedKeyParams.fromPartial({
      protection: KeyProtectionLevel.toProto(this.protection),
      keyType: KeyType.toProto(this.keyType),
      name: this.name,
      expiration: this.expiration
    });
  }
}
