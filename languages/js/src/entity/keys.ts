import * as proto from "../bridge/proto/encryption";
import * as authenticityProto from "../bridge/proto/authenticity";

export class KeyPair {
  publicKey: string;
  privateKey: string;

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}

export class EcdsaKeyPair extends KeyPair {
  static fromProto(k: authenticityProto.GenerateEcdsaKeysResponse): KeyPair {
    return new KeyPair(k.publicKey, k.privateKey);
  }
}

export class RsaKeyPair extends KeyPair {
  static fromProto(k: proto.GenerateRsaKeyPairResponse): KeyPair {
    return new KeyPair(k.publicKey, k.privateKey);
  }
}

export class EciesKeyPair extends KeyPair {
  static fromProto(k: proto.GenerateEciesKeyPairResponse): KeyPair {
    return new KeyPair(k.publicKey, k.privateKey);
  }
}
