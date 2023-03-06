package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

import java.util.List;

public class MultichoiceAttributeDescriptor extends AttributeDescriptor {

    private List<String> allowedValues;

    public MultichoiceAttributeDescriptor(String displayName, String technicalName, List<String> allowedValues, String description) {
        super(displayName, technicalName, description);
        this.allowedValues = allowedValues;
    }

    public static MultichoiceAttributeDescriptor fromProto(IdentityEntities.MultiChoiceAttributeDefinition res) {
        return new MultichoiceAttributeDescriptor(res.getDisplayName(), res.getId(), res.getAllowedValuesList(), res.getDescription());
    }

    public IdentityEntities.MultiChoiceAttributeDefinition toProto() {
        return IdentityEntities.MultiChoiceAttributeDefinition.newBuilder()
                .setDisplayName(this.displayName)
                .setId(this.technicalName)
                .setDescription(this.description)
                .addAllAllowedValues(this.allowedValues)
                .build();
    }
}
