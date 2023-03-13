package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config;
import com.bloock.sdk.bridge.proto.Identity;
import com.bloock.sdk.bridge.proto.IdentityEntities;
import com.bloock.sdk.bridge.proto.Shared;

import java.util.ArrayList;
import java.util.List;

public class SchemaBuilder {
    private final String displayName;
    private final String technicalName;
    private final Config.ConfigData configData;

    private final List<IdentityEntities.BooleanAttributeDefinition> booleanAttributes;
    private final List<IdentityEntities.DateAttributeDefinition> dateAttributes;
    private final List<IdentityEntities.DateTimeAttributeDefinition> datetimeAttributes;
    private final List<IdentityEntities.MultiChoiceAttributeDefinition> multichoiceAttributes;
    private final List<IdentityEntities.NumberAttributeDefinition> numberAttributes;

    public SchemaBuilder(String displayName, String technicalName, Config.ConfigData configData) {
        this.displayName = displayName;
        this.technicalName = technicalName;
        this.configData = configData;

        this.booleanAttributes = new ArrayList<>();
        this.dateAttributes = new ArrayList<>();
        this.datetimeAttributes = new ArrayList<>();
        this.multichoiceAttributes = new ArrayList<>();
        this.numberAttributes = new ArrayList<>();
    }

    public SchemaBuilder addBooleanAttribute(String name, String technicalName, String description) {
        this.booleanAttributes.add(new BooleanAttributeDescriptor(name, technicalName, description).toProto());
        return this;
    }

    public SchemaBuilder addDateAttribute(String name, String technicalName, String description) {
        this.dateAttributes.add(new DateAttributeDescriptor(name, technicalName, description).toProto());
        return this;
    }

    public SchemaBuilder addDatetimeAttribute(String name, String technicalName, String description) {
        this.datetimeAttributes.add(new DatetimeAttributeDescriptor(name, technicalName, description).toProto());
        return this;
    }

    public SchemaBuilder addMultichoiceAttribute(String name, String technicalName, List<String> allowedValues, String description) {
        this.multichoiceAttributes.add(new MultichoiceAttributeDescriptor(name, technicalName, allowedValues, description).toProto());
        return this;
    }

    public SchemaBuilder addNumberAttribute(String name, String technicalName, String description) {
        this.numberAttributes.add(new NumberAttributeDescriptor(name, technicalName, description).toProto());
        return this;
    }

    public Schema build() throws Exception {
        Bridge bridge = new Bridge();

        Identity.BuildSchemaRequest req = Identity.BuildSchemaRequest.newBuilder()
                .setConfigData(this.configData)
                .setDisplayName(this.displayName)
                .setTechnicalName(this.technicalName)
                .addAllBooleanAttributes(this.booleanAttributes)
                .addAllDateAttributes(this.dateAttributes)
                .addAllDatetimeAttributes(this.datetimeAttributes)
                .addAllMultichoiceAttributes(this.multichoiceAttributes)
                .addAllNumberAttributes(this.numberAttributes)
                .build();

        Identity.BuildSchemaResponse response = bridge.getIdentity().buildSchema(req);

        if (response.getError() != Shared.Error.getDefaultInstance()) {
            throw new Exception(response.getError().getMessage());
        }

        return Schema.fromProto(response.getSchema());
    }
}
