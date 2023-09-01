package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class BjjIssuerKey implements IssuerKey {
  IssuerKeyArgs args;

  public BjjIssuerKey(IssuerKeyArgs args) {
    this.args = args;
  }

  @Override
  public IdentityEntitiesV2.IssuerKey toProto() {
    IdentityEntitiesV2.IssuerKey.Builder builder = IdentityEntitiesV2.IssuerKey.newBuilder();

    if (this.args.localKey != null) {
      builder.setLocalKey(this.args.localKey.toProto());
    }

    if (this.args.managedKey != null) {
      builder.setManagedKey(this.args.managedKey.toProto());
    }

    return builder.build();
  }
}
