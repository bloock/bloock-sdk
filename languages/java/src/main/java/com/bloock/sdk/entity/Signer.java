package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

public interface Signer {
  AuthenticityEntities.Signer toProto();
}
