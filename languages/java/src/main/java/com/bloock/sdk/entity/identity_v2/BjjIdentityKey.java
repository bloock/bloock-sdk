package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class BjjIdentityKey implements IdentityKey {
  IdentityKeyArgs args;

  public BjjIdentityKey(IdentityKeyArgs args) {
    this.args = args;
  }

  @Override
  public IdentityEntitiesV2.IdentityKey toProto() {
    IdentityEntitiesV2.IdentityKey.Builder builder = IdentityEntitiesV2.IdentityKey.newBuilder();

    if (this.args.localKey != null) {
      builder.setLocalKey(this.args.localKey.toProto());
    }

    if (this.args.managedKey != null) {
      builder.setManagedKey(this.args.managedKey.toProto());
    }

    return builder.build();
  }
}
