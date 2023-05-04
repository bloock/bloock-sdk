package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class StringAttributeDescriptor extends AttributeDescriptor {

    public StringAttributeDescriptor(String displayName, String technicalName, String description) {
        super(displayName, technicalName, description);
    }

    public static StringAttributeDescriptor fromProto(IdentityEntities.StringAttributeDefinition res) {
        return new StringAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription());
    }

    public IdentityEntities.StringAttributeDefinition toProto() {
        return IdentityEntities.StringAttributeDefinition.newBuilder()
                .setDisplayName(this.displayName)
                .setId(this.technicalName)
                .setDescription(this.description)
                .build();
    }
}
