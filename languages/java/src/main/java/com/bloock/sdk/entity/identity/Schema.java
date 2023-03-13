package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class Schema {
    private String id;
    private String json;

    public Schema(String id, String json) {
        this.id = id;
        this.json = json;
    }

    public static Schema fromProto(IdentityEntities.Schema res) {
        return new Schema(res.getId(), res.getJsonLd());
    }

    public IdentityEntities.Schema toProto() {
        return IdentityEntities.Schema.newBuilder()
                .setId(this.id)
                .setJsonLd(this.json)
                .build();
    }

    public String getId() {
        return id;
    }

    public String getJson() {
        return json;
    }
}
