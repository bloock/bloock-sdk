package com.bloock.sdk.config;

import com.bloock.sdk.Bloock;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Config.Configuration;

public class Config {
  public static ConfigData newConfigData() {
    Configuration config =
        Configuration.newBuilder().setHost(Bloock.apiHost).setApiKey(Bloock.apiKey).build();

    return ConfigData.newBuilder()
        .setConfig(config)
        .putAllNetworksConfig(Bloock.networkConfig)
        .build();
  }
}
