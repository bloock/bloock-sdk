package com.bloock.sdk.entity.identity;

public class AttributeDescriptor {
    String displayName;
    String technicalName;
    String description;

    public AttributeDescriptor(String displayName, String technicalName, String description) {
        this.displayName = displayName;
        this.technicalName = technicalName;
        this.description = description;
    }
}
