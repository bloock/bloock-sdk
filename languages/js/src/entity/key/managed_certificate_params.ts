import * as keysEntitiesProto from "../../bridge/proto/bloock_keys_entities";
import { KeyType } from "./key_type";
import { SubjectCertificateParams } from "./subject_certificate_params";

/**
 * Represents parameters for creating a managed certificate.
 */
export class ManagedCertificateParams {
  /**
   * Is the type of the key.
   */
  public keyType: KeyType;
  /**
   * Represents the subject details of the certificate.
   */
  public subject: SubjectCertificateParams;
  /**
   * Is the number of months until the certificate expiration.
   */
  public expiration: number;

  /**
   * Constructs a ManagedCertificateParams object with the specified parameters.
   * @param keyType
   * @param subject
   * @param expiration
   */
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
