import * as keysEntitiesProto from "../bridge/proto/keys_entities";
import { KeyType } from "./key_type";

export enum KeyProtectionLevel {
  SOFTWARE,
  HSM
}

export namespace KeyProtectionLevel {
  export function toProto(
    type: KeyProtectionLevel
  ): keysEntitiesProto.KeyProtectionLevel {
    switch (type) {
      case KeyProtectionLevel.SOFTWARE:
        return keysEntitiesProto.KeyProtectionLevel.SOFTWARE;
      case KeyProtectionLevel.HSM:
        return keysEntitiesProto.KeyProtectionLevel.HSM;
    }
  }

  export function fromProto(
    type: keysEntitiesProto.KeyProtectionLevel | undefined
  ): KeyProtectionLevel {
    switch (type) {
      case keysEntitiesProto.KeyProtectionLevel.SOFTWARE:
        return KeyProtectionLevel.SOFTWARE;
      case keysEntitiesProto.KeyProtectionLevel.HSM:
        return KeyProtectionLevel.HSM;
      default:
        return KeyProtectionLevel.SOFTWARE;
    }
  }
}

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
}

export class ManagedKey {
  public name?: string;
  public protection: KeyProtectionLevel;
  public keyType: KeyType;
  public expiration?: number;
  public key: string;

  constructor(
    protection: KeyProtectionLevel,
    keyType: KeyType,
    key: string,
    name?: string,
    expiration?: number
  ) {
    this.protection = protection;
    this.keyType = keyType;
    this.key = key;
    this.name = name;
    this.expiration = expiration;
  }

  public toProto(): keysEntitiesProto.ManagedKey {
    return keysEntitiesProto.ManagedKey.fromPartial({
      protection: KeyProtectionLevel.toProto(this.protection),
      keyType: KeyType.toProto(this.keyType),
      key: this.key,
      name: this.name,
      expiration: this.expiration
    });
  }

  static fromProto(r: keysEntitiesProto.ManagedKey): ManagedKey {
    return new ManagedKey(
      KeyProtectionLevel.fromProto(r.protection),
      KeyType.fromProto(r.keyType),
      r.key,
      r.name,
      r.expiration
    );
  }
}
