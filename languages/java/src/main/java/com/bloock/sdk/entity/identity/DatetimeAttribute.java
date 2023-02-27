package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class DatetimeAttribute extends Attribute<Long> {
    public DatetimeAttribute(String id, Long value) {
        super(id, value);
    }

    public IdentityEntities.DateTimeAttribute toProto() {
        return IdentityEntities.DateTimeAttribute.newBuilder()
                .setId(this.id)
                .setValue(this.value)
                .build();
    }

    public static DatetimeAttribute fromProto(IdentityEntities.DateTimeAttribute res) {
        return new DatetimeAttribute(res.getId(), res.getValue());
    }
}
