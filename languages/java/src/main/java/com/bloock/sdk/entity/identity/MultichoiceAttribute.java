package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class MultichoiceAttribute extends Attribute<String> {
    public MultichoiceAttribute(String id, String value) {
        super(id, value);
    }

    public IdentityEntities.MultiChoiceAttribute toProto() {
        return IdentityEntities.MultiChoiceAttribute.newBuilder()
                .setId(this.id)
                .setValue(this.value)
                .build();
    }

    public static MultichoiceAttribute fromProto(IdentityEntities.MultiChoiceAttribute res) {
        return new MultichoiceAttribute(res.getId(), res.getValue());
    }
}
