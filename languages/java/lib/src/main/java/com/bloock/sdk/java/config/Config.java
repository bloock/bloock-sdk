package com.bloock.sdk.java.config;

import com.bloock.sdk.java.Bloock;
import com.bloock.sdk.java.bridge.proto.Config.ConfigData;
import com.bloock.sdk.java.bridge.proto.Config.Configuration;

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
