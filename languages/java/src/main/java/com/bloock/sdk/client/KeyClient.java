package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Keys;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.key.*;
import com.google.protobuf.ByteString;

/**
 * Provides functionality to interact with the <a href="https://dashboard.bloock.com/login">Bloock Keys service</a>.
 */
public class KeyClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * Creates a new KeyClient with default configuration.
   */
  public KeyClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new KeyClient with the given configuration.
   * @param configData
   */
  public KeyClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * Generates a new local key of the specified type.
   * @param keyType
   * @return
   * @throws Exception
   */
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

  /**
   * Loads a local key of the specified type from a public key string.
   * @param keyType
   * @param key
   * @return
   * @throws Exception
   */
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

  /**
   * Generates a new managed key with the specified parameters.
   * @param params
   * @return
   * @throws Exception
   */
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

  /**
   * Loads a managed key by its ID (ex: 51d22546-68f1-4340-b94b-2a80e60b8933).
   * @param id
   * @return
   * @throws Exception
   */
  public ManagedKey loadManagedKey(String id) throws Exception {
    Keys.LoadManagedKeyRequest request =
        Keys.LoadManagedKeyRequest.newBuilder().setConfigData(this.configData).setId(id).build();

    Keys.LoadManagedKeyResponse response = bridge.getKey().loadManagedKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedKey.fromProto(response.getManagedKey());
  }

  /**
   * Generates a new local certificate with the specified parameters.
   * @param params
   * @return
   * @throws Exception
   */
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

  /**
   * Loads a local certificate from a PKCS12 file.
   * @param pkcs12
   * @param password
   * @return
   * @throws Exception
   */
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

  /**
   * Generates a new managed certificate with the specified parameters.
   * @param params
   * @return
   * @throws Exception
   */
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

  /**
   * Loads a managed certificate by its ID (ex: ceef5b02-af17-43d8-ae7b-31d9bdf8027f).
   * @param id
   * @return
   * @throws Exception
   */
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

  /**
   * Imports a managed certificate with the specified parameters, supported types: .pem, .pfx.
   * @param type
   * @param certificate
   * @param params
   * @return
   * @throws Exception
   */
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

  /**
   * Sets up TOTP-based access control for the given managed key or managed certificate.
   * @param key
   * @return
   * @throws Exception
   */
  public TotpAccessControlReceipt setupTotpAccessControl(Managed key) throws Exception {
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

    return new TotpAccessControlReceipt(
        response.getSecret(), response.getSecretQr(), response.getRecoveryCodesList());
  }

  /**
   * Recovers TOTP-based access control for the given managed key or managed certificate using a recovery code.
   * @param key
   * @param code
   * @return
   * @throws Exception
   */
  public TotpAccessControlReceipt recoverTotpAccessControl(Managed key, String code) throws Exception {
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

    return new TotpAccessControlReceipt(
        response.getSecret(), response.getSecretQr(), response.getRecoveryCodesList());
  }

  /**
   * Sets up secret-based access control for the given managed key or managed certificate.
   * @param key
   * @param secret
   * @param email
   * @throws Exception
   */
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
