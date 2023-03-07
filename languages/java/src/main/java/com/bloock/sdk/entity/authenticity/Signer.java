package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;

public interface Signer {
    AuthenticityEntities.Signer toProto();
}
