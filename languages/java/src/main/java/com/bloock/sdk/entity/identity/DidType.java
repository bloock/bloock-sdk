package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents parameters used for generating DIDs.
 */
public class DidType {
  private final Method method;
  private final Blockchain blockchain;
  private final Network network;

  /**
   * Construct a new instance of DidType with default values.
   */
  public DidType() {
    this.method = Method.POLYGONID;
    this.blockchain = Blockchain.POLYGON;
    this.network = Network.MUMBAI;
  }

  /**
   * Constructs a DidType object with the specified parameters.
   * @param method
   * @param blockchain
   * @param network
   */
  public DidType(Method method, Blockchain blockchain, Network network) {
    this.method = method;
    this.blockchain = blockchain;
    this.network = network;
  }

  public IdentityEntities.DidType toProto() {
    return IdentityEntities.DidType.newBuilder()
        .setMethod(this.method.toProto())
        .setBlockchain(this.blockchain.toProto())
        .setNetworkId(this.network.toProto())
        .build();
  }
}
