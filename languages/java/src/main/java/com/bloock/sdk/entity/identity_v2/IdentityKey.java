package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public interface IdentityKey {
  IdentityEntitiesV2.IdentityKey toProto();
}
