import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import {
  GenerateLocalKeyRequest,
  GenerateManagedCertificateRequest,
  GenerateManagedKeyRequest,
  ImportManagedCertificateRequest,
  LoadLocalKeyRequest,
  LoadManagedCertificateRequest,
  LoadManagedKeyRequest
} from "../bridge/proto/keys";
import { NewConfigData } from "../config/config";
import { CertificateType, KeyType } from "../entity/key";
import { LocalKey } from "../entity/key";
import { ManagedKey, ManagedKeyParams } from "../entity/key";
import { ManagedCertificate } from "../entity/key/managed_certificate";
import { ImportCertificateParams, ManagedCertificateParams } from "../entity/key/managed_certificate_params";

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

  async loadLocalKey(
    keyType: KeyType,
    key: string,
    privateKey?: string
  ): Promise<LocalKey> {
    const request = LoadLocalKeyRequest.fromPartial({
      configData: this.configData,
      keyType: KeyType.toProto(keyType),
      key,
      privateKey
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

  async newManagedCertificate(params: ManagedCertificateParams): Promise<ManagedCertificate> {
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

  async importManagedCertificate(type: CertificateType, certificate: Uint8Array, params: ImportCertificateParams): Promise<ManagedCertificate> {
    const request = ImportManagedCertificateRequest.fromPartial({
      configData: this.configData,
      certificate: certificate,
      certificateType: CertificateType.toProto(type),
      password: params.password,
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
}
