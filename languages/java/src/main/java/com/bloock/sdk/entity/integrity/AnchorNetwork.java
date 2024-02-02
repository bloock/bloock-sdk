package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.IntegrityEntities;

/**
 * Represents information about an anchor network.
 */
public class AnchorNetwork {
  String name;
  String state;
  String txHash;
  String root;

  /**
   * Constructs an AnchorNetwork object with the specified parameters.
   * @param name
   * @param state
   * @param txHash
   * @param root
   */
  public AnchorNetwork(String name, String state, String txHash, String root) {
    this.name = name;
    this.state = state;
    this.txHash = txHash;
    this.root = root;
  }

  static AnchorNetwork fromProto(IntegrityEntities.AnchorNetwork network) {
    return new AnchorNetwork(
        network.getName(), network.getState(), network.getTxHash(), network.getRoot());
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

  /**
   * Gets name of the anchor network.
   * @return
   */
  public String getName() {
    return name;
  }

  /**
   * Gets state of the anchor network.
   * @return
   */
  public String getState() {
    return state;
  }

  /**
   * Gets transaction hash of the anchor network.
   * @return
   */
  public String getTxHash() {
    return txHash;
  }

  /**
   * Gets root of the anchor network.
   * @return
   */
  public String getRoot() {
    return root;
  }
}
