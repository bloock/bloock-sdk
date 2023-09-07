package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config;
import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;
import com.bloock.sdk.bridge.proto.IdentityV2;
import com.bloock.sdk.bridge.proto.Shared;
import java.util.ArrayList;
import java.util.List;

public class SchemaBuilder {
  private final String displayName;
  private final String schemaType;
  private final String version;
  private final String description;
  private final String issuerDid;
  private final Config.ConfigData configData;

  private final List<IdentityEntitiesV2.StringAttributeDefinitionV2> stringAttributes;
  private final List<IdentityEntitiesV2.IntegerAttributeDefinitionV2> integerAttributes;
  private final List<IdentityEntitiesV2.DecimalAttributeDefinitionV2> decimalAttributes;
  private final List<IdentityEntitiesV2.BooleanAttributeDefinitionV2> booleanAttributes;
  private final List<IdentityEntitiesV2.DateAttributeDefinitionV2> dateAttributes;
  private final List<IdentityEntitiesV2.DateTimeAttributeDefinitionV2> datetimeAttributes;
  private final List<IdentityEntitiesV2.StringEnumAttributeDefinitionV2> stringEnumAttributes;
  private final List<IdentityEntitiesV2.IntegerEnumAttributeDefinitionV2> integerEnumAttributes;
  private final List<IdentityEntitiesV2.DecimalEnumAttributeDefinitionV2> decimalEnumAttributes;

  public SchemaBuilder(
      String displayName,
      String schemaType,
      String version,
      String description,
      String issuerDid,
      Config.ConfigData configData) {
    this.displayName = displayName;
    this.schemaType = schemaType;
    this.version = version;
    this.description = description;
    this.issuerDid = issuerDid;
    this.configData = configData;

    this.stringAttributes = new ArrayList<>();
    this.integerAttributes = new ArrayList<>();
    this.decimalAttributes = new ArrayList<>();
    this.booleanAttributes = new ArrayList<>();
    this.dateAttributes = new ArrayList<>();
    this.datetimeAttributes = new ArrayList<>();
    this.stringEnumAttributes = new ArrayList<>();
    this.integerEnumAttributes = new ArrayList<>();
    this.decimalEnumAttributes = new ArrayList<>();
  }

  public SchemaBuilder addStringAttribute(
      String name, String technicalName, String description, Boolean required) {
    this.stringAttributes.add(
        new StringAttributeDescriptor(name, technicalName, description, required).toProto());
    return this;
  }

  public SchemaBuilder addIntegerAttribute(
      String name, String technicalName, String description, Boolean required) {
    this.integerAttributes.add(
        new IntegerAttributeDescriptor(name, technicalName, description, required).toProto());
    return this;
  }

  public SchemaBuilder addDecimalAttribute(
      String name, String technicalName, String description, Boolean required) {
    this.decimalAttributes.add(
        new DecimalAttributeDescriptor(name, technicalName, description, required).toProto());
    return this;
  }

  public SchemaBuilder addBooleanAttribute(
      String name, String technicalName, String description, Boolean required) {
    this.booleanAttributes.add(
        new BooleanAttributeDescriptor(name, technicalName, description, required).toProto());
    return this;
  }

  public SchemaBuilder addDateAttribute(
      String name, String technicalName, String description, Boolean required) {
    this.dateAttributes.add(
        new DateAttributeDescriptor(name, technicalName, description, required).toProto());
    return this;
  }

  public SchemaBuilder addDatetimeAttribute(
      String name, String technicalName, String description, Boolean required) {
    this.datetimeAttributes.add(
        new DatetimeAttributeDescriptor(name, technicalName, description, required).toProto());
    return this;
  }

  public SchemaBuilder addStringEnumAttribute(
      String name,
      String technicalName,
      String description,
      Boolean required,
      List<String> enumeration) {
    this.stringEnumAttributes.add(
        new StringEnumAttributeDescriptor(name, technicalName, description, required, enumeration)
            .toProto());
    return this;
  }

  public SchemaBuilder addIntegerEnumAttribute(
      String name,
      String technicalName,
      String description,
      Boolean required,
      List<Long> enumeration) {
    this.integerEnumAttributes.add(
        new IntegerEnumAttributeDescriptor(name, technicalName, description, required, enumeration)
            .toProto());
    return this;
  }

  public SchemaBuilder addDecimalEnumAttribute(
      String name,
      String technicalName,
      String description,
      Boolean required,
      List<Double> enumeration) {
    this.decimalEnumAttributes.add(
        new DecimalEnumAttributeDescriptor(name, technicalName, description, required, enumeration)
            .toProto());
    return this;
  }

  public Schema build() throws Exception {
    Bridge bridge = new Bridge();

    IdentityV2.BuildSchemaRequestV2 req =
        IdentityV2.BuildSchemaRequestV2.newBuilder()
            .setConfigData(this.configData)
            .setDisplayName(this.displayName)
            .setSchemaType(this.schemaType)
            .setVersion(this.version)
            .setDescription(this.description)
            .setIssuerDid(this.issuerDid)
            .addAllStringAttributes(this.stringAttributes)
            .addAllIntegerAttributes(this.integerAttributes)
            .addAllDecimalAttributes(this.decimalAttributes)
            .addAllBooleanAttributes(this.booleanAttributes)
            .addAllDateAttributes(this.dateAttributes)
            .addAllDatetimeAttributes(this.datetimeAttributes)
            .addAllStringEnumAttributes(this.stringEnumAttributes)
            .addAllIntegerEnumAttributes(this.integerEnumAttributes)
            .addAllDecimalEnumAttributes(this.decimalEnumAttributes)
            .build();

    IdentityV2.BuildSchemaResponseV2 response = bridge.getIdentityV2().buildSchema(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Schema.fromProto(response.getSchema());
  }
}
