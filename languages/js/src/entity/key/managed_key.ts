import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyProtectionLevel } from "./key_protection_level";
import { KeyType } from "./key_type";

export class ManagedKey {
  public id: string;
  public name?: string;
  public protection: KeyProtectionLevel;
  public keyType: KeyType;
  public expiration?: number;
  public key: string;

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
