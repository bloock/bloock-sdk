import * as keysEntitiesProto from "../../bridge/proto/keys_entities";
import { AccessControlType } from "./access_control_type";
import { KeyProtectionLevel } from "./key_protection_level";
import { KeyType } from "./key_type";

/**
 * Represents a managed certificate with its details.
 */
export class ManagedCertificate {
  /**
   * Is the identifier of the managed certificate (ex: 2abae00b-f3d9-410c-abdf-1ea391d633aa).
   */
  public id: string;
  /**
   * Is the protection level for the key.
   */
  public protection: KeyProtectionLevel;
  /**
   * Is the type of the key.
   */
  public keyType: KeyType;
  /**
   * Is the timestamp indicating when the certificate expires.
   */
  public expiration?: number;
  /**
   * Is the certificate public key.
   */
  public key: string;
  /**
   * Is the access control type for the certificate.
   */
  public accessControlType: AccessControlType;

  /**
   * Constructs a ManagedCertificate object with the specified parameters.
   * @param id
   * @param protection
   * @param keyType
   * @param key
   * @param accessControlType
   * @param expiration
   */
  constructor(
    id: string,
    protection: KeyProtectionLevel,
    keyType: KeyType,
    key: string,
    accessControlType: AccessControlType,
    expiration?: number
  ) {
    this.id = id;
    this.protection = protection;
    this.keyType = keyType;
    this.key = key;
    this.accessControlType = accessControlType;
    this.expiration = expiration;
  }

  public toProto(): keysEntitiesProto.ManagedCertificate {
    return keysEntitiesProto.ManagedCertificate.fromPartial({
      id: this.id,
      protection: KeyProtectionLevel.toProto(this.protection),
      keyType: KeyType.toProto(this.keyType),
      key: this.key,
      expiration: this.expiration,
      accessControlType: AccessControlType.toProto(this.accessControlType)
    });
  }

  static fromProto(
    r: keysEntitiesProto.ManagedCertificate
  ): ManagedCertificate {
    return new ManagedCertificate(
      r.id,
      KeyProtectionLevel.fromProto(r.protection),
      KeyType.fromProto(r.keyType),
      r.key,
      AccessControlType.fromProto(r.accessControlType),
      r.expiration
    );
  }
}
