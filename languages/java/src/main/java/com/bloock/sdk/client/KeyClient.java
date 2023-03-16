package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Keys;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.key.KeyType;
import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;
import com.bloock.sdk.entity.key.ManagedKeyParams;

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
        Keys.GenerateLocalKeyRequest request = Keys.GenerateLocalKeyRequest.newBuilder()
                .setConfigData(this.configData)
                .setKeyType(keyType.toProto())
                .build();

        Keys.GenerateLocalKeyResponse response = bridge.getKey().generateLocalKey(request);

        if (response.getError() != Error.getDefaultInstance()) {
            throw new Exception(response.getError().getMessage());
        }

        return LocalKey.fromProto(response.getLocalKey());
    }

    public LocalKey loadLocalKey(KeyType keyType, String key, String privateKey) throws Exception {
        Keys.LoadLocalKeyRequest request = Keys.LoadLocalKeyRequest.newBuilder()
                .setConfigData(this.configData)
                .setKeyType(keyType.toProto())
                .setKey(key)
                .setPrivateKey(privateKey)
                .build();

        Keys.LoadLocalKeyResponse response = bridge.getKey().loadLocalKey(request);

        if (response.getError() != Error.getDefaultInstance()) {
            throw new Exception(response.getError().getMessage());
        }

        return LocalKey.fromProto(response.getLocalKey());
    }

    public ManagedKey newManagedKey(ManagedKeyParams params) throws Exception {
        Keys.GenerateManagedKeyRequest request = Keys.GenerateManagedKeyRequest.newBuilder()
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
        Keys.LoadManagedKeyRequest request = Keys.LoadManagedKeyRequest.newBuilder()
                .setConfigData(this.configData)
                .setId(id)
                .build();

        Keys.LoadManagedKeyResponse response = bridge.getKey().loadManagedKey(request);

        if (response.getError() != Error.getDefaultInstance()) {
            throw new Exception(response.getError().getMessage());
        }

        return ManagedKey.fromProto(response.getManagedKey());
    }
}
