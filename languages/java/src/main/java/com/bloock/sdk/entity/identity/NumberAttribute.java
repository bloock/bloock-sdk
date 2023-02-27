package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class NumberAttribute extends Attribute<Long> {
    public NumberAttribute(String id, Long value) {
        super(id, value);
    }

    public IdentityEntities.NumberAttribute toProto() {
        return IdentityEntities.NumberAttribute.newBuilder()
                .setId(this.id)
                .setValue(this.value)
                .build();
    }

    public static NumberAttribute fromProto(IdentityEntities.NumberAttribute res) {
        return new NumberAttribute(res.getId(), res.getValue());
    }
}
