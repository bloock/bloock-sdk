import * as keysEntitiesProto from "../../bridge/proto/keys_entities";

export enum KeyType {
  EcP256k,
  Rsa2048,
  Rsa3072,
  Rsa4096,
  Aes128,
  Aes256,
  Bjj
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
      case KeyType.Aes128:
        return keysEntitiesProto.KeyType.Aes128;
      case KeyType.Aes256:
        return keysEntitiesProto.KeyType.Aes256;
      case KeyType.Bjj:
        return keysEntitiesProto.KeyType.Bjj;
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
      case keysEntitiesProto.KeyType.Aes128:
        return KeyType.Aes128;
      case keysEntitiesProto.KeyType.Aes256:
        return KeyType.Aes256;
      case keysEntitiesProto.KeyType.Bjj:
        return KeyType.Bjj;
      default:
        return KeyType.EcP256k;
    }
  }
}
