package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.AnchorOuterClass;

public class AnchorNetwork {
  String name;
  String state;
  String txHash;

  public AnchorNetwork(String name, String state, String txHash) {
    this.name = name;
    this.state = state;
    this.txHash = txHash;
  }

  static AnchorNetwork fromProto(AnchorOuterClass.AnchorNetwork network) {
    return new AnchorNetwork(network.getName(), network.getState(), network.getTxHash());
  }

  AnchorOuterClass.AnchorNetwork toProto() {
    return AnchorOuterClass.AnchorNetwork.newBuilder()
        .setName(this.name)
        .setState(this.state)
        .setTxHash(this.txHash)
        .build();
  }

  @Override
  public String toString() {
    return "{" + " name: " + name + ", state: " + state + ", txHash: " + txHash + "}";
  }

  public String getName() {
    return name;
  }

  public String getState() {
    return state;
  }

  public String getTxHash() {
    return txHash;
  }
}
