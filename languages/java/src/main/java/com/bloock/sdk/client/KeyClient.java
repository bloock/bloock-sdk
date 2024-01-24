package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Keys;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.key.*;
import com.google.protobuf.ByteString;

public class KeyClient {
  private final Bridge bridge;
  private final ConfigData configData;

  public KeyClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  public KeyClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  public LocalKey newLocalKey(KeyType keyType) throws Exception {
    Keys.GenerateLocalKeyRequest request =
        Keys.GenerateLocalKeyRequest.newBuilder()
            .setConfigData(this.configData)
            .setKeyType(keyType.toProto())
            .build();

    Keys.GenerateLocalKeyResponse response = bridge.getKey().generateLocalKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return LocalKey.fromProto(response.getLocalKey());
  }

  public LocalKey loadLocalKey(KeyType keyType, String key) throws Exception {
    Keys.LoadLocalKeyRequest request =
        Keys.LoadLocalKeyRequest.newBuilder()
            .setConfigData(this.configData)
            .setKeyType(keyType.toProto())
            .setKey(key)
            .build();

    Keys.LoadLocalKeyResponse response = bridge.getKey().loadLocalKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return LocalKey.fromProto(response.getLocalKey());
  }

  public ManagedKey newManagedKey(ManagedKeyParams params) throws Exception {
    Keys.GenerateManagedKeyRequest request =
        Keys.GenerateManagedKeyRequest.newBuilder()
            .setConfigData(this.configData)
            .setParams(params.toProto())
            .build();

    Keys.GenerateManagedKeyResponse response = bridge.getKey().generateManagedKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedKey.fromProto(response.getManagedKey());
  }

  public ManagedKey loadManagedKey(String id) throws Exception {
    Keys.LoadManagedKeyRequest request =
        Keys.LoadManagedKeyRequest.newBuilder().setConfigData(this.configData).setId(id).build();

    Keys.LoadManagedKeyResponse response = bridge.getKey().loadManagedKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedKey.fromProto(response.getManagedKey());
  }

  public LocalCertificate newLocalCertificate(LocalCertificateParams params) throws Exception {
    Keys.GenerateLocalCertificateRequest request =
        Keys.GenerateLocalCertificateRequest.newBuilder()
            .setConfigData(this.configData)
            .setParams(params.toProto())
            .build();

    Keys.GenerateLocalCertificateResponse response =
        bridge.getKey().generateLocalCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return LocalCertificate.fromProto(response.getLocalCertificate());
  }

  public LocalCertificate loadLocalCertificate(byte[] pkcs12, String password) throws Exception {
    Keys.LoadLocalCertificateRequest request =
        Keys.LoadLocalCertificateRequest.newBuilder()
            .setConfigData(this.configData)
            .setPkcs12(ByteString.copyFrom(pkcs12))
            .setPassword(password)
            .build();

    Keys.LoadLocalCertificateResponse response = bridge.getKey().loadLocalCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return LocalCertificate.fromProto(response.getLocalCertificate());
  }

  public ManagedCertificate newManagedCertificate(ManagedCertificateParams params)
      throws Exception {
    Keys.GenerateManagedCertificateRequest request =
        Keys.GenerateManagedCertificateRequest.newBuilder()
            .setConfigData(this.configData)
            .setParams(params.toProto())
            .build();

    Keys.GenerateManagedCertificateResponse response =
        bridge.getKey().generateManagedCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedCertificate.fromProto(response.getManagedCertificate());
  }

  public ManagedCertificate loadManagedCertificate(String id) throws Exception {
    Keys.LoadManagedCertificateRequest request =
        Keys.LoadManagedCertificateRequest.newBuilder()
            .setConfigData(this.configData)
            .setId(id)
            .build();

    Keys.LoadManagedCertificateResponse response = bridge.getKey().loadManagedCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedCertificate.fromProto(response.getManagedCertificate());
  }

  public ManagedCertificate importManagedCertificate(
      CertificateType type, byte[] certificate, ImportCertificateParams params) throws Exception {
    Keys.ImportManagedCertificateRequest.Builder builder =
        Keys.ImportManagedCertificateRequest.newBuilder()
            .setConfigData(this.configData)
            .setCertificateType(type.toProto())
            .setCertificate(ByteString.copyFrom(certificate));

    if (params.getPassword() != null) {
      builder.setPassword(params.getPassword());
    }

    Keys.ImportManagedCertificateRequest request = builder.build();

    Keys.ImportManagedCertificateResponse response =
        bridge.getKey().importManagedCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedCertificate.fromProto(response.getManagedCertificate());
  }

  public TotpAccessControl setupTotpAccessControl(Managed key) throws Exception {
    Keys.SetupTotpAccessControlRequest.Builder builder =
        Keys.SetupTotpAccessControlRequest.newBuilder().setConfigData(this.configData);

    if (key.getManagedKey() != null) {
      builder.setManagedKey(key.getManagedKey().toProto());
    }

    if (key.getManagedCertificate() != null) {
      builder.setManagedCertificate(key.getManagedCertificate().toProto());
    }

    Keys.SetupTotpAccessControlRequest request = builder.build();

    Keys.SetupTotpAccessControlResponse response = bridge.getKey().setupTotpAccessControl(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return new TotpAccessControl(
        response.getSecret(), response.getSecretQr(), response.getRecoveryCodesList());
  }

  public TotpAccessControl recoverTotpAccessControl(Managed key, String code) throws Exception {
    Keys.RecoverTotpAccessControlRequest.Builder builder =
        Keys.RecoverTotpAccessControlRequest.newBuilder()
            .setConfigData(this.configData)
            .setCode(code);

    if (key.getManagedKey() != null) {
      builder.setManagedKey(key.getManagedKey().toProto());
    }

    if (key.getManagedCertificate() != null) {
      builder.setManagedCertificate(key.getManagedCertificate().toProto());
    }

    Keys.RecoverTotpAccessControlRequest request = builder.build();

    Keys.RecoverTotpAccessControlResponse response =
        bridge.getKey().recoverTotpAccessControl(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return new TotpAccessControl(
        response.getSecret(), response.getSecretQr(), response.getRecoveryCodesList());
  }

  public void setupSecretAccessControl(Managed key, String secret, String email) throws Exception {
    Keys.SetupSecretAccessControlRequest.Builder builder =
        Keys.SetupSecretAccessControlRequest.newBuilder()
            .setConfigData(this.configData)
            .setSecret(secret)
            .setEmail(email);

    if (key.getManagedKey() != null) {
      builder.setManagedKey(key.getManagedKey().toProto());
    }

    if (key.getManagedCertificate() != null) {
      builder.setManagedCertificate(key.getManagedCertificate().toProto());
    }

    Keys.SetupSecretAccessControlRequest request = builder.build();

    Keys.SetupSecretAccessControlResponse response =
        bridge.getKey().setupSecretAccessControl(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }
  }
}
