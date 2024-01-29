import * as keysEntitiesProto from "../../bridge/proto/keys_entities";

export class LocalCertificate {
  public pkcs12: Uint8Array;
  public password: string;

  constructor(pkcs12: Uint8Array, password: string) {
    this.pkcs12 = pkcs12;
    this.password = password;
  }

  public toProto(): keysEntitiesProto.LocalCertificate {
    return keysEntitiesProto.LocalCertificate.fromPartial({
      pkcs12: this.pkcs12,
      password: this.password
    });
  }

  static fromProto(r: keysEntitiesProto.LocalCertificate): LocalCertificate {
    return new LocalCertificate(r.pkcs12, r.password);
  }
}
