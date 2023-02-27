package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class DateAttribute extends Attribute<Long> {
    public DateAttribute(String id, Long value) {
        super(id, value);
    }

    public IdentityEntities.DateAttribute toProto() {
        return IdentityEntities.DateAttribute.newBuilder()
                .setId(this.id)
                .setValue(this.value)
                .build();
    }

    public static DateAttribute fromProto(IdentityEntities.DateAttribute res) {
        return new DateAttribute(res.getId(), res.getValue());
    }
}
