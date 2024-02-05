import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import {
  GenerateLocalCertificateRequest,
  GenerateLocalKeyRequest,
  GenerateManagedCertificateRequest,
  GenerateManagedKeyRequest,
  ImportManagedCertificateRequest,
  LoadLocalCertificateRequest,
  LoadLocalKeyRequest,
  LoadManagedCertificateRequest,
  LoadManagedKeyRequest,
  RecoverTotpAccessControlRequest,
  SetupSecretAccessControlRequest,
  SetupTotpAccessControlRequest
} from "../bridge/proto/keys";
import { NewConfigData } from "../config/config";
import { CertificateType, KeyType, LocalCertificate } from "../entity/key";
import { LocalKey } from "../entity/key";
import { ManagedKey, ManagedKeyParams } from "../entity/key";
import { LocalCertificateParams } from "../entity/key/local_certificate_args";
import { Managed } from "../entity/key/managed";
import { ManagedCertificate } from "../entity/key/managed_certificate";
import {
  ImportCertificateParams,
  ManagedCertificateParams
} from "../entity/key/managed_certificate_params";
import { TotpAccessControlReceipt } from "../entity/key/totp_access_control_receipt";

/**
 * Provides functionality to interact with the [Bloock Keys service](https://dashboard.bloock.com/login).
 */
export class KeyClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  /**
   * Creates a new KeyClient with default configuration.
   * @param configData 
   */
  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * Generates a new local key of the specified type.
   * @param keyType 
   * @returns 
   */
  async newLocalKey(keyType: KeyType): Promise<LocalKey> {
    const request = GenerateLocalKeyRequest.fromPartial({
      configData: this.configData,
      keyType: KeyType.toProto(keyType)
    });
    return this.bridge
      .getKey()
      .GenerateLocalKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return LocalKey.fromProto(res.localKey!);
      });
  }

  /**
   * Loads a local key of the specified type from a public key string.
   * @param keyType 
   * @param key 
   * @returns 
   */
  async loadLocalKey(keyType: KeyType, key: string): Promise<LocalKey> {
    const request = LoadLocalKeyRequest.fromPartial({
      configData: this.configData,
      keyType: KeyType.toProto(keyType),
      key
    });
    return this.bridge
      .getKey()
      .LoadLocalKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return LocalKey.fromProto(res.localKey!);
      });
  }

  /**
   * Generates a new managed key with the specified parameters.
   * @param params 
   * @returns 
   */
  async newManagedKey(params: ManagedKeyParams): Promise<ManagedKey> {
    const request = GenerateManagedKeyRequest.fromPartial({
      configData: this.configData,
      params: params.toProto()
    });

    return this.bridge
      .getKey()
      .GenerateManagedKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return ManagedKey.fromProto(res.managedKey!);
      });
  }

  /**
   * Loads a managed key by its ID (ex: 51d22546-68f1-4340-b94b-2a80e60b8933).
   * @param id 
   * @returns 
   */
  async loadManagedKey(id: string): Promise<ManagedKey> {
    const request = LoadManagedKeyRequest.fromPartial({
      configData: this.configData,
      id
    });

    return this.bridge
      .getKey()
      .LoadManagedKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return ManagedKey.fromProto(res.managedKey!);
      });
  }

  /**
   * Generates a new local certificate with the specified parameters.
   * @param params 
   * @returns 
   */
  async newLocalCertificate(
    params: LocalCertificateParams
  ): Promise<LocalCertificate> {
    const request = GenerateLocalCertificateRequest.fromPartial({
      configData: this.configData,
      params: params.toProto()
    });

    return this.bridge
      .getKey()
      .GenerateLocalCertificate(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return LocalCertificate.fromProto(res.localCertificate!);
      });
  }

  /**
   * Loads a local certificate from a PKCS12 file.
   * @param pkcs12 
   * @param password 
   * @returns 
   */
  async loadLocalCertificate(
    pkcs12: Uint8Array,
    password: string
  ): Promise<LocalCertificate> {
    const request = LoadLocalCertificateRequest.fromPartial({
      configData: this.configData,
      pkcs12: pkcs12,
      password: password
    });

    return this.bridge
      .getKey()
      .LoadLocalCertificate(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return LocalCertificate.fromProto(res.localCertificate!);
      });
  }

  /**
   * Generates a new managed certificate with the specified parameters.
   * @param params 
   * @returns 
   */
  async newManagedCertificate(
    params: ManagedCertificateParams
  ): Promise<ManagedCertificate> {
    const request = GenerateManagedCertificateRequest.fromPartial({
      configData: this.configData,
      params: params.toProto()
    });

    return this.bridge
      .getKey()
      .GenerateManagedCertificate(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return ManagedCertificate.fromProto(res.managedCertificate!);
      });
  }

  /**
   * Loads a managed certificate by its ID (ex: ceef5b02-af17-43d8-ae7b-31d9bdf8027f).
   * @param id 
   * @returns 
   */
  async loadManagedCertificate(id: string): Promise<ManagedCertificate> {
    const request = LoadManagedCertificateRequest.fromPartial({
      configData: this.configData,
      id
    });

    return this.bridge
      .getKey()
      .LoadManagedCertificate(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return ManagedCertificate.fromProto(res.managedCertificate!);
      });
  }

  /**
   * Imports a managed certificate with the specified parameters, supported types: .pem, .pfx.
   * @param type 
   * @param certificate 
   * @param params 
   * @returns 
   */
  async importManagedCertificate(
    type: CertificateType,
    certificate: Uint8Array,
    params: ImportCertificateParams
  ): Promise<ManagedCertificate> {
    const request = ImportManagedCertificateRequest.fromPartial({
      configData: this.configData,
      certificate: certificate,
      certificateType: CertificateType.toProto(type),
      password: params.password
    });

    return this.bridge
      .getKey()
      .ImportManagedCertificate(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return ManagedCertificate.fromProto(res.managedCertificate!);
      });
  }

  /**
   * Sets up TOTP-based access control for the given managed key or managed certificate.
   * @param key 
   * @returns 
   */
  async setupTotpAccessControl(key: Managed): Promise<TotpAccessControlReceipt> {
    const request = SetupTotpAccessControlRequest.fromPartial({
      configData: this.configData,
      managedKey: key.managedKey?.toProto(),
      managedCertificate: key.managedCertificate?.toProto()
    });

    return this.bridge
      .getKey()
      .SetupTotpAccessControl(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return new TotpAccessControlReceipt(
          res.secret!,
          res.secretQr!,
          res.recoveryCodes!
        );
      });
  }

  /**
   * Recovers TOTP-based access control for the given managed key or managed certificate using a recovery code.
   * @param key 
   * @param code 
   * @returns 
   */
  async recoverTotpAccessControl(
    key: Managed,
    code: string
  ): Promise<TotpAccessControlReceipt> {
    const request = RecoverTotpAccessControlRequest.fromPartial({
      configData: this.configData,
      managedKey: key.managedKey?.toProto(),
      managedCertificate: key.managedCertificate?.toProto(),
      code: code
    });

    return this.bridge
      .getKey()
      .RecoverTotpAccessControl(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return new TotpAccessControlReceipt(
          res.secret!,
          res.secretQr!,
          res.recoveryCodes!
        );
      });
  }

  /**
   * Sets up secret-based access control for the given managed key or managed certificate.
   * @param key 
   * @param secret 
   * @param email 
   * @returns 
   */
  async setupSecretAccessControl(key: Managed, secret: string, email: string) {
    const request = SetupSecretAccessControlRequest.fromPartial({
      configData: this.configData,
      managedKey: key.managedKey?.toProto(),
      managedCertificate: key.managedCertificate?.toProto(),
      secret: secret,
      email: email
    });

    return this.bridge
      .getKey()
      .SetupSecretAccessControl(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
      });
  }
}
