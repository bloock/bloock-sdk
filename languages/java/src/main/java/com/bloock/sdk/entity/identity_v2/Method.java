package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public enum Method {
    IDEN3,
    POLYGONID;

    public IdentityEntitiesV2.Method toProto() {
        switch (this) {
            case IDEN3:
                return IdentityEntitiesV2.Method.IDEN3;
            case POLYGONID:
                return IdentityEntitiesV2.Method.POLYGON_ID;
            default:
                return IdentityEntitiesV2.Method.POLYGON_ID;
        }
    }
}
