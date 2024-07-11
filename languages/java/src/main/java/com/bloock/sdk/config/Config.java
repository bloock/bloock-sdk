package com.bloock.sdk.config;

import com.bloock.sdk.Bloock;
import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockConfig.Configuration;

public class Config {
  public static ConfigData newConfigDataDefault() {
    Configuration config = Configuration.newBuilder()
        .setLibraryName("Java")
        .setHost(Bloock.apiHost)
        .setApiKey(Bloock.apiKey)
        .setIdentityApiHost(Bloock.identityApiHost)
        .build();

    return ConfigData.newBuilder()
        .setConfig(config)
        .putAllNetworksConfig(Bloock.networkConfig)
        .build();
  }

  public static ConfigData newConfigData(ConfigData configData) {
    return configData;
  }
}
