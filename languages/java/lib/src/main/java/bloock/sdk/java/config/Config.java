package bloock.sdk.java.config;

import bloock.sdk.java.Bloock;
import bloock.sdk.java.bridge.proto.Config.ConfigData;
import bloock.sdk.java.bridge.proto.Config.Configuration;

public class Config {
    public static ConfigData newConfigData() {
        Configuration config = Configuration.newBuilder()
                .setHost(Bloock.apiHost)
                .setApiKey(Bloock.apiKey)
                .build();

        return ConfigData
                .newBuilder()
                .setConfig(config)
                .putAllNetworksConfig(Bloock.networkConfig)
                .build();
    }
}
