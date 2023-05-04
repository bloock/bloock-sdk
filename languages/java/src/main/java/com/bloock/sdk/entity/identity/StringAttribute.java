package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class StringAttribute extends Attribute<String> {
    public StringAttribute(String id, String value) {
        super(id, value);
    }

    public static StringAttribute fromProto(IdentityEntities.StringAttribute res) {
        return new StringAttribute(res.getId(), res.getValue());
    }

    public IdentityEntities.StringAttribute toProto() {
        return IdentityEntities.StringAttribute.newBuilder()
                .setId(this.id)
                .setValue(this.value)
                .build();
    }
}
