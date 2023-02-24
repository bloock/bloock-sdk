import * as keyProto from "../bridge/proto/keys";

export class KeyPair {
  publicKey: string;
  privateKey: string;

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}

export class EcdsaKeyPair extends KeyPair {
  static fromProto(k: keyProto.GenerateLocalKeyResponse): KeyPair {
    return new KeyPair(k.localKey!.key, k.localKey!.privateKey!);
  }
}

export class RsaKeyPair extends KeyPair {
  static fromProto(k: keyProto.GenerateLocalKeyResponse): KeyPair {
    return new KeyPair(k.localKey!.key, k.localKey!.privateKey!);
  }
}

export class EciesKeyPair extends KeyPair {
  static fromProto(k: keyProto.GenerateLocalKeyResponse): KeyPair {
    return new KeyPair(k.localKey!.key, k.localKey!.privateKey!);
  }
}
