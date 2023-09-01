package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class IssuerParams {
  private final Method method;
  private final Blockchain blockchain;
  private final Network network;

  public IssuerParams() {
    this.method = Method.POLYGONID;
    this.blockchain = Blockchain.POLYGON;
    this.network = Network.MUMBAI;
  }

  public IssuerParams(Method method, Blockchain blockchain, Network network) {
    this.method = method;
    this.blockchain = blockchain;
    this.network = network;
  }

  public IdentityEntitiesV2.IssuerParams toProto() {
    return IdentityEntitiesV2.IssuerParams.newBuilder()
        .setMethod(this.method.toProto())
        .setBlockchain(this.blockchain.toProto())
        .setNetworkId(this.network.toProto())
        .build();
  }
}
