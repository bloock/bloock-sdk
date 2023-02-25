package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class Schema {
    private String id;
    private String json;

    public Schema(String id, String json) {
        this.id = id;
        this.json = json;
    }

    public IdentityEntities.Schema toProto() {
        return IdentityEntities.Schema.newBuilder()
                .setId(this.id)
                .setJsonLd(this.json)
                .build();
    }

    public static Schema fromProto(IdentityEntities.Schema res) {
        return new Schema(res.getId(), res.getJsonLd());
    }
}
