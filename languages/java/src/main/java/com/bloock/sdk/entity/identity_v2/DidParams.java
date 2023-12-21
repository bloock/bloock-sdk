package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class DidParams {
  private final Method method;
  private final Blockchain blockchain;
  private final Network network;

  public DidParams() {
    this.method = Method.POLYGONID;
    this.blockchain = Blockchain.POLYGON;
    this.network = Network.MUMBAI;
  }

  public DidParams(Method method, Blockchain blockchain, Network network) {
    this.method = method;
    this.blockchain = blockchain;
    this.network = network;
  }

  public IdentityEntitiesV2.DidParams toProto() {
    return IdentityEntitiesV2.DidParams.newBuilder()
        .setMethod(this.method.toProto())
        .setBlockchain(this.blockchain.toProto())
        .setNetworkId(this.network.toProto())
        .build();
  }
}
