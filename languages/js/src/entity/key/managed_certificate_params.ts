import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { KeyType } from "./key_type";
import { SubjectCertificateParams } from "./subject_certificate_params";

export class ManagedCertificateParams {
  public keyType: KeyType;
  public subject: SubjectCertificateParams;
  public expiration: number;

  constructor(
    keyType: KeyType,
    subject: SubjectCertificateParams,
    expiration: number
  ) {
    this.keyType = keyType;
    this.subject = subject;
    this.expiration = expiration;
  }

  public toProto(): keysEntitiesProto.ManagedCertificateParams {
    return keysEntitiesProto.ManagedCertificateParams.fromPartial({
      keyType: KeyType.toProto(this.keyType),
      subject: this.subject.toProto(),
      expiration: this.expiration
    });
  }
}

export class ImportCertificateParams {
  public password?: string;

  constructor(password?: string) {
    this.password = password;
  }
}
