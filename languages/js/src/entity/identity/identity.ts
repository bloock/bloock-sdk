import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

export class Identity {
  mnemonic: string;
  key: string;
  privateKey: string;

  constructor(mnemonic: string, key: string, privateKey: string) {
    this.mnemonic = mnemonic;
    this.key = key;
    this.privateKey = privateKey;
  }

  public toProto(): identityEntitiesProto.Identity {
    return identityEntitiesProto.Identity.fromPartial({
      mnemonic: this.mnemonic,
      key: this.key,
      privateKey: this.privateKey
    });
  }

  static fromProto(r: identityEntitiesProto.Identity): Identity {
    return new Identity(r.mnemonic, r.key, r.privateKey);
  }
}
