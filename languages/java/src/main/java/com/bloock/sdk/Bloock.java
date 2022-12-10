package com.bloock.sdk;

import com.bloock.sdk.bridge.proto.Config;
import com.bloock.sdk.entity.Network;
import com.bloock.sdk.entity.NetworkConfig;
import java.util.HashMap;
import java.util.Map;

public class Bloock {
  public static String apiKey = "";
  public static String apiHost = "";
  public static Boolean disableAnalytics = false;
  public static Map<Integer, Config.NetworkConfig> networkConfig = new HashMap<>();

  public static void setNetworkConfig(Network network, NetworkConfig config) {
    Bloock.networkConfig.put(
        network.toProto().ordinal(),
        Config.NetworkConfig.newBuilder()
            .setContractAddress(config.getContractAddress())
            .setContractAbi(config.getContractAbi())
            .setHttpProvider(config.getHttpProvider())
            .build());
  }
}
