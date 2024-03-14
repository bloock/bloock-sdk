package com.bloock.sdk;

import com.bloock.sdk.bridge.proto.Config.NetworkConfig;
import com.bloock.sdk.entity.integrity.Network;
import java.util.HashMap;
import java.util.Map;

/**
 * Provides a centralized configuration for the Bloock SDK library. For information about Bloock SDK in Go, see https://bloock.com.
 */
public class Bloock {
  /**
   * Is a string variable representing the API key used for authentication with the Bloock SDK, create <a href="https://dashboard.bloock.com/login">here</a>.
   */
  public static String apiKey = "";
  /**
   * Is a string variable representing the host URL used for API communication with the Bloock SDK.
   */
  public static String apiHost = "";
  /**
   * Is a string variable representing the host URL used for Identity Managed API, required to be set for identity-related features of the Bloock SDK.
   */
  public static String identityApiHost = "";
  /**
   * Is a map variable that holds network configurations associated with specific network IDs in the Bloock SDK.
   */
  public static Map<Integer, NetworkConfig> networkConfig = new HashMap<>();

  /**
   * Sets the HTTP provider for the specified network in the Bloock SDK configuration.
   * @param network
   * @param provider
   */
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

  /**
   * Sets the contract address for the specified network in the Bloock SDK configuration.
   * @param network
   * @param contractAddress
   */
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
