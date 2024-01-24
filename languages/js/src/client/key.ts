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
import { TotpAccessControl } from "../entity/key/totp_access_control";

export class KeyClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

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

  async setupTotpAccessControl(key: Managed): Promise<TotpAccessControl> {
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
        return new TotpAccessControl(
          res.secret!,
          res.secretQr!,
          res.recoveryCodes!
        );
      });
  }

  async recoverTotpAccessControl(
    key: Managed,
    code: string
  ): Promise<TotpAccessControl> {
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
        return new TotpAccessControl(
          res.secret!,
          res.secretQr!,
          res.recoveryCodes!
        );
      });
  }

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
