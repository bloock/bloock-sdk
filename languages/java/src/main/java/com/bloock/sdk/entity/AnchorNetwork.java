package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.IntegrityEntities;

public class AnchorNetwork {
  String name;
  String state;
  String txHash;

  public AnchorNetwork(String name, String state, String txHash) {
    this.name = name;
    this.state = state;
    this.txHash = txHash;
  }

  static AnchorNetwork fromProto(IntegrityEntities.AnchorNetwork network) {
    return new AnchorNetwork(network.getName(), network.getState(), network.getTxHash());
  }

  IntegrityEntities.AnchorNetwork toProto() {
    return IntegrityEntities.AnchorNetwork.newBuilder()
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
