import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyType } from "./key_type";
import { SubjectCertificateParams } from "./subject_certificate_params";

export class LocalCertificateParams {
  public keyType: KeyType;
  public subject: SubjectCertificateParams;
  public password: string;
  public expiration: number;

  constructor(
    keyType: KeyType,
    subject: SubjectCertificateParams,
    password: string,
    expiration: number
  ) {
    this.keyType = keyType;
    this.subject = subject;
    this.password = password;
    this.expiration = expiration;
  }

  public toProto(): keysEntitiesProto.LocalCertificateParams {
    return keysEntitiesProto.LocalCertificateParams.fromPartial({
      keyType: KeyType.toProto(this.keyType),
      subject: this.subject.toProto(),
      password: this.password,
      expiration: this.expiration
    });
  }
}
