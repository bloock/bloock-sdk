import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { BuildSchemaRequest } from "../bridge/proto/identity";
import { Schema } from "./schema";
import * as identityEntitiesProto from "../bridge/proto/identity_entities";

class AttributeDescriptor {
  displayName: string;
  technicalName: string;
  description?: string;

  constructor(
    displayName: string,
    technicalName: string,
    description?: string
  ) {
    this.displayName = displayName;
    this.technicalName = technicalName;
    this.description = description;
  }
}

class BooleanAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.BooleanAttributeDefinition {
    return identityEntitiesProto.BooleanAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.BooleanAttributeDefinition
  ): BooleanAttributeDescriptor {
    return new BooleanAttributeDescriptor(r.displayName, r.id, r.description);
  }
}

class DateAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DateAttributeDefinition {
    return identityEntitiesProto.DateAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateAttributeDefinition
  ): DateAttributeDescriptor {
    return new DateAttributeDescriptor(r.displayName, r.id, r.description);
  }
}

class DateTimeAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DateTimeAttributeDefinition {
    return identityEntitiesProto.DateTimeAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateTimeAttributeDefinition
  ): DateTimeAttributeDescriptor {
    return new DateTimeAttributeDescriptor(r.displayName, r.id, r.description);
  }
}

class MultichoiceAttributeDescriptor extends AttributeDescriptor {
  values: string[];

  constructor(
    displayName: string,
    technicalName: string,
    values: string[],
    description?: string
  ) {
    super(displayName, technicalName, description);
    this.values = values;
  }

  public toProto(): identityEntitiesProto.MultiChoiceAttributeDefinition {
    return identityEntitiesProto.MultiChoiceAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      allowedValues: this.values
    });
  }

  static fromProto(
    r: identityEntitiesProto.MultiChoiceAttributeDefinition
  ): MultichoiceAttributeDescriptor {
    return new MultichoiceAttributeDescriptor(
      r.displayName,
      r.id,
      r.allowedValues,
      r.description
    );
  }
}

class NumberAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.NumberAttributeDefinition {
    return identityEntitiesProto.NumberAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.NumberAttributeDefinition
  ): NumberAttributeDescriptor {
    return new NumberAttributeDescriptor(r.displayName, r.id, r.description);
  }
}

export class SchemaBuilder {
  displayName: string;
  technicalName: string;
  configData: ConfigData;

  booleanAttributes: BooleanAttributeDescriptor[];
  dateAttributes: DateAttributeDescriptor[];
  dateTimeAttributes: DateTimeAttributeDescriptor[];
  multichoiceAttributes: MultichoiceAttributeDescriptor[];
  numberAttributes: NumberAttributeDescriptor[];

  constructor(
    displayName: string,
    technicalName: string,
    configData: ConfigData
  ) {
    this.displayName = displayName;
    this.technicalName = technicalName;
    this.configData = configData;
    this.booleanAttributes = [];
    this.dateAttributes = [];
    this.dateTimeAttributes = [];
    this.multichoiceAttributes = [];
    this.numberAttributes = [];
  }

  public addBooleanAttribute(
    name: string,
    technicalName: string,
    description?: string
  ): SchemaBuilder {
    this.booleanAttributes.push(
      new BooleanAttributeDescriptor(name, technicalName, description)
    );
    return this;
  }

  public addDateAttribute(
    name: string,
    technicalName: string,
    description?: string
  ): SchemaBuilder {
    this.dateAttributes.push(
      new DateAttributeDescriptor(name, technicalName, description)
    );
    return this;
  }

  public addDateTimeAttribute(
    name: string,
    technicalName: string,
    description?: string
  ): SchemaBuilder {
    this.dateTimeAttributes.push(
      new DateTimeAttributeDescriptor(name, technicalName, description)
    );
    return this;
  }

  public addMultichoiceAttribute(
    name: string,
    technicalName: string,
    values: string[],
    description?: string
  ): SchemaBuilder {
    this.multichoiceAttributes.push(
      new MultichoiceAttributeDescriptor(
        name,
        technicalName,
        values,
        description
      )
    );
    return this;
  }

  public addNumberAttribute(
    name: string,
    technicalName: string,
    description?: string
  ): SchemaBuilder {
    this.numberAttributes.push(
      new NumberAttributeDescriptor(name, technicalName, description)
    );
    return this;
  }

  async build(): Promise<Schema> {
    const bridge = new BloockBridge();

    const req = BuildSchemaRequest.fromPartial({
      configData: this.configData,
      displayName: this.displayName,
      technicalName: this.technicalName,
      booleanAttributes: this.booleanAttributes.map(a => a.toProto()),
      dateAttributes: this.dateAttributes.map(a => a.toProto()),
      datetimeAttributes: this.dateTimeAttributes.map(a => a.toProto()),
      multichoiceAttributes: this.multichoiceAttributes.map(a => a.toProto()),
      numberAttributes: this.numberAttributes.map(a => a.toProto())
    });

    return bridge
      .getIdentity()
      .BuildSchema(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Schema.fromProto(res.schema!);
      });
  }
}
