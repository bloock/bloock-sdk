import * as keysEntitiesProto from "../bridge/proto/keys_entities";

export enum KeyType {
  EcP256k,
  Rsa2048,
  Rsa3072,
  Rsa4096
}

export namespace KeyType {
  export function toProto(type: KeyType): keysEntitiesProto.KeyType {
    switch (type) {
      case KeyType.EcP256k:
        return keysEntitiesProto.KeyType.EcP256k;
      case KeyType.Rsa2048:
        return keysEntitiesProto.KeyType.Rsa2048;
      case KeyType.Rsa3072:
        return keysEntitiesProto.KeyType.Rsa3072;
      case KeyType.Rsa4096:
        return keysEntitiesProto.KeyType.Rsa4096;
    }
  }

  export function fromProto(
    type: keysEntitiesProto.KeyType | undefined
  ): KeyType {
    switch (type) {
      case keysEntitiesProto.KeyType.Rsa2048:
        return KeyType.Rsa2048;
      case keysEntitiesProto.KeyType.Rsa3072:
        return KeyType.Rsa3072;
      case keysEntitiesProto.KeyType.Rsa4096:
        return KeyType.Rsa4096;
      default:
        return KeyType.EcP256k;
    }
  }
}
