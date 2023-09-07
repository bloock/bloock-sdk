import { BloockBridge } from "../../bridge/bridge";
import { ConfigData } from "../../bridge/proto/config";
import { BuildSchemaRequest } from "../../bridge/proto/identity";
import { Schema } from "./schema";
import { BooleanAttributeDescriptor } from "./boolean_attribute_descriptor";
import { DateAttributeDescriptor } from "./date_attribute_descriptor";
import { DateTimeAttributeDescriptor } from "./datetime_attribute_descriptor";
import { StringAttributeDescriptor } from "./string_attribute_descriptor";
import { NumberAttributeDescriptor } from "./number_attribute_descriptor";

export class SchemaBuilder {
  displayName: string;
  technicalName: string;
  configData: ConfigData;

  booleanAttributes: BooleanAttributeDescriptor[];
  dateAttributes: DateAttributeDescriptor[];
  dateTimeAttributes: DateTimeAttributeDescriptor[];
  stringAttributes: StringAttributeDescriptor[];
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
    this.stringAttributes = [];
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

  public addStringAttribute(
    name: string,
    technicalName: string,
    description?: string
  ): SchemaBuilder {
    this.stringAttributes.push(
      new StringAttributeDescriptor(name, technicalName, description)
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
      stringAttributes: this.stringAttributes.map(a => a.toProto()),
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
