package com.bloock.sdk.entity;

public class NetworkConfig {
  String contractAddress;
  String contractAbi;
  String httpProvider;

  public NetworkConfig(String contractAddress, String contractAbi, String httpProvider) {
    this.contractAddress = contractAddress;
    this.contractAbi = contractAbi;
    this.httpProvider = httpProvider;
  }

  public String getContractAddress() {
    return contractAddress;
  }

  public String getContractAbi() {
    return contractAbi;
  }

  public String getHttpProvider() {
    return httpProvider;
  }
}
