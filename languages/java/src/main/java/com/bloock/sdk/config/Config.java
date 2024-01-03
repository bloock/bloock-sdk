package com.bloock.sdk.config;

import com.bloock.sdk.Bloock;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Config.Configuration;

public class Config {
  public static ConfigData newConfigDataDefault() {
    Configuration config =
        Configuration.newBuilder()
            .setLibraryName("Java")
            .setHost(Bloock.apiHost)
            .setApiKey(Bloock.apiKey)
            .setEnvironment(Bloock.forceEnv)
            .setIdentityApiHost(Bloock.identityApiHost)
            .setDisableAnalytics(Bloock.disableAnalytics)
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
