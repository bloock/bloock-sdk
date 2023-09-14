import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyProtectionLevel } from "./key_protection_level";
import { KeyType } from "./key_type";

export class ManagedCertificate {
  public id: string;
  public protection: KeyProtectionLevel;
  public keyType: KeyType;
  public expiration?: number;
  public key: string;

  constructor(
    id: string,
    protection: KeyProtectionLevel,
    keyType: KeyType,
    key: string,
    expiration?: number
  ) {
    this.id = id;
    this.protection = protection;
    this.keyType = keyType;
    this.key = key;
    this.expiration = expiration;
  }

  public toProto(): keysEntitiesProto.ManagedCertificate {
    return keysEntitiesProto.ManagedCertificate.fromPartial({
      id: this.id,
      protection: KeyProtectionLevel.toProto(this.protection),
      keyType: KeyType.toProto(this.keyType),
      key: this.key,
      expiration: this.expiration
    });
  }

  static fromProto(r: keysEntitiesProto.ManagedCertificate): ManagedCertificate {
    return new ManagedCertificate(
      r.id,
      KeyProtectionLevel.fromProto(r.protection),
      KeyType.fromProto(r.keyType),
      r.key,
      r.expiration
    );
  }
}