package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class BooleanAttributeDescriptor extends AttributeDescriptor {
    public BooleanAttributeDescriptor(String displayName, String technicalName, String description) {
        super(displayName, technicalName, description);
    }

    public static BooleanAttributeDescriptor fromProto(IdentityEntities.BooleanAttributeDefinition res) {
        return new BooleanAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription());
    }

    public IdentityEntities.BooleanAttributeDefinition toProto() {
        return IdentityEntities.BooleanAttributeDefinition.newBuilder()
                .setDisplayName(this.displayName)
                .setId(this.technicalName)
                .setDescription(this.description)
                .build();
    }
}
