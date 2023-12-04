package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.IntegrityEntities;

public class AnchorNetwork {
  String name;
  String state;
  String txHash;
  String root;

  public AnchorNetwork(String name, String state, String txHash, String root) {
    this.name = name;
    this.state = state;
    this.txHash = txHash;
    this.root = root;
  }

  static AnchorNetwork fromProto(IntegrityEntities.AnchorNetwork network) {
    return new AnchorNetwork(network.getName(), network.getState(), network.getTxHash(), network.getRoot());
  }

  IntegrityEntities.AnchorNetwork toProto() {
    return IntegrityEntities.AnchorNetwork.newBuilder()
        .setName(this.name)
        .setState(this.state)
        .setTxHash(this.txHash)
        .setRoot(this.root)
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

  public String getRoot() {
    return root;
  }
}
