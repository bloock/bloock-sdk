package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.BloockIntegrityEntities;

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
   * 
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

  static AnchorNetwork fromProto(BloockIntegrityEntities.AnchorNetwork network) {
    return new AnchorNetwork(
        network.getName(), network.getState(), network.getTxHash(), network.getRoot());
  }

  BloockIntegrityEntities.AnchorNetwork toProto() {
    return BloockIntegrityEntities.AnchorNetwork.newBuilder()
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
   * 
   * @return
   */
  public String getName() {
    return name;
  }

  /**
   * Gets state of the anchor network.
   * 
   * @return
   */
  public String getState() {
    return state;
  }

  /**
   * Gets transaction hash of the anchor network.
   * 
   * @return
   */
  public String getTxHash() {
    return txHash;
  }

  /**
   * Gets root of the anchor network.
   * 
   * @return
   */
  public String getRoot() {
    return root;
  }
}
