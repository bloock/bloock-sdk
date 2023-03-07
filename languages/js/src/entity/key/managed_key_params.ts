import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyProtectionLevel } from "./key_protection_level";
import { KeyType } from "./key_type";

export class ManagedKeyParams {
  public name?: string;
  public protection: KeyProtectionLevel;
  public keyType: KeyType;
  public expiration?: number;

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
