package com.bloock.sdk;

import com.bloock.sdk.bridge.proto.Config.NetworkConfig;
import com.bloock.sdk.entity.Network;
import java.util.HashMap;
import java.util.Map;

public class Bloock {
  public static String apiKey = "";
  public static String apiHost = "";
  public static Boolean disableAnalytics = false;
  public static Map<Integer, NetworkConfig> networkConfig = new HashMap<>();

  public static void setProvider(Network network, String provider) {
    if (Bloock.networkConfig.containsKey(network.toProto().ordinal())) {
      Bloock.networkConfig.put(
          network.toProto().ordinal(),
          Bloock.networkConfig.get(network.toProto().ordinal()).toBuilder()
              .setHttpProvider(provider)
              .build());
    } else {
      Bloock.networkConfig.put(
          network.toProto().ordinal(),
          NetworkConfig.newBuilder().setHttpProvider(provider).build());
    }
  }

  public static void setContractAddress(Network network, String contractAddress) {
    if (Bloock.networkConfig.containsKey(network.toProto().ordinal())) {
      Bloock.networkConfig.put(
          network.toProto().ordinal(),
          Bloock.networkConfig.get(network.toProto().ordinal()).toBuilder()
              .setContractAddress(contractAddress)
              .build());
    } else {
      Bloock.networkConfig.put(
          network.toProto().ordinal(),
          NetworkConfig.newBuilder().setContractAddress(contractAddress).build());
    }
  }
}
